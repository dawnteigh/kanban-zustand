import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
import { devtools, persist } from 'zustand/middleware'
/* The filter method used in Column.jsx creates a new array, causing a re-render.
Zustand's shallow function will compare to see if the content between the arrays changed before re-rendering.
Using 'createWithEqualityFn' in place of the standard 'create' allows me to limit re-renders anytime I use map, filter, etc when
accessing the store by specifying 'shallow' to be used at creation, rather than having to use it on the hook itself in every
component that calls it. This will become the only way in Zustand v5. */

const store = (set) => ({
  tasks: [],
  fetch: async () => {
    const response = await fetch("http://localhost:3000/todos")
    set({ tasks: await response.json() })
  },
  draggedTask: null,
  addTask: async (title, state) => {
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        state: state
      })
    })
    const newTask = await response.json()
    set(store => ({ tasks: [...store.tasks, newTask] }), false, 'addTask')
  },
  deleteTask: async (id) => {
    fetch(`http://localhost:3000/todos/${id}`, { method: "DELETE" })
    set(store => ({ tasks: store.tasks.filter(t => t.id !== id) }), false, 'deleteTask')
  },
  setDraggedTask: (id) => set({ draggedTask: id }, false, 'setDraggedTask'),
  moveTask: async (id, state) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        state: state
      })
    })
    set(store => ({ tasks: store.tasks.map(t => t.id === id ? { ...t, state } : t) }), false, 'moveTask')
  }
})

export const useStore = createWithEqualityFn(persist(devtools(store), { name: "store" }), shallow)