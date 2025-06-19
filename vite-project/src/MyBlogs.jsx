import { useEffect } from 'react';
import { useSova } from './VijestContext';
import { useState } from 'react'


function MyBlogs() {
  const { sova } = useSova();
  const [niz, setNiz] = useState([]);


  useEffect(() => {
    if(sova === "Bookmarks") {
      setNiz(JSON.parse(localStorage.getItem('bookmarked-urls') || '[]'))
    }
    else setNiz(JSON.parse(localStorage.getItem('my-blogs') || '[]'))
  }, [sova])
  
  return(
  <div className="my-blogs">
    <h2>MyBlogs</h2>
    <div className="kontejner">
      <div className='mala-vijestt'>
        <div className="naslovv"><h2>Jedem pitu brale</h2></div>
      </div>
      <div className='mala-vijestt'></div>
      <div className='mala-vijestt'></div>
      <div className='mala-vijestt'></div>
      <div className='mala-vijestt'></div>
      <div className='mala-vijestt'></div>
    </div>
  </div>
  )
}

export default MyBlogs