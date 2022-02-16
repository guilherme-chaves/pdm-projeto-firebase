import { toRefs, reactive } from "vue";
import { UserCredential, User, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getStorage, ref as storeRef, uploadString, getDownloadURL} from "firebase/storage";
import { Filesystem } from '@capacitor/filesystem';
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
                userPhone: data.userPhone,
                userAddress: data.userAddress,
                userImagePath: getImageUrl(data.userImagePath)
            }
            return userData;
        },
        (error : Error) => {
            throw error;
        });
        return null;
    }


    const getImageUrl = (imagePath: string): string => {
        if(imagePath) {
            return "https://firebasestorage.googleapis.com/b/pdm-meu-closet.appspot.com/o/" + encodeURIComponent(imagePath) + ".jpg"
        }
        return 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'
    }

    const readFilePath = async (path: string) => {
        // Here's an example of reading a file with a full file path. Use this to
        // read binary data (base64 encoded) from plugins that return File URIs, such as
        // the Camera.
        const contents = await Filesystem.readFile({
            path
        });
        return contents;
    };


    const setUserData = async (name: string, phone: string, address: string, image: string): Promise<UserData | null> => {
        const auth = getAuth();
        const storage = getStorage();
        //const imageData = await readFilePath(image);
        const avatarRef = storeRef(storage, `avatars/${auth.currentUser?.uid ?? 'dummy'}`);
        const upload = await uploadString(avatarRef, image, 'base64', { contentType: "image/jpeg" }).then((snapshot) => {
            console.log('Uploaded a base64 string!');
        });
        const avatarUrl = await getDownloadURL(avatarRef);
        const db = getDatabase(firebaseApp);
        const defaultUserData: UserData = {
            userId: auth.currentUser?.uid ?? '',
            userName: name,
            userEmail: auth.currentUser?.email ?? '',
            userPhone: phone,
            userAddress: address,
            userImagePath: avatarUrl
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

    const signUp = async (email: string, password: string, name: string, phone: string, address: string, image: string) => {
        state.loading = true;
        try {
            try {
                const auth = getAuth();
                const user = await createUserWithEmailAndPassword(auth, email, password);
                state.user = user;
                state.error = null;
                state.loading = false;
                state.userData = await setUserData(name, phone, address, image);
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