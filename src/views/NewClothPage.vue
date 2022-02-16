<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Adicionar roupa</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div id="photo-container">
                <!--<ion-thumbnail v-if="imageUploaded">
                    <img :src="imageData">
                </ion-thumbnail>-->
                <ion-button color="medium" expand="full" @click="takePicture">Adicionar foto</ion-button>
            </div>
            <form id="form-container">
                <div class="item-form">
                    <ion-label>Nome: </ion-label>
                    <ion-input type="text" name="title" @ionChange="infoFormHandler" required></ion-input>
                </div>
                <div>
                    <ion-label>Categoria: </ion-label>
                    <ion-select name="category" @ionChange="infoFormHandler" interface="popover">
                        <ion-select-option value="blusa">Blusa</ion-select-option>
                        <ion-select-option value="calca">Calça</ion-select-option>
                        <ion-select-option value="moletom">Moletom</ion-select-option>
                        <ion-select-option value="chapeu">Chapéu</ion-select-option>
                        <ion-select-option value="calcado">Calçado</ion-select-option>
                    </ion-select>
                </div>
                <div class="item-form">
                    <ion-label>Valor de compra: </ion-label>
                    <ion-input type="number" name="boughtvalue" min="0" @ionChange="infoFormHandler" required></ion-input>
                </div>
                <div class="item-form">
                    <ion-label>Valor de venda: </ion-label>
                    <ion-input type="number" name="sellvalue" min="0" @ionChange="infoFormHandler" required></ion-input>
                </div>
                <div class="item-form">
                    <ion-label>Descrição: </ion-label>
                    <ion-textarea name="description" debounce="500" @ionChange="infoFormHandler"></ion-textarea>
                </div>
            </form>
            <ion-button expand="full" color="primary" @click="doCreate">Cadastrar roupa</ion-button>
            <ion-button expand="full" color="danger" @click="() => router.replace('/home/tab1')">Cancelar</ion-button>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    //IonThumbnail,
    IonButton,
    IonLabel,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButtons,
    IonBackButton,
    alertController
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import { Camera, CameraResultType } from '@capacitor/camera'
import dbStuff from '../api/firebase-database'

export default defineComponent({
    name: 'NewClothPage',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        //IonThumbnail,
        IonButton,
        IonLabel,
        IonInput,
        IonTextarea,
        IonSelect,
        IonSelectOption,
        IonButtons,
        IonBackButton
    },
    setup() {
        const router = useRouter();
        const imageData = ref("");
        const imageUploaded = ref(false);
        const state = dbStuff();

        const infoForm = ref<{[key: string]: string }>({
            title: "",
            category: "",
            boughtvalue: "",
            sellvalue: "",
            description: ""
        });

        const infoFormHandler = (e: CustomEvent) => {
            const name: string = (e?.target as any)?.name;
            infoForm.value[name as string] = e.detail.value;
        };

        const handleAlert = (message: string, isError = false) => {
            alertController
                .create({
                    header: isError ? "Erro: " : "Atenção: ",
                    message: message,
                    buttons: ["OK"],
                })
                .then((t) => t.present());
        };

        const takePicture = async () => {
            const permissionStatus = await Camera.checkPermissions();
            if(permissionStatus.camera == 'denied' || permissionStatus.photos == 'denied'){
                await Camera.requestPermissions();
            }
            const image = await Camera.getPhoto({
                quality: 80,
                allowEditing: false,
                resultType: CameraResultType.Base64
            });

            var imageUrl = image.webPath;
            imageData.value = image.base64String ?? "";
            if (imageData.value) {
                imageUploaded.value = true;
            }
        };

        const doCreate = async () => {
            try {
                console.log(infoForm.value)
                const { title, category, boughtvalue, sellvalue, description } = infoForm.value;
                await state.createItem(title, category, imageData.value, parseFloat(boughtvalue), parseFloat(sellvalue), description)
                router.push({name : "Home", replace: true });
            } catch (error: Error | any) {
                console.log(error);
                handleAlert(error.message, true);
            }
        };

        return { router, imageData, imageUploaded, takePicture, infoForm, infoFormHandler, doCreate }
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