<template>
  <ul class="switch">
    <li
      class="switch__item"
      :class="value === language && 'switch__item--active'"
      v-for="value in languages"
      v-bind:key="value"
    >
      <a v-if="value !== language"
        href="#"
        @click.prevent="changeLanguage(value)"
    >{{ value }}</a>
    <span v-else>{{ value }}</span>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { LANGUAGES } from '@/lang/constants';

export default {
    name: 'LangSwitch',

    computed: {
        ...mapGetters({
            language: 'layout/language',
        }),

        languages: () => LANGUAGES,
    },

    methods: {
        ...mapActions({
            changeLanguage: 'layout/changeLanguage',
        }),

        changeLanguage(language) {
            this.$i18n.i18next.changeLanguage(language);
            this.$store.dispatch('layout/changeLanguage', language);
        },
    },
};
</script>
