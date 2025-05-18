import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/IndexPage.vue') }
    ],
  },

  {
    path: '/heroes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',  name: 'HeroesList', component: () => import('pages/HeroesPage.vue') },
      { path: ':hero_id', name: 'HeroDetail', component: () => import('pages/HeroPage.vue') }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
