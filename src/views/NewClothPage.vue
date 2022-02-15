<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Adicionar roupa</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div id="photo-container">
                <ion-thumbnail></ion-thumbnail>
                <ion-button color="medium" expand="full">Adicionar foto</ion-button>
            </div>
            <form id="form-container">
                <div>
                    <ion-label>Categoria: </ion-label>
                    <ion-select interface="popover">
                        <ion-select-option value="blusa">Blusa</ion-select-option>
                        <ion-select-option value="calca">Calça</ion-select-option>
                        <ion-select-option value="moletom">Moletom</ion-select-option>
                        <ion-select-option value="chapeu">Chapéu</ion-select-option>
                        <ion-select-option value="calcado">Calçado</ion-select-option>
                    </ion-select>
                </div>
                <div class="item-form">
                    <ion-label>Valor de compra: </ion-label>
                    <ion-input type="number" name="bought-value" min="0" required></ion-input>
                </div>
                <div class="item-form">
                    <ion-label>Valor de venda: </ion-label>
                    <ion-input type="number" name="sell-value" min="0" required></ion-input>
                </div>
                <div class="item-form">
                    <ion-label>Descrição: </ion-label>
                    <ion-textarea name="item-description"></ion-textarea>
                </div>
            </form>
            <ion-button expand="full" color="primary" @click="() => router.replace('/home/tab1')">Cadastrar roupa</ion-button>
            <ion-button expand="full" color="danger" @click="() => router.replace('/home/tab1')">Cancelar</ion-button>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonThumbnail,
    IonButton,
    IonLabel,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption
} from '@ionic/vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'NewClothPage',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonThumbnail,
        IonButton,
        IonLabel,
        IonInput,
        IonTextarea,
        IonSelect,
        IonSelectOption
    },
    setup() {
        const router = useRouter();

        return { router }
    }
});
</script>

<style scoped>
form {
    margin: 1.5rem 1em 1.5rem 1em;
}
ion-button {
    padding: 0 1em;
    margin-bottom: 1rem;
}
</style>