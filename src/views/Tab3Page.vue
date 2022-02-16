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
							<img :src="this.userData.userImagePath">
						</ion-avatar>
						<ion-button color="medium" v-if="isEditing">Editar foto</ion-button>
					</div>
					<ion-input :value="this.userData.userName" v-if="isEditing"></ion-input>
					<ion-card-title v-else>{{this.userData.userName}}</ion-card-title>
				</ion-card-header>
				<ion-card-content v-if="isEditing">
					<ion-label>E-mail: </ion-label>
					<ion-input :value="this.userData.userEmail"></ion-input>
					<br/>
					<ion-label>Telefone:</ion-label>
					<ion-input :value="this.userData.userPhone"></ion-input>
					<br/>
					<ion-label>Endereço:</ion-label>
					<ion-input :value="this.userData.userAddress"></ion-input>
				</ion-card-content>
				<ion-card-content v-else>
					<ion-label>E-mail: </ion-label>
					<ion-text>{{this.userData.userEmail}}</ion-text>
					<br/>
					<ion-label>Telefone:</ion-label>
					<ion-text>{{this.userData.userPhone}}</ion-text>
					<br/>
					<ion-label>Endereço:</ion-label>
					<ion-text>{{this.userData.userAddress}}</ion-text>
				</ion-card-content>
			</ion-card>
		</ion-content>
		<ion-fab vertical="bottom" horizontal="start" slot="fixed" @click="doLogOut">
			<ion-fab-button color="danger" aria-label="Sair da conta">
				<ion-icon class="icon" :icon="logOutOutline"></ion-icon>
			</ion-fab-button>
		</ion-fab>
		<ion-fab vertical="bottom" horizontal="end" slot="fixed" v-if="isEditing" @click="saveData">
			<ion-fab-button color="success" aria-label="Editar perfil">
				<ion-icon class="icon" :icon="save"></ion-icon>
			</ion-fab-button>
		</ion-fab>
		<ion-fab vertical="bottom" horizontal="end" slot="fixed" v-else @click="editEvent">
			<ion-fab-button color="success" aria-label="Salvar dados do perfil">
				<ion-icon class="icon" :icon="pencil"></ion-icon>
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
		IonAvatar,
		IonCard,
		IonCardHeader,
		IonCardTitle,
		IonCardContent,
		IonLabel,
		IonText,
		IonInput,
		IonFab,
		IonFabButton,
		IonIcon,
		IonButton
	} from '@ionic/vue';
	import { save, pencil, logOutOutline } from 'ionicons/icons';
	import { startApp } from '../enviroment/firebase.config';
	import { getAuth } from 'firebase/auth';
	import { getDatabase, ref as dbRef, onValue } from 'firebase/database';
	import { UserData } from '../interfaces/userData';
	import useFirebaseAuth from '../api/firebase-auth';
	import { useRouter } from 'vue-router';

	export default defineComponent({
		name: 'Tab3Page',
		components: { 
			IonHeader,
			IonToolbar,
			IonTitle,
			IonContent,
			IonPage,
			IonAvatar,
			IonCard,
			IonCardHeader,
			IonCardTitle,
			IonCardContent,
			IonLabel,
			IonText,
			IonInput,
			IonFab,
			IonFabButton,
			IonIcon,
			IonButton
		},
		mounted() {
			console.log(this.userData?.userImagePath)
		},
		setup() {
			const isEditing = ref(false);
			const userData = ref<UserData>();
			const state = useFirebaseAuth();
			const router = useRouter();
			const getUserData = () => {
				const firebaseApp = startApp();
				const auth = getAuth();
				const db = getDatabase(firebaseApp);
				console.log(auth.currentUser?.uid);
				const userDataRef = dbRef(db, 'users/' + auth.currentUser?.uid);
				onValue(userDataRef, (snapshot : any) => {
					const data = snapshot.val();
					userData.value = {
						userId: data.userId,
						userName: data.userName,
						userEmail: data.userEmail,
						userPhone: data.userPhone,
						userAddress: data.userAddress,
						userImagePath: data.userImagePath
					}
				},
				(error : Error) => {
					throw error;
				});
			}

			const doLogOut = async () => {
				try {
					await state.logout();
					router.push({name : "Home", replace: true });
				} catch (e) {
					router.push({name : "Home", replace: true });
				}
			}

			const editEvent = () => {
				isEditing.value = true;
			}

			const saveData = () => {
				isEditing.value = false;
			}
			getUserData();

			return { isEditing, editEvent, saveData, doLogOut, save, pencil, logOutOutline, userData }
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

.icon {
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
