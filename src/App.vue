<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Favorite tasks</button>
    </nav>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetailsVue :task="task"></TaskDetailsVue>
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favCount }} favorite tasks left to do</p>
      <div v-for="task in taskStore.favs" :key="task.id">
        <TaskDetailsVue :task="task"></TaskDetailsVue>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import TaskDetailsVue from './components/TaskDetails.vue';

import { useTaskStore } from './stores/TaskStore'

const taskStore = useTaskStore()
const filter = ref('all')

</script>

<style scoped>

</style>
