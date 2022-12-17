<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo">
      <h1>Pinia Tasks</h1>
    </header>

    <!-- task form -->
    <div class="new-task-form">
      <TaskFormVue></TaskFormVue>
    </div>

    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Favorite tasks</button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="taskStore.loading">Loading ...</div>

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

    <button @click="taskStore.$reset">Reset state</button>
  </main>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import TaskDetailsVue from './components/TaskDetails.vue';
import TaskFormVue from './components/TaskForm.vue';

import { useTaskStore } from './stores/TaskStore'

const taskStore = useTaskStore()
const filter = ref('all')

//fetch tasks
taskStore.getTasks()

</script>

<style scoped>

</style>
