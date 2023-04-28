import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {setCurrentPage} from "../../../store/movie";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
}) => {
  const dispatch = useDispatch();
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasPreviousPage = previousPage >= 1;
  const hasNextPage = totalPages && nextPage <= totalPages;

  const getPageLink = (pageNumber: number) => {
    console.log('pageNumber', pageNumber)
    console.log('currentPage', currentPage)
    console.log('totalPages', totalPages)
    dispatch(setCurrentPage(pageNumber))
  };

  return (
    <nav className="flex justify-center">
      <ul className="flex items-center space-x-2">
        {hasPreviousPage && (
          <button onClick={() => getPageLink(previousPage)}>
            <a className="flex items-center px-3 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-100">
              <FontAwesomeIcon icon={faAngleLeft} className="mr-2" />
                                Previous
            </a>
          </button>
        )}
        {totalPages ? Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => getPageLink(page)}>
            <a
              className={`flex items-center px-3 py-2 rounded-md ${
                page === currentPage
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </a>
          </button>
        )): null}
        {hasNextPage && (
          <button onClick={() => getPageLink(nextPage)}>
            <a className="flex items-center px-3 py-2 rounded-md bg-white text-gray-700 hover:bg-gray-100">
                                Next
              <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
            </a>
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
