<template>
  <q-item
    clickable
    @click="navigateTo(link, internal)"
    :active="active"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link: string;
  icon?: string;
  internal: boolean;
  names: string[];
};

const props = defineProps<EssentialLinkProps>()

async function navigateTo(link: string, internal: boolean) {
  return internal ? await router.push({ path: link }) : window.open(link, '_blank')
}

const active = computed(() => {
  // This is necessary because the route name can not be directly typed as a string
  const currentRouteName: string = (router.currentRoute.value.name as string) ?? ''
  return props.names.includes(currentRouteName || '')
})
</script>