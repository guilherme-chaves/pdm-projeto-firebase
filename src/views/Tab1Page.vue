<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Meu closet</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-refresher slot="fixed" pull-factor="0.5" pull-min="100" pull-max="200" @ionRefresh="doRefresh($event)">
				<ion-refresher-content></ion-refresher-content>
			</ion-refresher>
			<ion-grid id="gridList" v-if="categories.length > 0">
				<card-category v-for="categoryData in categories" :key="categoryData.name" :name="categoryData.name" :items="categoryData.items"></card-category>
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
		IonIcon,
		IonRefresher,
		IonRefresherContent,
    RefresherCustomEvent
	} from '@ionic/vue';
import { add } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import CardCategory from '../components/Closet/cardCategory.vue'
import CardContentInterface, { CategoryData } from '../interfaces/cardContent'
import dbQuery from '../api/firebase-database'
import { getAuth } from 'firebase/auth';
import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
import { startApp } from '../enviroment/firebase.config'

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
		IonIcon,
		IonRefresher,
		IonRefresherContent,
	},
	setup() {
		const router = useRouter();
		const items = ref<Array<CardContentInterface>>([]);
		const categories = ref<Array<CategoryData>>([]);
		const state = dbQuery();
		const firebaseApp = startApp();

		const getUserItems = () => {
			const auth = getAuth();
			const db = getDatabase(firebaseApp);
			
			const itemDataRef = dbRef(db, `items/${auth.currentUser?.uid}/`);
			onValue(itemDataRef, (snapshot) => {
				if(snapshot.hasChildren()) {
					if(items.value.length > 0) {
						items.value = []
					}
					const data = snapshot.val();
					const keys = Object.keys(data);
					keys.forEach((key) => {
						const newElement : CardContentInterface = {
							category: data[key].category,
							id: data[key].id,
							title: data[key].title,
							imageUrl: data[key].imageUrl
						}
						items.value.push(newElement);
						
					});
				}
			});
		}


		const filterData = () => {
			getUserItems();
			items.value.forEach(element => {
				filter(element)
			});
		}

		const filter = (cur : CardContentInterface) => {
			if(categories.value != undefined) {
				if(categories.value.length == 0) {
					categories.value.push({name: cur.category, items: [cur]});
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
		filterData();

		const doRefresh = (event: RefresherCustomEvent) => {
			filterData();
			setTimeout(() => {
				console.log('Async operation has ended');
				event.target.complete();
			}, 2000);
		}

		console.log(categories);
		return { items, categories, add, router, doRefresh }
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