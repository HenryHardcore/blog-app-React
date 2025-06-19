import { useState, useEffect, useRef } from 'react';
import { useVijest } from './VijestContext';
import iconBookmark from './fotografije/icons-bookmark.png';
import iconBookmarkFilled from './fotografije/icons-bookmark-filled.png';


function GlavnaVijest() {
  const [headline, setHeadline] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const { vijest } = useVijest();
  const [bookmark, setBookmark] = useState(false)



  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${vijest}&apiKey=5f65315585d841a38ddf4e78f42f5f2c`
        );
        const data = await res.json();
        const firstArticle = data.articles[0];

        setHeadline(firstArticle.title);
        setImageUrl(firstArticle.urlToImage);
        setDescription(firstArticle.description);
        setUrl(firstArticle.url);

        const savedBookmarks = JSON.parse(localStorage.getItem('bookmarked-urls') || '[]');
        const isBookmarked = savedBookmarks.some(item => item.url === firstArticle.url);
        setBookmark(isBookmarked);

      } catch (err) {
        console.error('Failed to fetch news:', err);
      }
    }

    fetchNews();
  }, [vijest]);

  function toggleDetails() {
    setShowDetails(prev => !prev);
  };


  return(
  <div className="glavna-vijest"
  onClick={toggleDetails}
  style={{
      backgroundImage: `url(${imageUrl})`,
      cursor: 'pointer',
    }}
  >
    <div className="naslov">
      {!showDetails && <h2>{headline || 'Loading headline...'}</h2>}
      <button className="bookmark-button"
      onClick={(e) => {
      e.stopPropagation();
      const stored = JSON.parse(localStorage.getItem('bookmarked-urls') || '[]');

      const article = {
        url,
        title: headline,
        description,
        urlToImage: imageUrl
      };

      let updated;
      if (bookmark) {
        
        updated = stored.filter(item => item.url !== url);
      } else {
        
        updated = [...stored, article];
      }
      localStorage.setItem('bookmarked-urls', JSON.stringify(updated));
      setBookmark(!bookmark);
      
      }}
      style={{
        backgroundImage: `url(${bookmark ? iconBookmarkFilled : iconBookmark})`,
      }}></button>
    </div>
    {showDetails && (
        <div className="news-details">
          <p>{description}</p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <button className="read-more">Read More</button>
          </a>
        </div>
      )}
  </div>)
}

export default GlavnaVijest