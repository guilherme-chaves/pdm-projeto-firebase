<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Perfil</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-card>
				<ion-card-header>
					<div id="avatar-photo">
						<ion-avatar>
							<img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
						</ion-avatar>
						<ion-button color="medium" v-if="isEditing">Editar foto</ion-button>
					</div>
					<ion-input value="Usuário 1" v-if="isEditing"></ion-input>
					<ion-card-title v-else>Usuário 1</ion-card-title>
				</ion-card-header>
				<ion-card-content v-if="isEditing">
					<ion-label>E-mail: </ion-label>
					<ion-input value="sadkjask@asjkd.com"></ion-input>
					<br/>
					<ion-label>Telefone:</ion-label>
					<ion-input value="sadkjask@asjkd.com"></ion-input>
					<br/>
					<ion-label>Endereço:</ion-label>
					<ion-input value="sadkjask@asjkd.com"></ion-input>
				</ion-card-content>
				<ion-card-content v-else>
					<ion-label>E-mail: </ion-label>
					<ion-text>sadkjask@asjkd.com</ion-text>
					<br/>
					<ion-label>Telefone:</ion-label>
					<ion-text>sadkjask@asjkd.com</ion-text>
					<br/>
					<ion-label>Endereço:</ion-label>
					<ion-text>sadkjask@asjkd.com</ion-text>
				</ion-card-content>
			</ion-card>
		</ion-content>
		<ion-fab vertical="bottom" horizontal="end" slot="fixed" v-if="isEditing" @click="saveData">
			<ion-fab-button color="success" aria-label="Editar perfil">
				<ion-icon id="icon-qr" :icon="save"></ion-icon>
			</ion-fab-button>
		</ion-fab>
		<ion-fab vertical="bottom" horizontal="end" slot="fixed" v-else @click="editEvent">
			<ion-fab-button color="success" aria-label="Salvar dados do perfil">
				<ion-icon id="icon-qr" :icon="pencil"></ion-icon>
			</ion-fab-button>
		</ion-fab>
	</ion-page>
</template>

<script lang="ts">
	import { defineComponent, ref } from 'vue';
	import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonText, IonInput, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
	import { save, pencil } from 'ionicons/icons';

	export default defineComponent({
		name: 'Tab3Page',
		components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonAvatar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonText, IonInput, IonFab, IonFabButton, IonIcon },
		setup() {
			const isEditing = ref(false);

			const editEvent = () => {
				isEditing.value = true;
			}

			const saveData = () => {
				isEditing.value = false;
			}

			return { isEditing, editEvent, saveData, save, pencil }
		}
	});
</script>


<style scoped>

ion-avatar {
	width: 72px;
	height: 72px;
}

ion-fab-button {
	color: lightseagreen;
	width: 64px;
	height: 64px;
}

#icon-qr {
	color: white;
	font-size: 28px;
}

#avatar-photo {
	display: flex;
	flex-direction: row;
	align-content: center;
	justify-content: space-between;
	align-items: center;
	margin-bottom: .25em;
}
</style>
