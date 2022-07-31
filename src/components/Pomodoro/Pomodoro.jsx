import { useState } from "react";
import Settings from "./PomodoroComponents/Settings";
import Timer from "./PomodoroComponents/Timer";
import SettingsContext from "../../Context/SettingsContext";
import styles from "./Pomodoro.module.scss"; 

const Pomodoro = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={styles.PomodoroContainer}>
      <p className={styles.Heading}>
        Pomodoro{" "}
        <p
          className={styles.HeadingSvg}
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-info-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </p>
      </p>
      {showInfo ? (
        <div className={styles.HeadingInfo}>
          <p>
            <blockquote>
              The Pomodoro Technique is a time management method for students,
              perfectionists, and procrastinators of all kinds. Work in focused,
              25-minute intervals.
            </blockquote>
          </p>
        </div>
      ) : (
        <></>
      )}
      <SettingsContext.Provider
        value={{
          showSettings,
          setShowSettings,
          workMinutes,
          breakMinutes,
          setWorkMinutes,
          setBreakMinutes,
        }}
      >
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </div>
  );
};
export default Pomodoro;
