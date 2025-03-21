<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})
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

  </v-card>
</template>

<style scoped>
.product-card {
  width: 100%;
  margin: auto;
}
</style>
