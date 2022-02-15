<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/home/tab1">
          <ion-icon :icon="shirtOutline" />
          <ion-label>Closet</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/home/tab2">
          <ion-icon :icon="searchCircleOutline" />
          <ion-label>Procurar</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/home/tab3">
          <ion-icon :icon="personOutline" />
          <ion-label>Perfil</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { searchCircleOutline, shirtOutline, personOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      searchCircleOutline,
      shirtOutline,
      personOutline
    }
  }
});
</script>
