import { useState, useEffect } from 'react'
import { useAuth } from './auth'
import Header from "./Header.jsx"
import Profile from "./Profile.jsx"
import Categories from "./Categories.jsx"
import GlavnaVijest from "./GlavnaVijest.jsx"
import MyBlogs from "./MyBlogs.jsx"
import MaleVijesti from './MaleVijesti.jsx'
import MakePost from "./MakePost.jsx"
import LoginForm from './LoginForm.jsx'

function App() {
  const { userLoggedIn } = useAuth();
  const [showPostForm, setShowPostForm] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  console.log("User logged in:", userLoggedIn);

  useEffect(() => {
    const rootElement = document.getElementById('root');

    if (!userLoggedIn) {
      rootElement.classList.add('login-mode');
    } else {
      rootElement.classList.remove('login-mode');
    }

  }, [userLoggedIn]);
  

  if (!userLoggedIn) {
    return (
      <div className='login-screen'>
        <LoginForm/>
      </div>
    );
  }
  return (
    <>
      {showPostForm && (
        <div className='form-for-post'>
          <MakePost onClose={() => setShowPostForm(false)} />
        </div>
      )}
      <Header searchQuery={searchQuery} setSearchQuery ={setSearchQuery}/>
      <div className='interface'>
        <Profile/>
        <Categories onClose={() => setShowPostForm(true)}/>
      </div>
      <div className='main-content'>
        <GlavnaVijest searchQuery={searchQuery} setSearchQuery ={setSearchQuery}/>
        <div className='sporedne-vijesti'>
          <MaleVijesti searchQuery={searchQuery} setSearchQuery ={setSearchQuery}/>
        </div>
      </div>
      <MyBlogs onClose={() => setShowPostForm(true)} />
    </>
  )
}

export default App
