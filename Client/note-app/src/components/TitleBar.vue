<template>
  <div class="bg-black text-white py-4 pb-8 px-4">
    <h1 class="text-[3rem] font-[600] mb-4">{{ props.title }}</h1>
    <p class="text-[18px] font-[400]">{{ props.description }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description?: string;
}>();
</script>

<style scoped></style>
