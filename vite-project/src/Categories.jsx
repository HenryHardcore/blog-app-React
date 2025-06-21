import { useVijest } from './VijestContext';
import { useSova } from './VijestContext';


function Categories({ onClose }) {
  const { setVijest } = useVijest();
  const { sova, setSova } = useSova();

  function HandleClick(e) {
    setVijest(e.target.value);
  }

  function HandleSova(e) {
    setSova([e.target.value, sova[1]])
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
    <button value="Bookmarks" onClick={HandleSova}>BOOKMARKS</button>
    <button value="MyBlogs" onClick={HandleSova}>MYBLOGS</button>
    <button value="MyBlogs" onClick={ onClose }>AD POST</button>
  </div>)
}

export default Categories