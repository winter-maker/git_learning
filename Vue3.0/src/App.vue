<script setup lang="ts">
import Test from "./components/Test.tsx";
</script>

<template>
  <Test title="title" :condition="'c'" :list="['tom', 'jery']">
    test slot
  </Test>
</template>

<style scoped>
</style>
