import * as React from 'react';
// import Slider from '../Slider';
import { Slider } from '@material-ui/core';
import styles from './settingsmenu.module.css';

const SettingsMenu = () => {
    return (
        <div className={styles.settingsMenuContainer}>
            <div className={styles.headingContainer}>
                <h1 className={styles.heading}>Settings</h1>
            </div>
            <div className={styles.optionsContainer}>

            </div>
        </div>
    );
}

export default SettingsMenu;