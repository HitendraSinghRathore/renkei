"use client"
import { useEffect, useState } from "react"

export default function PaginationNav({ page, limit, total,totalPages,hasNext,hasPrev, onPageChange }) {
    const [showDots, setShowDots] = useState(totalPages > 6);
    const [leftPages, setLeftPages] = useState([]);
    const [rightPages, setRightPages] = useState([]);
    useEffect(() => {
        if (totalPages > 6) {
          setShowDots(true);
          let leftBlock, rightBlock;
          if (page <= 2) {
            leftBlock = [1, 2];
            rightBlock = [totalPages - 2, totalPages - 1, totalPages];
          } else if (page > totalPages - 2) {
            leftBlock = [page - 4, page - 3];
            rightBlock = [totalPages - 1, totalPages];
          } else {
            leftBlock = [page - 2, page - 1, page];
            rightBlock = [totalPages - 2, totalPages - 1, totalPages];
          }
          setLeftPages(leftBlock);
          setRightPages(rightBlock);
        } else {
          setShowDots(false);
          const pages = [];
          for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
          }
          setLeftPages(pages);
          setRightPages([]);
        }
      }, [page, totalPages]);
    return (

            <div className=" sm:flex sm:flex-1 sm:items-center sm:justify-between">
    <div className="hidden sm:block ">
      <p className="text-sm text-gray-700">
        Showing
        <span className="font-medium mx-1">{(page - 1)*limit + 1}</span>
        to
        <span className="font-medium mx-1">{page*limit}</span>
        of
        <span className="font-medium mx-1">{total}</span>
        results
      </p>
    </div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs " aria-label="Pagination">
        <a href="#" className={hasPrev ? "relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 bg-white": "hidden"} onClick={() => onPageChange(page-1)}>
          <span className="sr-only">Previous</span>
          <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
        </a>
     
        {leftPages.map((p) => (
        <a
          key={p}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(p);
          }}
          className={
            p === page
              ? "relative z-10 inline-flex items-center bg-pink-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-800"
              : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 bg-white"
          } >
          {p}
        </a>
      ))}
      {showDots ? <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0  bg-white">...</span> : ''}
      {rightPages.map((p) => (
        <a
          key={p}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onPageChange(p);
          }}
          className={
            p === page
              ? "relative z-10 inline-flex items-center bg-pink-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-800"
              : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 bg-white"
          }  >
          {p}
        </a>
      ))}
        <a href="#" className={hasNext ? "relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 bg-white  bg-white": "hidden"} onClick={() => onPageChange(page+1)}>
          <span className="sr-only">Next</span>
          <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </a>
      </nav>
      </div>
    )
}