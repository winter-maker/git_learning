<script setup>
import Test from "./components/Test.jsx";
</script>

<template>
  <Test title="title" :condition="'c'" :list="['tom', 'jery']">
    test slot
  </Test>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
