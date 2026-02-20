import { useState, useEffect, useMemo } from 'react'
import { getHappyHourCities } from './utils/timezone'
import type { HappyHourCity } from './utils/timezone'
import { Header } from './components/Header'
import { SearchBar } from './components/SearchBar'
import { CityList } from './components/CityList'
import './App.css'

function App() {
  const [cities, setCities] = useState<HappyHourCity[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setCities(getHappyHourCities())
    const interval = setInterval(() => {
      setCities(getHappyHourCities())
    }, 60_000)
    return () => clearInterval(interval)
  }, [])

  const filtered = useMemo(() => {
    if (!search) return cities
    const term = search.toLowerCase()
    return cities.filter((c) => c.name.toLowerCase().includes(term))
  }, [cities, search])

  return (
    <div className="app">
      <Header />
      <main className="main">
        <SearchBar value={search} onChange={setSearch} />
        <CityList cities={filtered} />
      </main>
    </div>
  )
}

export default App
