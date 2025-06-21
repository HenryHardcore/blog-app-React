import { useEffect } from 'react';
import { useSova, useEditBlog } from './VijestContext';
import { useState } from 'react'
import iconBookmark from './fotografije/icons-bookmark.png';
import iconBookmarkFilled from './fotografije/icons-bookmark-filled.png';



function MyBlogs({ onClose }) {
  const { sova, setSova } = useSova();
  const [niz, setNiz] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);

  const { setBlogToEdit } = useEditBlog();
  
  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem('bookmarked-urls') || '[]');
    const storedArticles = JSON.parse(localStorage.getItem('bookmarked-articles') || '{}');
    const allMyBlogs = JSON.parse(localStorage.getItem('my-blogs') || '[]');

    let data = [];

    if (sova[0] === 'Bookmarks') {
      data = storedIds.map(id => storedArticles[id]).filter(Boolean);
    } else {
      data = sova[0] === 'MyBlogs' ? allMyBlogs : allNews;
    }

    setNiz(data);

    const bookmarksFlags = data.map(article => {
      const identifier = article.id || article.url;
      return storedIds.includes(identifier);
    });

    setBookmarks(bookmarksFlags);
  }, [sova]);

  

  return (
    <div className="my-blogs">
      <h2>{sova[0]}</h2>
      <div className="kontejner">
        { sova[0] === "Bookmarks" && niz.length === 0 && (
        <p>Oops, looks like u haven't bookmarked anything yet, try bookmarking some article to get started</p>
      )}
      { sova[0] === "MyBlogs" && niz.length === 0 && (
        <div className='divcibare'>
          <p>Oops, looks like u haven't posted anything yet, try posting something to get started</p>
          <button className='make-a-post' onClick={ onClose }>Make a Post</button>
        </div>
      )}
        {niz.map((article, index) => (
          <div
            className="mala-vijestt"
            key={index}
            onClick={() => toggleDetails(index)}
            style={{
              backgroundImage: `url(${article.image || article.urlToImage || './fallback.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            { sova[0] === "MyBlogs" && (
              <div className='buttons' onClick={(e) => e.stopPropagation()}>
                <button className='edit-post'  
                onClick={(e) => {
                  e.stopPropagation();
                  setBlogToEdit(article);
                  onClose(); 
                }}></button>
                <button className='delete-post' 
                onClick={() => {
                  //let updated;
                  //const stored = JSON.parse(localStorage.getItem('my-blogs') || '[]');
                  //updated = stored.filter(article => article.id !== id);
                  //localStorage.setItem('my-blogs', JSON.stringify([...updated, newPost]));
                  //setSova([sova[0], sova[1] - 1])
                  //alert("i was too lazy to ask you if u wanted to delete that post, if u didnt well rip")
                  }
                }
                
                ></button>
              </div>
            )}
            <div className="naslovv">
              {activeIndex === index ? (
                <div>
                  <p style={{ fontSize: '18px', color: 'aliceblue' }}>
                    {article.description || 'No description available.'}
                  </p>
                  {article.url && (
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      <button className="read-moree">Read More</button>
                    </a>
                  )}
                </div>
              ) : (
                <h2>{article.title || 'No Title'}</h2>
              )}
              <button
                className="bookmark-button"
                onClick={(e) => {
                  e.stopPropagation();

                  const storedIds = JSON.parse(localStorage.getItem('bookmarked-urls') || '[]');
                  const storedArticles = JSON.parse(localStorage.getItem('bookmarked-articles') || '{}');

                  const updated = [...bookmarks];
                  const newStatus = !bookmarks[index];
                  updated[index] = newStatus;
                  setBookmarks(updated);

                  const identifier = article.id || article.url;

                  let updatedIds = [...storedIds];
                  let updatedArticles = { ...storedArticles };
                  let brojac = 0;

                  if (newStatus) {
                    if (!storedIds.includes(identifier)) {
                      updatedIds.push(identifier);
                      updatedArticles[identifier] = article;
                    }
                    brojac = 1;
                  } else {
                    updatedIds = storedIds.filter(item => item !== identifier);
                    delete updatedArticles[identifier];
                    brojac = -1;
                  }

                  localStorage.setItem('bookmarked-urls', JSON.stringify(updatedIds));
                  localStorage.setItem('bookmarked-articles', JSON.stringify(updatedArticles));

                  setSova([sova[0], sova[1] + brojac]);
                }}
                style={{
                  backgroundImage: `url(${bookmarks[index] ? iconBookmarkFilled : iconBookmark})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                }}
              ></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBlogs