import styles from './Pagination.module.css';

export default function Pagination({ page, totalPages, onPrev, onNext }) {
    return (
        <div className={styles.wrap}>
            <button className={styles.btn} onClick={onPrev} disabled={page <= 1}>
                ← Prev
            </button>
            <span className={styles.info}>
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
            </span>
            <button className={styles.btn} onClick={onNext} disabled={page >= totalPages}>
                Next →
            </button>
        </div>
    );
}
