<template>
    <ion-content>
        <swiper :modules="modules" :keyboard="true" :scrollbar="true" :zoom="true" :slides-per-view="3">
            <swiper-slide>Conteudo 1</swiper-slide>
            <swiper-slide>Conteudo 2</swiper-slide>
            <swiper-slide>Conteudo 3</swiper-slide>
            <swiper-slide>Conteudo 4</swiper-slide>
            <swiper-slide>Conteudo 5</swiper-slide>
            <swiper-slide>Conteudo 6</swiper-slide>
        </swiper>
    </ion-content>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { IonContent, IonicSlides } from '@ionic/vue'

    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Keyboard, Scrollbar, Zoom } from 'swiper';
    import 'swiper/css';
    import 'swiper/css/keyboard';
    import 'swiper/css/scrollbar';
    import 'swiper/css/zoom';
    import '@ionic/vue/css/ionic-swiper.css';

  export default defineComponent({
    name: 'slidesCloset',
    components: { IonContent, Swiper, SwiperSlide },
    setup() {
        return {
        modules: [ Keyboard, Scrollbar, Zoom, IonicSlides ],
      };
    }
  });
</script>
