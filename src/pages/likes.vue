<script setup>
import { useAppStore } from '@/stores/app';
import useProducts from '@/composables/useProducts';
import ProductCard from '@/components/products/ProductCard.vue';
import { computed, onMounted } from 'vue';

const appStore = useAppStore();
const { flags, products, getAllProducts } = useProducts();

onMounted(async () => {
  await getAllProducts()
})

const favoriteProducts = computed(() => 
  products.value.filter(p => appStore.favorites.includes(p.id))
);

</script>

<template>
  <div>
    <h1>Избранные товары</h1>

    <v-progress-circular 
        v-if="flags.isLoading" 
        indeterminate color="primary" 
        size="50" 
        class="w-100 my-4" 
    />
    
    <v-container v-else>
        
      <v-row v-if="favoriteProducts.length">
        <v-col v-for="product in favoriteProducts" :key="product.id" cols="12" sm="6" md="4">
          <ProductCard :product="product" />
        </v-col>
      </v-row>

      <p v-else>Вы ещё ничего не добавили в избранное.</p>
    </v-container>

    
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
