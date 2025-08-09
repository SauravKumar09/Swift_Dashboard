import Recat from 'react';

interface Props {
    current: number;
    total: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ current, total, onPageChange}) => {
    if (total <= 1) return null;

    const pageToShow = 7;
    let start = Math.max(1, current - Math.floor(pageToShow / 2));
    let end = start + pageToShow - 1;
    if (end > total) {
        end = total;
        start = Math.max(1, end - pageToShow + 1);
    }
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);

    return (
        <div className='pagination'>
            <button className='btn' onClick={() => onPageChange(1)}
            disabled={current === 1}
            >
                First
            </button>

            <button className='btn' onClick={() => onPageChange(current - 1)}
            disabled={current === 1}
            >
                Prev
            </button>

            {start > 1 && <span className='ellipsis'>...</span>}

            {pages.map((p) => (<button key={p} className={`page-btn ${p === current ? "active" : ""}`}
            onClick={() => onPageChange(p)}
            >
                {p}
            </button>
            ))}

            {end < total && <span className='ellipsis'>...</span>}

            <button className='btn' onClick={() => onPageChange(current + 1)}
            disabled={current === total}
            >
                Next
            </button>

            <button className='btn' onClick={() => onPageChange(total)}
            disabled={current === total}
            >
                Last
            </button>
        </div>
    );
};
export default Pagination;