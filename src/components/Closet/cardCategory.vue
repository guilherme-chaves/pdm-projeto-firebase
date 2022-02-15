<template>
    <ion-row v-if="categoryData.items.length < 5">
        <ion-toolbar>
            <ion-title>{{ categoryData.name }}</ion-title>
        </ion-toolbar>
        <item-card-category v-for="item in categoryData.items" :key="item.id" :title="item.title" :imageUrl="item.imageUrl" :cardUrl="'/tab1/'+item.category+'/'+item.id"></item-card-category>
    </ion-row>
    <ion-row v-else>
        <ion-toolbar>
            <ion-title>{{ categoryData.name }}</ion-title>
        </ion-toolbar>
        <item-card-category :key="categoryData.items[0].id" :title="categoryData.items[0].title" :imageUrl="categoryData.items[0].imageUrl" :cardUrl="'/tab1/'+categoryData[0].items.category+'/'+categoryData[0].items.id"></item-card-category>
        <item-card-category :key="categoryData.items[1].id" :title="categoryData.items[1].title" :imageUrl="categoryData.items[1].imageUrl" :cardUrl="'/tab1/'+categoryData[1].items.category+'/'+categoryData[1].items.id"></item-card-category>
        <item-card-category :key="categoryData.items[2].id" :title="categoryData.items[2].title" :imageUrl="categoryData.items[2].imageUrl" :cardUrl="'/tab1/'+categoryData[2].items.category+'/'+categoryData[2].items.id"></item-card-category>
        <item-card-category :key="'placeholder-'+categoryData.name" :title="'Outras ' +(categoryData.items.length-3) + ' peças'" :imageUrl="'https://via.placeholder.com/360x510?text=Mais+'+categoryData.items.length+'+peças'" :cardUrl="'/tab1/'+item.category"></item-card-category>
    </ion-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonRow, IonToolbar, IonTitle } from '@ionic/vue'
import ItemCardCategory from './itemCardCategory.vue'

export default defineComponent({
    name: 'CardCategory',
    components: { IonRow, IonToolbar, IonTitle, ItemCardCategory },
    props: {
        categoryData: Object
    }
})
</script>


<style scoped>
ion-title {
    text-align: start;
    font-size: 1.25em;
}
</style>