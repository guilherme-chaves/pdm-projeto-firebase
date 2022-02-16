<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Nome da roupa</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-refresher slot="fixed" pull-factor="0.5" pull-min="100" pull-max="200" @ionRefresh="doRefresh($event)">
				<ion-refresher-content></ion-refresher-content>
			</ion-refresher>
            <ion-thumbnail>
                <img :src="itemInfo.imageUrl"/>
            </ion-thumbnail>
            <ion-title>{{ itemInfo.title }}</ion-title>
            <ion-text id="category-text">{{ itemInfo.category }}</ion-text>
            <br/>
            <ion-label>Valor de compra: R$</ion-label>
            <ion-text>{{ itemInfo.boughtValue }}</ion-text>
            <br/>
            <ion-label>Valor de venda: R$</ion-label>
            <ion-text>{{ itemInfo.sellValue }}</ion-text>
            <br/>
            <ion-label>Descrição:</ion-label>
            <br/>
            <ion-text>{{ itemInfo.description }}</ion-text>

            <ion-card>
                <ion-card-header>
                    <ion-card-title>Código QR</ion-card-title>
                    <ion-card-subtitle>Mostre esse código para outra pessoa para compartilhar sua coleção</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                     <qrcode-vue :value="qrCodeData" :size="250" level="H" />
                </ion-card-content>
            </ion-card>
        </ion-content>
        
    </ion-page>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonThumbnail,
    IonText,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonRefresher,
    IonRefresherContent,
    RefresherCustomEvent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent
} from '@ionic/vue'
import { qrCodeOutline } from 'ionicons/icons';
import { useRoute } from 'vue-router';
import { ItemClosetInterface } from '@/interfaces/cardContent';
import QrcodeVue from 'qrcode.vue'
import { getAuth } from 'firebase/auth';
import { equalTo, getDatabase, onValue, query, ref as dbRef } from 'firebase/database';
import { startApp } from '@/enviroment/firebase.config'
import { getDownloadURL, getStorage, ref as storeRef } from 'firebase/storage';

export default defineComponent({
    name: 'ClothPage',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonThumbnail,
        IonText,
        IonLabel,
        IonButtons,
        IonBackButton,
        IonRefresher,
        IonRefresherContent,
        QrcodeVue,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle
,
IonCardContent
    },
    computed: {
        getCapitilizedName(string) {
            return string ? (string.charAt(0).toUpperCase() + string.slice(1)) : "nullError";
        }
    },
    setup() {
        const firebaseApp = startApp();
        const route = useRoute();
        const itemInfo = ref<ItemClosetInterface>({category: "", id: "", title: "", imageUrl: "", boughtValue: 0, sellValue: 0, description: ""});
        const { category, item } = route.params;
        const qrCodeData = ref("");

        const getItemById = async (itemId: string) => {
            const auth = getAuth();
            const db = getDatabase(firebaseApp);
            const itemDataRef = query(dbRef(db, `items/${auth.currentUser?.uid}`));
            onValue(itemDataRef, (snapshot) => {
                if(snapshot.hasChildren()) {
                    const data = snapshot.val();
					const keys = Object.keys(data);
					keys.forEach((key) => {
                        if(data[key].id === itemId) {
                            let imageUrl = ""
                            getImageUrl(data[key].imageUrl).then((value) => {
                                imageUrl = value
                            });
                            const itemData: ItemClosetInterface = {
                                category: data[key].category,
                                id: data[key].id,
                                title: data[key].title,
                                imageUrl,
                                boughtValue: data[key].boughtValue,
                                sellValue: data[key].sellValue,
                                description: data[key].description
                            }
                            itemInfo.value = itemData;
                        }
                    })
                }
            },
            (error : Error) => {
                throw error;
            });
            qrCodeData.value = (auth.currentUser?.uid || "") + "/" + itemInfo.value.id;
        }

        const getImageUrl = async (imagePath: string): Promise<string> => {
			let imageUrl = "";
			if(imagePath) {
				const storage = getStorage();
				const taskRef = storeRef(storage, imagePath)
                imageUrl = await getDownloadURL(taskRef)
			}
			return imageUrl || 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'
		}

        getItemById(item.toString());

        const doRefresh = (event: RefresherCustomEvent) => {
			getItemById(item.toString());
			setTimeout(() => {
				console.log('Async operation has ended');
                console.log(itemInfo.value);
				event.target.complete();
			}, 2000);
		}

        return { qrCodeOutline, itemInfo, doRefresh, qrCodeData }
    },
})
</script>


<style scoped>
ion-content > ion-title {
    font-size: 2em;
}
ion-label, ion-text {
    margin-left: 16px;
    font-size: 1.15em
}

#category-text {
 margin-bottom: 3em;
}

ion-card {
    margin-top: 15vh;
    text-align: center;
}

ion-card-content {
    text-align: center;
}
</style>
