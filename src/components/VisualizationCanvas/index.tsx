import * as React from 'react';
import BarChart from '../BarChart';
import StackedChart from '../StackedChart';
import styles from './viscanvas.module.css';

interface Props {
    data: d3.DSVParsedArray<object> | undefined
}

const VisualizationCanvas = ({ data }: Props) => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.visualization}>
                {/* <BarChart data={data} /> */}
                {/* <StackedChart data={data} /> */}
            </div>
        </div>
    );
}

export default VisualizationCanvas;