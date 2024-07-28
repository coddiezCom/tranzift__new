import styles from "./DotLoader.module.css";

function DotLoader(){
    return(
        <div className={styles.dotContainer}>
        <div className={styles.dots}></div>
        <div className={styles.dots}></div>
        <div className={styles.dots}></div>
        <div className={styles.dots}></div>
        <div className={styles.dots}></div>
      </div>
    )
}

export default DotLoader;