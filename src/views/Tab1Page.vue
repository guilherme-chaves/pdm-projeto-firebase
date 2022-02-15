<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Meu closet</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-grid id="gridList" v-if="categories.length > 0">
				<card-category v-for="categoryData in categories" :key="categoryData.category" :categoryData="categoryData"></card-category>
			</ion-grid>
			<ion-text id="no-items" v-else>Parece que você não tem itens cadastrados.<br/>Clique no botão + para começar seu closet</ion-text>
		</ion-content>
		<ion-fab vertical="bottom" horizontal="end" slot="fixed" @click="() => router.push('/home/tab1/new')">
			<ion-fab-button aria-label="Adicionar roupa">
				<ion-icon id="icon-add" :icon="add"></ion-icon>
			</ion-fab-button>
		</ion-fab>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonPage,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonGrid,
		IonText,
		IonFab,
		IonFabButton,
		IonIcon
	} from '@ionic/vue';
import { add } from 'ionicons/icons';
import { useRouter } from 'vue-router';
// eslint-disable-next-line
import CardCategory from '../components/Closet/cardCategory.vue'
import CardContentInterface, { CategoryData } from '../interfaces/cardContent'

export default  defineComponent({
	name: 'Tab1Page',
	components: { IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonPage,
		IonGrid,
		CardCategory,
		IonText,
		IonFab,
		IonFabButton,
		IonIcon
	},
	setup() {
		const router = useRouter();
		const items = ref<Array<CardContentInterface>>([]);
		const categories = ref<Array<CategoryData>>([]);

		const dummyData = () => {
			const max = items.value.length + 20;
			const min = max - 20;
			for (let i = min - 1; i < max; i++) {
				if(Object.keys(items).length == 0) {
					items.value[0] = {category: "b", id: i, title: `Card ${i}`, imageUrl: `https://via.placeholder.com/360x510?text=Card+Image+` + i};
					continue;
				}
				items.value.push({category: "a", id: i, title: `Card ${i}`, imageUrl: `https://via.placeholder.com/360x510?text=Card+Image+` + i});
			}
		}

		const filterDummyData = () => {
			dummyData();
			items.value.forEach(element => {
				filter(element)
			});
		}

		const filter = (cur : CardContentInterface) => {
			if(categories.value != undefined) {
				if(categories.value.length == 0) {
					categories.value.push({name: "c", items: [cur]});
				} else {
					let newCategory = true;
					categories.value.forEach(element => {
						if (element.name == cur.category) {
							element.items.push(cur);
							newCategory = false;
						}
					});
					if(newCategory) {
						categories.value.push({name: cur.category, items: [cur]});
					}
				}
			}
		}
		filterDummyData();
		return { items, categories, add, router }
	}
});
</script>


<style scoped>
#no-items {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 1.25em;
	text-align: center;
	vertical-align: middle;
	color: dimgray;
}

ion-fab-button {
	color: lightskyblue;
}

#icon-add {
	font-size: 28px;
	color: white;
}
</style>