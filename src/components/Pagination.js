import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange, loading }) {
  // pas assez de pages = pas de pagination
  if (totalPages <= 1) return null;
  
  // génère les numéros de pages à afficher
  const getPages = () => {
    const pages = [];
    
    if (totalPages <= 7) {
      // peu de pages -> tout afficher
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const goToPage = (page) => {
    if (typeof page === 'number' && page !== currentPage && !loading) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      {/* bouton précédent */}
      <button
        className={`page-btn ${currentPage === 1 || loading ? 'disabled' : ''}`}
        onClick={() => currentPage > 1 && !loading && onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
      >
        ← Précédent
      </button>

      {/* numéros de pages */}
      {getPages().map((page, index) => (
        <button
          key={index}
          className={`page-btn ${page === currentPage ? 'active' : ''} ${page === '...' ? 'ellipsis' : ''}`}
          onClick={() => goToPage(page)}
          disabled={page === '...' || loading}
        >
          {page}
        </button>
      ))}

      {/* bouton suivant */}
      <button
        className={`page-btn ${currentPage === totalPages || loading ? 'disabled' : ''}`}
        onClick={() => currentPage < totalPages && !loading && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
      >
        Suivant →
      </button>
    </div>
  );
}

export default Pagination;