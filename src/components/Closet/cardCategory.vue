<template>
    <ion-row v-if="this.items.length < 5">
        <ion-toolbar>
            <ion-title>{{ getCapitilizedName }}</ion-title>
        </ion-toolbar>
        <item-card-category v-for="item in items" :key="item.id" :title="item.title" :imageUrl="item.imageUrl" :cardUrl="'/home/tab1/'+item.category+'/'+item.id"></item-card-category>
    </ion-row>
    <ion-row v-else>
        <ion-toolbar>
            <ion-title>{{ name }}</ion-title>
        </ion-toolbar>
        <item-card-category :key="this.items[0].id" :title="this.items[0].title" :imageUrl="this.items[0].imageUrl" :cardUrl="'/home/tab1/'+this.items[0].category+'/'+this.items[0].id"></item-card-category>
        <item-card-category :key="this.items[1].id" :title="this.items[1].title" :imageUrl="this.items[1].imageUrl" :cardUrl="'/home/tab1/'+this.items[1].category+'/'+this.items[1].id"></item-card-category>
        <item-card-category :key="this.items[2].id" :title="this.items[2].title" :imageUrl="this.items[2].imageUrl" :cardUrl="'/home/tab1/'+this.items[2].category+'/'+this.items[2].id"></item-card-category>
        <item-card-category :key="'placeholder-'+this.name" :title="'Outras ' +(this.items.length-3) + ' peças'" :imageUrl="'https://via.placeholder.com/360x510?text=Mais+'+this.items.length+'+peças'" :cardUrl="'/tab1/'+this.name"></item-card-category>
    </ion-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonRow, IonToolbar, IonTitle } from '@ionic/vue'
import ItemCardCategory from './itemCardCategory.vue'

export default defineComponent({
    name: 'CardCategory',
    components: { IonRow, IonToolbar, IonTitle, ItemCardCategory },
    computed: {
        getCapitilizedName() {
            return this.name ? (this.name.charAt(0).toUpperCase() + this.name?.slice(1)) : "nullError";
        }
    },
    props: {
        name: String,
        items: Array,
    }
})
</script>


<style scoped>
ion-title {
    text-align: start;
    font-size: 1.25em;
}
</style>