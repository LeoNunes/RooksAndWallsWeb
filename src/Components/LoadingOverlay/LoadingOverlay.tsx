import styles from "./LoadingOverlay.module.css";

export default function LoadingOverlay() {
    return (
        <output className={styles.backdrop} aria-busy="true" aria-label="Loading">
            <div className={styles.spinner} />
        </output>
    );
}
