<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from "./components/Header.vue";
</script>

<template>
  <div class="header">
    <Header />
  </div>
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100vw;
  height: 15vh;
}

.content {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100vw;
  height: 85vh;
  text-align: center;
  background-color: #FEFCF3;
}

* {
  font-family: 'HanYi-85w';
}
</style>
