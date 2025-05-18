<template>
  <q-page>
    <div class="q-pa-md">
      <!-- Begin of Breadcrumb (This can be a component and use the route metadata) -->
      <div class="q-gutter-sm">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="home" label="Home" to="/" />
          <q-breadcrumbs-el icon="stars" label="Heroes" />
        </q-breadcrumbs>
      </div>
       <!-- End of Breadcrumb -->
    </div>
    <div class="q-pa-md">
      <q-table
        title="Heroes"
        :rows="heroesList?.results || []"
        :columns="columns"
        row-key="name"
        v-model:pagination="pagination"
        :loading="loading"
        @request="newPage"
        :rows-per-page-options="[20]"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              <router-link :to="`/heroes/${props.row.id}`">
                {{ props.row.name }}
              </router-link>
            </q-td>
            <q-td key="status" :props="props">
              <q-badge :color="getStatusBadgeColor(props.row.status)">
                {{ props.row.status }}
              </q-badge>
            </q-td>
            <q-td key="species" :props="props">
              {{ props.row.species }}
            </q-td>
            <q-td key="type" :props="props">
              {{ props.row.type }}
            </q-td>
            <q-td key="gender" :props="props">
              {{ props.row.gender }}
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn
                size="10px"
                round
                flat
                outline
                color="blue"
                title="View hero"
                icon="visibility"
                @click="clickViewHandler(props.row.id)"
              />
            </q-td>
          </q-tr>
        </template>

        <template v-slot:top-right>
          <SearchBox @search="search" @clear="clearSearch"></SearchBox>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
<script setup lang="ts">
  import { api } from "src/boot/axios";
  import { useQuasar } from 'quasar'
  import { onMounted, ref } from "vue";
  import { useRouter } from "vue-router";
  import { StatusBadgeColor, type HeroesList, type RequestProp } from "src/types/models"
  import SearchBox from 'components/SearchBox.vue'
  import type { AxiosError } from "axios";

  
  const router = useRouter()
  const $q = useQuasar()
  
  const heroesList = ref<HeroesList | null>(null)
  const loading = ref(false)
  const pagination = ref({
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 20,
    rowsNumber: 0
  })


  const columns = [
    { name: 'name', label: 'Name', field: 'name', sortable: false, align: 'left' as const },
    { name: 'status', label: 'Status', field: 'status', sortable: false, align: 'left' as const},
    { name: 'species', label: 'Species', field: 'species', sortable: false, align: 'left'  as const },
    { name: 'type', label: 'Type', field: 'type', sortable: false, align: 'left'  as const },
    { name: 'gender', label: 'Gender', field: 'gender', sortable: false, align: 'left'  as const },
    { name: 'actions', label: 'Actions', field:'', sortable: false, align: 'center'  as const },
  ]

  async function newPage(props: unknown) {
    const { page, rowsPerPage, sortBy, descending } = (props as RequestProp).pagination
    try {
      loading.value = true
      const response = await fetch(page)
      heroesList.value = response.data

      pagination.value.page = page
      pagination.value.rowsPerPage = rowsPerPage
      pagination.value.sortBy = sortBy
      pagination.value.descending = descending
    } catch(error){
      console.log(error)
    } finally {
      loading.value = false
    }
  }
  
  // Let's do this in the REST way
  function fetch(page: number, name?: string) {
    const params = { params: { page: page, name: name }}
    
    return api.get('/character', params)
  }

  function getStatusBadgeColor(status: string) {
    if (status) {
      return StatusBadgeColor[status as keyof typeof StatusBadgeColor]
    }
    return StatusBadgeColor.None
  }

  async function clickViewHandler(hero_id: string) {
    await router.push({ name: 'HeroDetail', params: { hero_id: hero_id } })
  }

  async function updateTable(search?: string) {
    try {
      loading.value = true
      const response = await fetch(1, search)
      const data = response.data
      heroesList.value = data
      pagination.value.rowsNumber = data.info.count
    } catch (error) {
      const axiosError = error as AxiosError
      $q.notify(
        {
          message: `${axiosError.message}: ${ (axiosError.response?.data as { error: string }).error }`,
          icon: 'error',
          color: 'red'
        }
      )
    } finally {
      loading.value = false
    }
  }

  async function search(text: string) {
    await updateTable(text)
  }

  async function clearSearch() {
    await updateTable()
  }

  onMounted(async () => {
    await updateTable()
  })
</script>