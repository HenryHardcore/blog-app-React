import { useEffect } from 'react';
import { useSova } from './VijestContext';
import { useState } from 'react'
import iconBookmark from './fotografije/icons-bookmark.png';
import iconBookmarkFilled from './fotografije/icons-bookmark-filled.png';



function MyBlogs({ onClose }) {
  const { sova, setSova } = useSova();
  const [niz, setNiz] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(
      sova[0] === 'Bookmarks' ? 'bookmarked-urls' : 'my-blogs'
    ) || '[]');
    setNiz(data);

    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarked-urls') || '[]');

    const bookmarksFlags = data.map(article => {
      return storedBookmarks.some(bookmarked => {
        if (article.id && bookmarked.id) {
          return article.id === bookmarked.id;
        }
        return article.url && bookmarked.url && article.url === bookmarked.url;
      });
    });

    setBookmarks(bookmarksFlags);
    }
  , [sova]);

  const toggleDetails = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

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
                  const stored = JSON.parse(localStorage.getItem('bookmarked-urls') || '[]');

                  
                  const updated = [...bookmarks];
                  const newStatus = !bookmarks[index];
                  updated[index] = newStatus;
                  setBookmarks(updated);
                  

                  
                  const isUserPost = !!article.id;
                  const identifier = isUserPost ? article.id : article.url;

                  let updatedStored;

                  if (newStatus) {
                    const alreadyBookmarked = stored.some(item =>
                      isUserPost ? item.id === identifier : item.url === identifier
                    );

                    updatedStored = alreadyBookmarked ? stored : [...stored, article];
                  } else {
                    updatedStored = stored.filter(item =>
                      isUserPost
                        ? item.id !== identifier
                        : item.url !== identifier
                    );
                  }
                  
                  localStorage.setItem('bookmarked-urls', JSON.stringify(updatedStored));

                  
                  const brojac = newStatus ? 1 : -1;
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