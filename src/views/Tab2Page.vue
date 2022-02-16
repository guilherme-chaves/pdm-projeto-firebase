<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Procurar</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header>
				<ion-toolbar>
					<ion-searchbar showCancelButton="focus" debounce="500" @ionChange="searchItemCode($event)"></ion-searchbar>
				</ion-toolbar>
			</ion-header>
			<ion-grid id="gridList" v-if="isSearching">
				<ion-row>
					<item-card-category v-for="item in items" :key="item.id" :title="item.title" :imageUrl="item.imageUrl" :cardUrl="'/tab1/'+item.category+'/'+item.id"></item-card-category>
				</ion-row>
			</ion-grid>
			<ion-text id="no-items" v-else>Digite algo na barra de pesquisa <wbr/>ou escaneie um código QR para pesquisar</ion-text>
		</ion-content>
		<ion-fab vertical="bottom" horizontal="end" slot="fixed">
			<ion-fab-button color="success" aria-label="Adicionar roupa">
				<ion-icon id="icon-qr" :icon="qrCodeOutline"></ion-icon>
			</ion-fab-button>
		</ion-fab>
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
	IonGrid,
	IonText,
	IonSearchbar,
	SearchbarCustomEvent,
	IonFab,
	IonFabButton,
	IonIcon,
	IonRow
} from '@ionic/vue';
import { qrCodeOutline } from 'ionicons/icons';
import itemCardCategory from '../components/Closet/itemCardCategory.vue'

export default defineComponent({
	name: 'Tab2Page',
	components: {
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonPage,
		IonGrid,
		IonText,
		IonSearchbar,
		IonFab,
		IonFabButton,
		IonIcon,
		IonRow,
		itemCardCategory
	},
	setup() {
		const isSearching = ref(false);
		const searchItemCode = (ev: SearchbarCustomEvent) => {
			if(ev.detail.value && ev.detail.value.length > 3) {
				isSearching.value = true;
			} else {
				isSearching.value = false;
			}
			console.log(ev.detail.value);
		}

		return { isSearching, searchItemCode, qrCodeOutline }
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
	color: green;
	width: 64px;
	height: 64px;
}

#icon-qr {
	color: white;
	font-size: 28px;

}
</style>