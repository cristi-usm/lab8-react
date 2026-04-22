import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({ message = 'Loading...' }) {
    return (
        <div className={styles.wrap}>
            <div className={styles.ball} />
            <p className={styles.msg}>{message}</p>
        </div>
    );
}
