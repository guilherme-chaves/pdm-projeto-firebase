<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title></ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-grid v-if="items.length > 0">
                <ion-row>
                    <item-card-category v-for="item in items" :key="item.id" :title="item.title" :imageUrl="item.imageUrl"></item-card-category>
                </ion-row>
            </ion-grid>
            <ion-text v-else>Parece que não temos nada nessa categoria...<br/>Cadastre um novo produto para inserir algo aqui</ion-text>
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
    IonGrid,
    IonRow,
    IonButtons,
    IonBackButton,
} from '@ionic/vue'
import { useRoute } from 'vue-router';
import CardContentInterface from '../interfaces/cardContent'
import itemCardCategory from '../components/Closet/itemCardCategory.vue'

export default defineComponent({
    name: 'CategoryPage',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonGrid,
        IonRow,
        IonButtons,
        IonBackButton,
        itemCardCategory
    },
    setup() {
        const items = ref<Array<CardContentInterface>>([]);
        const route = useRoute();
        const { category } = route.params;

		const dummyData = () => {
			const max = items.value.length + 20;
			const min = max - 20;
			for (let i = min - 1; i < max; i++) {
				if(Object.keys(items).length == 0) {
					items.value[0] = {category: "b", id: `${i}`, title: `Card ${i}`, imageUrl: `https://via.placeholder.com/360x510?text=Card+Image+` + i};
					continue;
				}
				items.value.push({category: "a", id: `${i}`, title: `Card ${i}`, imageUrl: `https://via.placeholder.com/360x510?text=Card+Image+` + i});
			}
		}

        dummyData();

        return { items, category }
    },
})
</script>
