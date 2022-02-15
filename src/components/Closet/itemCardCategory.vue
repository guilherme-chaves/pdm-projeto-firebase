<template>
    <ion-col size-xs="12" size-sm="6" size-md="3">
        <ion-card button="true" @click="() => route.push(cardUrl)">
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
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'ItemCardCategory',
    components: { IonCol, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonImg },
    props: {
        imageUrl: String,
        title: String,
        cardUrl: String
    },
    setup() {
        const route = useRoute();
        return { route }
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