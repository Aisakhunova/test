<script setup>
import { onMounted } from 'vue'
import useProducts from '@/composables/useProducts'
import ProductCard from './ProductCard.vue';

const { flags, products, getAllProducts } = useProducts()

onMounted(async () => {
  try {
    await getAllProducts()
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <div>
    <v-progress-circular
        v-if="flags.isLoading"
        indeterminate
        color="primary"
        size="50"
        class="w-100 d-flex align-items-center justify=content-center my-4"
      >
      </v-progress-circular>

      <v-row v-else>
        <v-col
            v-for="product in products" 
            :key="product.id"
            cols="12" sm="6" md="4" lg="3"
        >
            <ProductCard :product="product"/>
        </v-col>
      </v-row>

  </div>
</template>
