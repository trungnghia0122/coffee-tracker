import { useState } from "react"

import Layout from "./components/Layout"
import CoffeeForm from "./components/CoffeeForm"
import Hero from "./components/Hero"
import Stats from "./components/Stats"
import History from "./components/History"

function App() {
  const isAuthenticated = false

  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  )

  return (
    <>
      <Layout>
        <Hero />
        <CoffeeForm isAuthenticated={isAuthenticated} />
        {isAuthenticated && authenticatedContent}
      </Layout>
    </>
  )
}

export default App
