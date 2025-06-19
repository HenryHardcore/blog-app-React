import { useState } from 'react'
import Header from "./Header.jsx"
import Profile from "./Profile.jsx"
import Categories from "./Categories.jsx"
import GlavnaVijest from "./GlavnaVijest.jsx"
import MyBlogs from "./MyBlogs.jsx"
import MaleVijesti from './MaleVijesti.jsx'
import MakePost from "./MakePost.jsx"

function App() {

  return (
    <>
      <div className='form-for-post'>
        <MakePost/>
      </div>
      <Header/>
      <div className='interface'>
        <Profile/>
        <Categories/>
      </div>
      <div className='main-content'>
        <GlavnaVijest/>
        <div className='sporedne-vijesti'>
          <MaleVijesti/>
        </div>
      </div>
      <MyBlogs/>
    </>
  )
}

export default App
