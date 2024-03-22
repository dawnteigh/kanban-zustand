import Column from './components/Column'
import './App.css'
import { useEffect } from 'react'
import { useStore } from './store'

function App() {
  const fetch = useStore(store => store.fetch)

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div className='App'>
      <Column state="PLANNED" />
      <Column state="ONGOING" />
      <Column state="DONE" />
    </div>
  )
}

export default App
