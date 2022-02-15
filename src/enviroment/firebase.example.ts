import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "api-key",
    authDomain: "auth-domain",
    projectId: "project-id",
    storageBucket: "storage-bucket",
    messagingSenderId: "messaging-sender-id",
    appId: "app-id",
    measurementId: "measurement-id"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);