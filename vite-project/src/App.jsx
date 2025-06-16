import { useState } from 'react'
import Header from "./Header.jsx"
import Profile from "./Profile.jsx"
import Categories from "./Categories.jsx"
import GlavnaVijest from "./GlavnaVijest.jsx"

function App() {

  return (
    <>
      <Header/>
      <div className='interface'>
        <Profile/>
        <Categories/>
      </div>
      <div className='main-content'>
        <GlavnaVijest/>
        <div className='sporedne-vijesti'>
          <div className='mala-vijest'></div>
          <div className='mala-vijest'></div>
          <div className='mala-vijest'></div>
          <div className='mala-vijest'></div>
        </div>
      </div>
    </>
  )
}

export default App
