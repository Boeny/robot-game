<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import { MAIN_LANGUAGE } from '@/lang/constants';
import Layout from './components/Layout/Layout.vue';
import { LOCALSTORAGE } from './utils/constants';
import store from './store';

export default {
    name: 'App',
    components: { Layout },

    mounted() {
        const AUTO_LANGUAGE = localStorage.getItem(LOCALSTORAGE.LANGUAGE);
        store.dispatch('layout/changeLanguage', AUTO_LANGUAGE || MAIN_LANGUAGE);
    },
};
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
