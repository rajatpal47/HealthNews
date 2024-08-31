import React, { useState, useEffect } from 'react';
import { fetchHealthNews } from '../service/newsService.js';
import HealthNewsCategories from '../components/HealthNewsCategories.jsx';
import Pagination from '../components/Pagination.jsx';
import Modal from '../components/Modal';

const HealthNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('general');
  const [bookmarks, setBookmarks] = useState([]);
  const [page, setPage] = useState(1); 
  const [totalResults, setTotalResults] = useState(0); 
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false); 
  const [articleToRemove, setArticleToRemove] = useState(null); 

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(savedBookmarks);

    const getNews = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchHealthNews(page, 9);
        console.log('Fetched data:', data);
        if (data && data.articles) {
          setArticles(data.articles);
          setTotalResults(data.totalResults);
          setTotalPages(Math.ceil(data.totalResults / 9));
        } else {
          throw new Error('Unexpected data format');
        }
      } catch (err) {
        console.error('Fetch error:', err); 
        setError('Failed to fetch news articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [category, page]);

  const handleBookmark = (article) => {
    const updatedBookmarks = [...bookmarks, article];
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  };

  const handleRemoveBookmark = (url) => {
    setArticleToRemove(url); 
    setShowModal(true); 
  };

  const confirmRemoveBookmark = () => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.url !== articleToRemove);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    setShowModal(false);
  };

  const isBookmarked = (url) => {
    return bookmarks.some((bookmark) => bookmark.url === url);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="w-full px-4 lg:max-w-[70%] mx-auto my-4 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">LATEST NEWS</h1>
        <HealthNewsCategories setCategory={setCategory} />
      </div>

      {articles.length === 0 && !loading && <p>No articles available.</p>}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {articles.length > 0 &&
        articles.map((article, index) => (
          <div key={index} className="border-b pb-4 mb-4 flex flex-col items-start md:flex-row md:justify-between md:gap-2">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              <h2 className="text-xl font-semibold">{article.title}</h2>
            </a>
            <p className="text-gray-700 mt-2">{article.description}</p>
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-auto mt-2"
              />
            )}
            <button
              onClick={() =>
                isBookmarked(article.url)
                  ? handleRemoveBookmark(article.url)
                  : handleBookmark(article)
              }
              className={`mt-2 py-1 px-4 rounded ${
                isBookmarked(article.url) ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              }`}
            >
              {isBookmarked(article.url) ? 'Remove Bookmark' : 'Bookmark'}
            </button>
          </div>
        ))}

      {totalPages > 1 && (
        <Pagination page={page} pages={totalPages} onPageChange={handlePageChange} />
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmRemoveBookmark}
      />
    </div>
  );
};

export default HealthNews;
