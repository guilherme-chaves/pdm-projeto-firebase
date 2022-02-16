<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-text class="content-title" id="title">Bem vindo ao Meu closet!</ion-text>
            <main v-if="signIn">
                <ion-text>Faça Login ou registre-se para começar</ion-text>
                <form>
                    <div class="item-form">
                        <ion-label>E-mail: </ion-label>
                        <ion-input name="email" type="email" @ionChange="handleChangeLogin" required></ion-input>
                    </div>
                    <div class="item-form">
                        <ion-label>Senha: </ion-label>
                        <ion-input name="password" type="password" @ionChange="handleChangeLogin" required></ion-input>
                    </div>
                </form>
                <ion-button color="primary"  @click="doLogin">
                    <ion-spinner v-if="loading" color="light"/>
                    <span v-else>Entrar</span>
                </ion-button>
                <ion-button color="secondary" @click="switchSignIn">Registre-se</ion-button>
            </main>
            
            <main :fullscreen="true" v-else>
                <ion-text>Faça Login ou registre-se para começar</ion-text>
                <form>
                    <div class="item-form">
                        <ion-avatar v-if="imageUploaded">
                            <img :src="imageData"/>
                        </ion-avatar>
                        <ion-label>Foto de perfil: </ion-label>
                        <ion-button color="medium" @click="takePicture">Adicionar foto</ion-button>
                    </div>
                    <div class="item-form">
                        <ion-label>Nome: </ion-label>
                        <ion-input type="text" name="username" @ionChange="handleChangeSignUp" required></ion-input>
                    </div>
                    <div class="item-form">
                        <ion-label>E-mail: </ion-label>
                        <ion-input type="email" name="email" @ionChange="handleChangeSignUp" required></ion-input>
                    </div>
                    <div class="item-form">
                        <ion-label>Telefone: </ion-label>
                        <ion-input type="text" name="phone" @ionChange="handleChangeSignUp" required></ion-input>
                    </div>
                    <div class="item-form">
                        <ion-label>Endereço: </ion-label>
                        <ion-input type="text" name="address" @ionChange="handleChangeSignUp" required></ion-input>
                    </div>
                    <div class="item-form">
                        <ion-label>Senha: </ion-label>
                        <ion-input type="password" name="password" @ionChange="handleChangeSignUp" required></ion-input>
                    </div>
                </form>
                <ion-button color="primary" @click="doSignUp">
                    <ion-spinner v-if="loading" color="light"/>
                    <span v-else>Cadastre-se</span>
                </ion-button>
                <ion-button color="secondary" @click="switchSignIn">Voltar</ion-button>
            </main>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonPage, IonContent, IonText, IonLabel, IonInput, IonButton, IonSpinner, IonAvatar, alertController } from '@ionic/vue';
import { useRouter } from 'vue-router';
import useFirebaseAuth from '../api/firebase-auth';
import { Camera, CameraResultType } from '@capacitor/camera';

export default defineComponent({
    name: 'LoginPage',
    components: { IonPage, IonContent, IonText, IonLabel, IonInput, IonButton, IonSpinner, IonAvatar },
    methods: {
        switchSignIn() {
            this.signIn = !this.signIn
        }
    },
    setup() {
        const state = useFirebaseAuth();
        const router = useRouter();
        const signIn = ref(true);
        const imageUploaded = ref(false);
        const imageData = ref("");

        const credentialsLogin = ref<{[key: string]: string}>({
            email: "",
            password: "",
        });
        
        const handleChangeLogin = (e: CustomEvent) => {
            const name: string = (e?.target as any)?.name;
            credentialsLogin.value[name as string] = e.detail.value;
        };


        const credentialsSignUp = ref<{[key: string]: string}>({
            email: "",
            password: "",
            username: "",
            phone: "",
            address: ""
        });

        const handleChangeSignUp = (e: CustomEvent) => {
            const name: string = (e?.target as any)?.name;
            credentialsSignUp.value[name as string] = e.detail.value;
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

        const doLogin = async () => {
            try {
                const { email, password } = credentialsLogin.value;
                await state.login(email, password);
                router.push({name : "Home", replace: true });
            } catch (error: Error | any) {
                console.log(error);
                handleAlert(error.message, true);
            }
        };


        const doSignUp = async () => {
            try {
                console.log(credentialsSignUp.value);
                const { username, email, password, phone, address } = credentialsSignUp.value;
                await state.signUp(email, password, username, phone, address, imageData.value);
                router.push({name : "Login", replace: true });
            } catch (error: Error | any) {
                console.log(error);
                handleAlert(error.message, true);
            }
        };
        return {
            ...state,
            credentialsLogin,
            credentialsSignUp,
            doLogin,
            doSignUp,
            handleChangeLogin,
            handleChangeSignUp,
            router,
            signIn,
            takePicture,
            imageUploaded,
            imageData
        }
    }
})
</script>

<style scoped>
main {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    margin-top: 33.3vh;
    width: 98vw;
    max-width: 720px;
    min-height: auto;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
}

ion-text {
    text-align: center;
}

form {
    margin: 1.5rem 0 1.5rem 0;
}

#title {
    position: absolute;
    top: 15vh;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100vw;
}
</style>