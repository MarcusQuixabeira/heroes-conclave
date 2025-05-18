<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Heroes Conclave
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          App Links
        </q-item-label>

        <EssentialLink
          v-for="link in appLinksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

const appLinksList : EssentialLinkProps[] = [
    {
      title: 'Home',
      caption: 'Initial page',
      icon: 'home',
      link: '/',
      names: ['Home'],
      internal: true
    },
    {
      title: 'Heroes',
      caption: 'listing',
      icon: 'stars',
      link: '/heroes',
      names: ['HeroesList', 'HeroDetail'],
      internal: true
    },
]

const linksList: EssentialLinkProps[] = [
  {
    title: 'Git Repo',
    caption: 'Git repository of this app',
    icon: 'code',
    link: 'https://github.com/MarcusQuixabeira/heroes-conclave',
    names: [],
    internal: false
  },
  {
    title: 'Heroes Fan Page',
    caption: 'Personal page',
    icon: 'favorite',
    link: 'https://mquixaba.com',
    names: [],
    internal: false
  }
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
