<template>
    <ion-page>
        <ion-text class="content-title" id="title">Bem vindo ao Meu closet!</ion-text>
        <main v-if="signIn">
            <ion-text>Faça Login ou registre-se para começar</ion-text>
            <form>
                <div class="item-form">
                    <ion-label>E-mail: </ion-label>
                    <ion-input type="email" required></ion-input>
                </div>
                <div class="item-form">
                    <ion-label>Senha: </ion-label>
                    <ion-input type="password" required></ion-input>
                </div>
            </form>
            <ion-button color="primary" @click="() => router.replace('/home')">Entrar</ion-button>
            <ion-button color="secondary" @click="switchSignIn">Registre-se</ion-button>
        </main>
        
        <main v-else>
            <ion-text>Faça Login ou registre-se para começar</ion-text>
            <form>
                <div class="item-form">
                    <ion-label>Nome: </ion-label>
                    <ion-input type="text" required></ion-input>
                </div>
                <div class="item-form">
                    <ion-label>E-mail: </ion-label>
                    <ion-input type="email" required></ion-input>
                </div>
                <div class="item-form">
                    <ion-label>Telefone: </ion-label>
                    <ion-input type="text" required></ion-input>
                </div>
                <div class="item-form">
                    <ion-label>Endereço: </ion-label>
                    <ion-input type="text" required></ion-input>
                </div>
                <div class="item-form">
                    <ion-label>Senha: </ion-label>
                    <ion-input type="password" required></ion-input>
                </div>
            </form>
            <ion-button color="primary" @click="() => router.replace('/home')">Cadastrar-se</ion-button>
            <ion-button color="secondary" @click="switchSignIn">Voltar</ion-button>
        </main>
    </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonText, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'LoginPage',
    components: { IonPage, IonText, IonLabel, IonInput, IonButton },
    data() {
        return {
            signIn: true
        }
    },
    methods: {
        switchSignIn() {
            this.signIn = !this.signIn
        }
    },
    setup() {
        const router = useRouter();

        return { router }
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