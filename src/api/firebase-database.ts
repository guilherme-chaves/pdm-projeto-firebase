import { reactive, ref as vueRef } from "vue";
import { getDatabase, onValue, ref, set, query, equalTo } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref as storeRef, uploadString } from "firebase/storage";
import { startApp } from "../enviroment/firebase.config";
import CardContentInterface, { ItemClosetInterface } from "../interfaces/cardContent"
import { v4 as uuidv4 } from 'uuid';
import { Filesystem } from '@capacitor/filesystem';
const firebaseApp = startApp();

type TState = {
    error: Error | null;
    loading: boolean;
    initialized: boolean;
    data: CardContentInterface[] | ItemClosetInterface[] | null;
};

const state = reactive<TState>({
    error: null,
    loading: false,
    initialized: false,
    data: null
});


export default () => {
    const getUserItems = () : CardContentInterface[] | null => {
        const auth = getAuth();
        const db = getDatabase(firebaseApp);
        const itemDataRef = ref(db, `items/${auth.currentUser?.uid}`);
        onValue(itemDataRef, (snapshot) => {
            if(snapshot.hasChildren()) {
                const data = snapshot.val();
                const returnData : CardContentInterface[] = []
                const keys = Object.keys(data);
                keys.forEach((key) => {
                    const newElement : CardContentInterface = {
                        category: data[key].category,
                        id: data[key].id,
                        title: data[key].title,
                        imageUrl: getImageUrl(data[key].imageUrl)
                    }
                    returnData.push(newElement);
                });
                return returnData;
            }
        });
        return null
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

    const getImageUrl = (imagePath: string): string => {
        if(imagePath) {
            return "https://firebasestorage.googleapis.com/b/pdm-meu-closet.appspot.com/o/" + encodeURIComponent(imagePath) + ".jpg"
        }
        return 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'
    }

    const getCategoryItems = (categoryId: string) : CardContentInterface[] | null => {
        const auth = getAuth();
        const db = getDatabase(firebaseApp);
        const itemDataRef = query(ref(db, `items/${auth.currentUser?.uid}`), equalTo(categoryId, "category"));
        onValue(itemDataRef, (snapshot) => {
            if(snapshot.hasChildren()) {
                const data = snapshot.val();
                const returnData = vueRef<CardContentInterface[]>([]);
                data.forEach((element: { category: string; id: string; title: string; imageUrl: string; }) => {
                    const newElement : CardContentInterface = {
                        category: element.category,
                        id: element.id,
                        title: element.title,
                        imageUrl: getImageUrl(element.imageUrl)
                    }
                    returnData.value.push(newElement);
                });
                return returnData;
            } else {
                return null;
            }
        });
        return null
    }

    const getItemById = (itemId: string) : ItemClosetInterface | null => {
        const auth = getAuth();
        const db = getDatabase(firebaseApp);
        const itemDataRef = query(ref(db, `items/${auth.currentUser?.uid}`), equalTo(itemId, "id"));
        onValue(itemDataRef, (snapshot) => {
            const data = snapshot.val();
            const itemData: ItemClosetInterface = {
                    category: data.category,
                    id: data.id,
                    title: data.title,
                    imageUrl: data.imageUrl,
                    boughtValue: data.boughtValue,
                    sellValue: data.sellValue,
                    description: data.description
                }
                return itemData
            },
            (error : Error) => {
                throw error;
            });
        return null
    }

    const createItem = async ( title: string, category: string, image: any, boughtValue: number, sellValue: number, description: string ) => {
        const auth = getAuth();
        const storage = getStorage();
        const db = getDatabase(firebaseApp);
        state.loading = true;
        const idItem = uuidv4();
        const itemRef = storeRef(storage, `items/${auth.currentUser?.uid ?? 'dummy'}/${idItem}.jpg`);
        const upload = await uploadString(itemRef, image, 'base64', { contentType: "image/jpeg" }).then((snapshot) => {
            console.log('Uploaded a base64 string!');
        });
        const imageUrl = await getDownloadURL(itemRef)
        const defaultItemData: ItemClosetInterface = {
            category,
            id: idItem,
            title,
            imageUrl,
            boughtValue,
            sellValue,
            description
        }
        set(ref(db, 'items/' + auth.currentUser?.uid + '/' + idItem), defaultItemData);
    }

    return {
        getUserItems,
        getCategoryItems,
        getItemById,
        createItem
    }
}