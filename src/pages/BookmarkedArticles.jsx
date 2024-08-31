import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal'; 

const BookmarkedArticles = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(9); // Number of items per page
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(savedBookmarks.reverse());
    setTotalPages(Math.ceil(savedBookmarks.length / itemsPerPage));
  }, []);

  const handleRemoveBookmark = (url) => {
    setArticleToDelete(url);
    setShowModal(true);
  };

  const confirmDelete = () => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.url !== articleToDelete);
    setBookmarks(updatedBookmarks.reverse());
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    setTotalPages(Math.ceil(updatedBookmarks.length / itemsPerPage));
    setShowModal(false);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const indexOfLastArticle = page * itemsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
  const currentArticles = bookmarks.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="w-full lg:max-w-[70%] mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Bookmarked Articles</h1>
      {currentArticles.length === 0 ? (
        <p>No bookmarks available.</p>
      ) : (
        <ul className="space-y-4">
          {currentArticles.map((article, index) => (
            <li key={index} className="border-b pb-4 mb-4 flex flex-col items-start md:flex-row md:justify-between md:gap-2">
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
                onClick={() => handleRemoveBookmark(article.url)}
                className="bg-red-500 text-white py-1 px-4 mt-2 rounded hover:bg-red-600"
              >
                Remove Bookmark
              </button>
            </li>
          ))}
        </ul>
      )}
      
      {totalPages > 1 && (
        <Pagination
          page={page}
          pages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default BookmarkedArticles;
