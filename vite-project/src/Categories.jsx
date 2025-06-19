import { useVijest } from './VijestContext';




function Categories() {
  const { setVijest } = useVijest();

  function HandleClick(e) {
    setVijest(e.target.value);
  }

  return(
  <div className="categories">
    <h2>CATEGORIES</h2>
    <button value="general" onClick={HandleClick}>GENERAL</button>
    <button value="business" onClick={HandleClick}>BUSINESS</button>
    <button value="technology" onClick={HandleClick}>TECHNOLOGY</button>
    <button value="entertainment" onClick={HandleClick}>ENTERTAINMENT</button>
    <button value="sports" onClick={HandleClick}>SPORTS</button>
    <button value="health" onClick={HandleClick}>HEALTH</button>
    <button value="nation" onClick={HandleClick}>NATION</button>
    <button value="bookmarks">BOOKMARKS</button>
    <button>MYBLOGS</button>
  </div>)
}

export default Categories