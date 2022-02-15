import { toRefs, reactive } from "vue";
import { UserCredential, User, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { startApp } from "../enviroment/firebase.config";
import { UserData } from "../interfaces/userData";

const firebaseApp = startApp();

type TState = {
    error: Error | null;
    loading: boolean;
    user: UserCredential | null | User;
    userData: UserData | null;
    initialized: boolean;
};

const state = reactive<TState>({
    error: null,
    loading: false,
    user: null,
    userData: null,
    initialized: false
});

export default function() {
    const getUserData = (): UserData | null => {
        const auth = getAuth();
        const db = getDatabase(firebaseApp);
        const userDataRef = ref(db, 'users/' + auth.currentUser?.uid);
        onValue(userDataRef, (snapshot : any) => {
            const data = snapshot.val();
            const userData: UserData = {
                userId: data.userId,
                userName: data.userName,
                userEmail: data.userEmail,
                userPhone: data.usePhone,
                userAddress: data.userAddress,
            }
            return userData;
        },
        (error : Error) => {
            throw error;
        });
        return null;
    }

    const setUserData = (name: string, phone: string, address: string): UserData | null => {
        const auth = getAuth();
        const db = getDatabase(firebaseApp);
        const defaultUserData: UserData = {
            userId: auth.currentUser?.uid ?? '',
            userName: name,
            userEmail: auth.currentUser?.email ?? '',
            userPhone: phone,
            userAddress: address,
        }
        set(ref(db, 'users/' + auth.currentUser?.uid), defaultUserData);
        return defaultUserData;
    }

    const login = async (username: string, password: string) => {
        const auth = getAuth();
        state.loading = true;
        try {
            try {
                const user = await signInWithEmailAndPassword(auth, username, password);
                state.error = null;
                state.loading = false;
                state.user = user;
                state.userData = getUserData();
                return user;
            } catch (error : any) {
                state.error = error;
                state.loading = false;
                throw error;
            }
        } catch (error: any) {
            state.error = error;
            state.loading = false;
            throw error;
        }
    };

    const logout = async () => {
        const auth = getAuth();
        state.loading = true;
        try {
            try {
                await auth.signOut();
                state.error = null;
                state.loading = false;
                state.user = null;
                state.userData = null;
            } catch (error: any) {
                state.loading = false;
                state.error = error;
            }
        } catch (error: any) {
            state.loading = false;
            state.error = error;
        }
    }

    const signUp = async (email: string, password: string, name: string, phone: string, address: string) => {
        state.loading = true;
        try {
            try {
                const auth = getAuth();
                const user = await createUserWithEmailAndPassword(auth, email, password);
                state.user = user;
                state.error = null;
                state.loading = false;
                state.userData = setUserData(name, phone, address);
            } catch (error: any) {
                state.error = error;
                state.loading = false;
                throw error;
            }
        } catch (error: any) {
            state.error = error;
            state.loading = false;
            throw error;
        }
    }

    const authCheck = () => {
        const auth = getAuth();
        return new Promise((resolve) => {
            state.loading = true;
            !state.initialized &&
             auth.onAuthStateChanged(async (_user: any) => {
                if(_user) {
                    state.user = _user;
                    state.userData = getUserData();
                } else {
                    state.user = null;
                }
                state.loading = false;
                state.initialized = true;
                resolve(true);
             })
        })
    }

    return {
        ...toRefs(state),
        login,
        logout,
        signUp,
        authCheck
    }
}