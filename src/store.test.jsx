import { useEffect } from "react";
import { useStore } from "./store";
import { vi } from "vitest";
import { render } from "@testing-library/react";

vi.mock('zustand')

function TestComponent({ selector, effect }) {
  const items = useStore(selector);

  useEffect(() => effect(items), [items]);

  return null;
}

test('should return default value at the start', () => {
  const selector = (store) => store.tasks;
  const effect = vi.fn();
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledWith([]);
});

test('should add item to store and rerun effect', () => {
  const selector = (store) => ({ tasks: store.tasks, addTask: store.addTask, deleteTask: store.deleteTask });
  let createdTask = false;
  let currentItems;
  const effect = vi.fn().mockImplementation((items) => {
    currentItems = items;
    if (!createdTask) {
      items.addTask('a', 'b')
      createdTask = true;
    }
    else if (items.tasks.length === 1) {
      items.deleteTask('a')
    }
  });
  render(<TestComponent selector={selector} effect={effect} />);
  expect(effect).toHaveBeenCalledTimes(3);
  expect(currentItems.tasks).toEqual([])
});