import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Pagination({
    currentPage,
    totalPages,
    displayPages,
    goToPage,
    prevPage,
    nextPage
}) {
    return (
        <div className="pagination-wrap">
            {/* Previous Page Button */}
            <button
                className="pagination-arrow-button"
                onClick={prevPage}
                style={{
                    color: currentPage === 1 ? `var(--primary-text-color-light)` : '',
    
                }}
                disabled={currentPage === 1}
            >
                <FaArrowLeft />
            </button>

            {/* Go to First Page Button */}
            {currentPage > 3 && (
                <button
                    className="pagination-button"
                    // style={{ borderColor: `var(--primary-text-color)` }}
                    onClick={() => goToPage(1)}
                >
                    1
                </button>
            )}

            {/* Number Pages */}
            {[...Array(displayPages).keys()]
                .map((page) => {
                    const pageNumber = page + currentPage - (displayPages - 1);
                    return pageNumber > 0 ? pageNumber : null;
                })
                .filter(Boolean)
                .map((pageNumber) => (
                    <button
                        className="pagination-button"
                        key={pageNumber}
                        onClick={() => goToPage(pageNumber)}
                        style={{
                            color: currentPage === pageNumber ? `var(--second)` : '',
                            // borderColor: currentPage === pageNumber ? `var(--second)` : ''
                        }}
                    >
                        {pageNumber}
                    </button>
                ))}

            {/* Ellipsis if required */}
            {currentPage < totalPages - 2 && <span className='dot'> . . . </span>}

            {/* Go to Last Page Button */}
            {currentPage < totalPages && (
                <button
                    className="pagination-button"
                    onClick={() => goToPage(totalPages)}
                >
                    {totalPages}
                </button>
            )}

            {/* Next Page Button */}
            <button
                className="pagination-arrow-button"
                onClick={nextPage}
                style={{
                    color: currentPage === totalPages ? `var(--primary-text-color-light)` : '',
                    backgroundColor :`var(--card-dark-shade)`
                }}
                disabled={currentPage === totalPages}
            >
                <FaArrowRight />
            </button>
        </div>
    );
}

export default Pagination;
