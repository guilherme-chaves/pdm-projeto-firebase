<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>


<style>

ion-input, ion-textarea, ion-select {
  border: 1.5px var(--ion-color-primary-shade) solid;
  border-radius: 1em;
  min-height: 48px;
}


.content-title {
  font-size: 1.5em;
  color: #008c91;
  font-weight: bold;
  /*font-family: ;*/
}


.item-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    align-content: center;
    margin: .5rem 0 .5rem 0;
}


.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>