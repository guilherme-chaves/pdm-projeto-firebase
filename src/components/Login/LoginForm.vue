<template>
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
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { IonText, IonLabel, IonInput, IonButton } from '@ionic/vue'
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'LoginForm',
    components: { IonText, IonLabel, IonInput, IonButton },
    setup() {
        const router = useRouter();

        return { router }
    },
})
</script>
