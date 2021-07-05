import * as React from 'react';
import { MdAdd, MdFileUpload, MdMenu } from 'react-icons/md';
import * as d3 from 'd3';
import styles from './sidemenu.module.css';
import { autoType, max } from 'd3';

interface Props {
    updateData: (data: d3.DSVParsedArray<object>) => void
}

const SideMenu = ({ updateData }: Props) => {

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

    const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let files = e.target.files;
        let file = files![0];
        let reader = new FileReader();
        reader.onload = function (event) {
            let data = d3.csvParse(reader.result!.toString(), autoType);
            console.log(max(data, ((val) => val[data.columns[2]])));
            updateData(data);
        }
        reader.readAsText(file);
    }

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
                        <label className={styles.uploadButton} htmlFor="csv-upload">Upload <MdFileUpload size={30} style={{ marginLeft: '0.5rem' }} /></label>
                        <input id="csv-upload" type="file" accept=".csv" onChange={(e) => uploadFile(e)} style={{ display: 'none' }} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideMenu;