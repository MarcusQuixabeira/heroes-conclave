<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="row">
          <div class="column items-center col-12 col-lg-3">
            <q-skeleton square width="300px" height="300px" />
          </div>
          <div class="col-12 col-lg-9">
            <div class="row">
              <div class="col-12">
                <q-skeleton type="text" height="100px"/>
              </div>
            </div>
            <div class="row q-pt-md">
              <div class="col-12">
                <q-skeleton type="text"/>
              </div>
            </div>

            <q-separator spaced inset light />

            <div class="row">
              <div class="col-12 q-pt-lg">
                <q-skeleton type="text" height="60px"/>
              </div>
            </div>

            <div class="row q-pt-md">
              <div class="col-12 episodes-list">
                <div class="episode flex-center q-pa-md">
                  <q-skeleton type="text"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<style scoped>
</style>