<template>
    <ion-col size-xs="6" size-sm="4" size-md="3">
        <ion-card button="true" @click="() => router.push(cardUrl)">
            <ion-card-header>
                <ion-img :src="imageUrl"></ion-img>
            </ion-card-header>
            <ion-card-content>
                <ion-card-title class="title-item">{{ title }}</ion-card-title>
            </ion-card-content>
        </ion-card>
    </ion-col>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonCol, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonImg } from '@ionic/vue'
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'ItemCardCategory',
    components: { IonCol, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonImg },
    props: {
        imageUrl: String,
        title: String,
        cardUrl: String
    },
    setup() {
        const router = useRouter();
        return { router }
    }
})
</script>


<style scoped>
.title-item {
    text-align: center;
    font-size: 1em;
    text-overflow: ellipsis;
}
ion-card-header {
    padding: 0 0 16px 0;
}
</style>