import { LinksFunction } from '@remix-run/node';
import { useState } from 'react';
import style from './style.css';

interface Props {
  totalPages: number;
  rows: number;
  onPageChange: (page: number) => void;
}

export default function PaginatorComponent({
  totalPages,
  rows,
  onPageChange,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageButton = (page: number) => (
    <button
      key={page}
      className='paginator__item'
      onClick={() => handlePageChange(page)}
      style={{ fontWeight: page === currentPage ? 'bold' : 'normal' }}>
      {page}
    </button>
  );

  const renderPageButtons = () => {
    const pagesToShow = 5;
    const maxPages = Math.ceil(totalPages / rows);
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(maxPages, startPage + pagesToShow - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    ).map(renderPageButton);
  };

  return (
    <div>
      <div>{renderPageButtons()}</div>
    </div>
  );
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];
