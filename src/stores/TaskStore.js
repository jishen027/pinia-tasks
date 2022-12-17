import { defineStore } from "pinia";

const url = 'http://localhost:3000/tasks';

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        loading: false,
    }),

    getters: {
        favs() {
            return this.tasks.filter(task => task.isFav)
        },
        favCount() {
            return this.tasks.reduce((p, c) => {
                return c.isFav ? p + 1 : p
            }, 0)
        },
        totalCount: (state) => {
            return state.tasks.length
        }
    },

    actions: {
        async getTasks() {
            this.loading = true
            const res = await fetch(url)
            const data = await res.json()
            this.tasks = data
            this.loading = false
        },

        async addTask(task) {
            this.tasks.push(task);

            const res = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(task),
                headers: { 'Content-Type': 'application/json' }
            })

            if (res.error) {
                console.log(res.error)
            }
        },
        async deleteTask(id) {
            this.tasks = this.tasks.filter(t => {
                return t.id !== id
            })

            const res = await fetch(url + '/' + id, {
                method: 'DELETE',
            })

            if (res.error) {
                console.log(res.error)
            }
        },
        async toggleFav(id) {
            const task = this.tasks.find(t => t.id === id)
            task.isFav = !task.isFav

            const res = await fetch(url + '/' + id, {
                method: 'PATCH',
                body: JSON.stringify({ isFav: task.isFav }),
                headers: { 'Content-Type': 'application/json' }
            })

            if (res.error) {
                console.log(res.error)
            }
        }
    }


})