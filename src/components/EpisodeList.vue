<template>
  <div>                
    <div class="row">
      <div class="col-12 q-pt-lg">
        <div class="text-center text-h5">
          Episodes
          <q-badge rounded color="red" align="middle" :label="episodes.length" />
        </div>
      </div>
    </div>

    <div class="row q-pt-md">
      <div class="col-12 episodes-list">
        <div class="episode flex-center q-pa-md" v-for="(episode, index) in episodes" :key="index">
          <div>
            {{ getEpisodeName(episode) }}
          </div>
        </div>
      </div>
    </div>
  </div>              
</template>
<script setup lang='ts'>
  import { defineProps } from 'vue'
  import { Episode } from 'src/types/models'

  export interface EpisodeListProps {
    episodes: Episode[];
  };

  defineProps<EpisodeListProps>()

  function getEpisodeName(episode: Episode) {
    return `#${episode.episode} - ${episode.name}`
  }
</script>
<style scoped>
.episodes-list {
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow-y: auto;
}
.episode {
  display: flex;
  gap: 5px;
}
</style>