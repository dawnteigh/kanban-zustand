import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
import { devtools } from 'zustand/middleware'
/* The filter method used in Column.jsx creates a new array, causing a re-render.
Zustand's shallow function will compare to see if the content between the arrays changed before re-rendering.
Using 'createWithEqualityFn' in place of the standard 'create' allows me to limit re-renders anytime I use map, filter, etc when
accessing the store by specifying 'shallow' to be used at creation, rather than having to use it on the hook itself in every
component that calls it. This will become the only way in Zustand v5. */

const store = (set) => ({
  tasks: [{ title: "TestTask", state: "PLANNED" }],
  draggedTask: null,
  addTask: (title, state) => set(store => ({ tasks: [...store.tasks, { title, state }] }), false, 'addTask'),
  deleteTask: (title) => set(store => ({ tasks: store.tasks.filter(t => t.title !== title) }), false, 'deleteTask'),
  setDraggedTask: (title) => set({ draggedTask: title }, false, 'setDraggedTask'),
  moveTask: (title, state) => set(store => ({ tasks: store.tasks.map(t => t.title === title ? { title, state } : t) }), false, 'moveTask')
})

export const useStore = createWithEqualityFn(devtools(store), shallow)