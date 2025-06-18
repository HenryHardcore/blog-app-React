import { useEffect, useState } from 'react';
import { useVijest } from './VijestContext';
import iconBookmark from './fotografije/icons-bookmark.png';
import iconBookmarkFilled from './fotografije/icons-bookmark-filled.png';


function MaleVijesti() {
  const [articles, setArticles] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const { vijest } = useVijest();
  const [bookmarks, setBookmarks] = useState([]);
  


  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${vijest}&apiKey=5f65315585d841a38ddf4e78f42f5f2c`
        );
        const data = await res.json();

        
        const news = data.articles
        .slice(1, 20) 
        .filter(article => article.urlToImage && article.description)
        .slice(0, 12); 

        setArticles(news);
        setBookmarks(new Array(news.length).fill(false))
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    }

    fetchNews();
  }, [vijest]);

  function toggleDetails(index) {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {articles.map((article, index) => (
        <div
          className="mala-vijest"
          key={index}
          onClick={() => toggleDetails(index)}
          style={{
            backgroundImage: `url(${article.urlToImage})`,
          }}
        >
          <div className="naslovv">
            {activeIndex === index ? (
            <>
              <p style={{ fontSize: '18px', color: 'aliceblue' }}>
                {article.description || 'No description available.'}
              </p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <button className="read-moree">Read More</button>
              </a>
            </>
          ) : (
            <h2>{article.title}</h2>
          )}
          <button
          className="bookmark-button"
          onClick={(e) => {
            e.stopPropagation();
            const updated = [...bookmarks];
            updated[index] = !updated[index]; 
            setBookmarks(updated);
          }}
          style={{
            backgroundImage: `url(${bookmarks[index] ? iconBookmarkFilled : iconBookmark})`,
          }}
        ></button>
          </div>
        </div>
      ))}
    </>
  );
}

export default MaleVijesti