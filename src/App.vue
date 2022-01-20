<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import Layout from './components/Layout/Layout.vue';

export default {
  name: 'App',
  components: { Layout },
};
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
