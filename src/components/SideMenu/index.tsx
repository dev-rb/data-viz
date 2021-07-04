import * as React from 'react';
import { MdAdd, MdFileUpload, MdMenu } from 'react-icons/md';
import styles from './sidemenu.module.css';

const SideMenu = () => {

    const [mobileMenuActive, setMobileMenuActive] = React.useState(false);

    React.useEffect(() => {
        let container = document.querySelector("#container");
        document.body.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
            if (mobileMenuActive) {
                setMobileMenuActive(false);
            }
        });
    }, [mobileMenuActive])

    return (
        <>
            <MdMenu className={styles.menuButton} size={80} color="white" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMobileMenuActive(true); }} />
            <div id="container" className={`${styles.container} ${mobileMenuActive ? styles.active : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className={styles.logoContainer}>
                    <div className={styles.logo}>
                        <h1> Viz </h1>
                        <div className={styles.logoCircles}>
                            <div />
                            <div />
                        </div>
                    </div>
                </div>

                <div className={styles.examplesContainer}>
                    <h1 className={styles.examples}> Examples </h1>
                    <h1 className={styles.datasets}> Datasets </h1>
                </div>

                <div className={styles.visContainer}>
                    <div className={styles.visualizations}>
                        <button className={styles.newVizButton}> New Viz <MdAdd size={30} style={{ marginLeft: '0.5rem' }} /> </button>
                    </div>

                    <div className={styles.optionsContainer}>
                        <button className={styles.uploadButton}> Upload <MdFileUpload size={30} style={{ marginLeft: '0.5rem' }} /></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideMenu;