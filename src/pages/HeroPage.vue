<template>
  <q-page>
    <div class="q-pa-md">
      <!-- Begin of Breadcrumb (This can be a component and use the route metadata) -->
      <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="home" label="Home" to="/" />
          <q-breadcrumbs-el icon="stars" label="Heroes" to="/heroes" />
          <q-breadcrumbs-el icon="visibility" label="Hero Detail" />
        </q-breadcrumbs>
      </div>
      <!-- End of Breadcrumb -->
      <div>
        <div v-if="loading"><HeroSkeleton /></div>
        <div v-else-if="result && result.character">
          <q-card>
            <q-card-section>
              <div class="row">
                <div class="column justify-center items-center col-12 col-lg-3">
                  <img class="hero-image" :src="result.character.image">
                </div>
                <div class="col-12 col-lg-9">
                  <div class="row">
                    <div class="col-12">
                      <div class="text-center text-h2 q-mt-sm">{{ result.character.name }}</div>
                    </div>
                  </div>

                  <div class="row q-pt-md">
                    <div class="col-12 col-md-4 flex flex-center">
                      <div class="text-bold q-pr-sm">Status:</div>
                      <div>{{ result.character.status || '-' }}</div>
                    </div>
                    <div class="col-12 col-md-4 flex flex-center">
                      <div class="text-bold q-pr-sm">Species:</div>
                      <div>{{ result.character.species || '-' }}</div>
                    </div>
                    <div class="col-12 col-md-4 flex flex-center">
                      <div class="text-bold q-pr-sm">Type:</div>
                      <div>{{ result.character.type || '-' }}</div>
                    </div>
                  </div>

                  <div class="row q-pt-md">
                    <div class="col-12 col-md-4 flex flex-center">
                      <div class="text-bold q-pr-sm">Gender:</div>
                      <div>{{ result.character.gender || '-' }}</div>
                    </div>
                    <div class="col-12 col-md-4 flex flex-center">
                      <div class="text-bold q-pr-sm">Origin:</div>
                      <div>{{ getName(result.character.origin) }}</div>
                    </div>
                    <div class="col-12 col-md-4 flex flex-center">
                      <div class="text-bold q-pr-sm">Last Seen:</div>
                      <div>{{ getName(result.character.location) }}</div>
                    </div>
                  </div>

                  <q-separator spaced inset light />
                  <EpisodeList :episodes="result.character.episode"/>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang='ts'>
  import { watch } from 'vue'
  import { useQuasar } from 'quasar'
  import { useRoute } from 'vue-router'
  import { useQuery } from '@vue/apollo-composable'
  import { Location, Origin } from 'src/types/models'
  import EpisodeList from 'components/EpisodeList.vue'
  import HeroSkeleton from 'components/HeroSkeleton.vue'
  import get_character from 'src/apollo/queries/character'

  const route = useRoute()
  const $q = useQuasar()
  const hero_id = route.params.hero_id as string

  // This time, let's play a bit with Apollo and GraphQL
  const { result, loading, error } = useQuery(get_character(hero_id))

  function getName(location: Location | Origin) {
    let name = '-'
    if (location.name) {
      name = location.name
      if (location.type) {
        name = `${location.name} (${location.type})`
      }
    }
    return name
  }

  watch(error, (err) => {
    if (err) {
      $q.notify({
        message: `An error happened during the data retrieving: ${err.message}`,
        icon: 'error',
        color: 'red'
      })
    }
  })
</script>
<style scoped>
.hero-image {
  height: 100%;
  width: 300px;
  object-fit: cover;
}
</style>