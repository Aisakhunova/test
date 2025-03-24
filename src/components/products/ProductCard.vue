<script setup>
import { useAppStore } from '@/stores/app';
import { computed } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const appStore = useAppStore()

const isFavorite = computed(() => appStore.isFavorite(props.product.id))

const toggleLike = () => {
    isFavorite.value
        ? appStore.removeFromFavorites(props.product.id) 
        : appStore.addToFavorites(props.product.id)
}
</script>

<template>
  <v-card class="product-card" elevation="3">
    <v-img 
        :src="product.image" 
        :alt="product.name" 
        height="200"
        cover
    ></v-img>

    <v-card-title>{{ product.name }}</v-card-title>

    <v-card-text>
        <p class="text-subtitle-1">{{ product.category }}</p>
        <p class="text-h6 font-weight-bold">${{ product.price }}</p>
    </v-card-text>

    <v-card-actions>
        <v-btn color="primary">В корзину</v-btn>
        <v-btn 
            icon="mdi-heart"  
            :color="isFavorite ? 'red' : 'grey'" 
            @click="toggleLike"
        ></v-btn>
    </v-card-actions>

  </v-card>
</template>

<style scoped>
.product-card {
  width: 100%;
  margin: auto;
}
</style>
