// __mocks__/zustand.js
import * as zustand from 'zustand'
import { act } from '@testing-library/react'

const { create: actualCreate } = await vi.importActual('zustand')

// a variable to hold reset functions for all stores declared in the app
export const storeResetFns = new Set();

export const create = (createState) => {
  const store = actualCreate(createState)
  const initialState = store.getState()
  storeResetFns.add(() => {
    store.setState(initialState, true)
  })
  return store
}

// reset all stores after each test run
beforeEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn()
    })
  })
})