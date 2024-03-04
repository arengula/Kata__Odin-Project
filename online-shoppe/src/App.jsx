import { useState } from 'react'

import './css/App.css'
import ProductDisplay from "./components/productDisplay"
import SiteHeading from './components/siteHeading'

function App() {
  return (
    <>
      <SiteHeading />
      <ProductDisplay />
    </>
  )
}

export default App
