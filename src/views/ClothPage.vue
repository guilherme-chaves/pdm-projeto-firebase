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
            <ion-thumbnail></ion-thumbnail>
            <ion-title></ion-title>
            <ion-text></ion-text>
            <ion-label>Código:</ion-label>
            <ion-text></ion-text>
            <br/>
            <ion-label>Valor de compra:</ion-label>
            <ion-text></ion-text>
            <br/>
            <ion-label>Valor de venda:</ion-label>
            <ion-text></ion-text>
            <br/>
            <ion-label>Descrição</ion-label>
            <ion-text></ion-text>
        </ion-content>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button color="secondary" aria-label="Gerar código QR para compartilhar produto">
                <ion-icon :icon="qrCodeOutline"></ion-icon>
            </ion-fab-button>
        </ion-fab>
    </ion-page>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonThumbnail,
    IonText,
    IonLabel,
    IonFab,
    IonFabButton,
    IonIcon,
    IonButtons,
    IonBackButton
} from '@ionic/vue'
import { qrCodeOutline } from 'ionicons/icons';
import { useRoute } from 'vue-router';

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
        IonFab,
        IonFabButton,
        IonIcon,
        IonButtons,
        IonBackButton
    },
    setup() {
        const route = useRoute();
        const { category, item } = route.params;
        return { qrCodeOutline, category, item }
    },
})
</script>
