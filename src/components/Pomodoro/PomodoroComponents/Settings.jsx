import React, { useContext } from 'react';
import styles from "../Pomodoro.module.scss"; 
import ReactSlider from 'react-slider';
import SettingsContext from '../../../Context/SettingsContext';
import BackButton from './BackButton';

const Settings = () => {
    const settingsInfo = useContext(SettingsContext);
  return (
    <div style={{ textAlign: "left" }}>
      <p>Work Minutes: {settingsInfo.workMinutes}:00</p>
      <div className={styles.sliderLimits}>
        <div>
          <span style={{ opacity: 0 }}>0</span>1
          <span style={{ opacity: 0 }}>0</span>
        </div>
        <div>30</div>
        <div>60</div>
        <div>90</div>
        <div>120</div>
      </div>
      <ReactSlider
        className={styles.slider}
        thumbClassName={styles.thumb}
        value={settingsInfo.workMinutes}
        onChange={(val) => settingsInfo.setWorkMinutes(val)}
        min={1}
        max={120}
      />
      <p>Break Minutes: {settingsInfo.breakMinutes}:00</p>

      <ReactSlider
        className={`${styles.slider} ${styles.green}`}
        thumbClassName={styles.thumb}
        value={settingsInfo.breakMinutes}
        onChange={(val) => settingsInfo.setBreakMinutes(val)}
        min={1}
        max={120}
      />
      <div className={styles.sliderLimits}>
        <div>
          <span style={{ opacity: 0 }}>0</span>1
          <span style={{ opacity: 0 }}>0</span>
        </div>
        <div>30</div>
        <div>60</div>
        <div>90</div>
        <div>120</div>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
      </div>
    </div>
  );
}

export default Settings;