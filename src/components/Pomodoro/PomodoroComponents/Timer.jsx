import React, { useContext, useEffect, useState, useRef} from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayBtn from "./PlayBtn";
import PauseBtn from "./PauseBtn";
import SettingsBtn from "./SettingsBtn";
import SettingsContext from "../../../Context/SettingsContext";
import useSound from "use-sound";
import BreakRing from "../../../assets/Break.mp3";
import PlayPauseRing from "../../../assets/PlayPause.mp3";
import styles from "../Pomodoro.module.scss"; 

const red = "#308DFD";
const green = "#00AA5A";

const Timer = () => {
  const settingsInfo = useContext(SettingsContext);

  const [Break] = useSound(BreakRing);
  const [PlayPause] = useSound(PlayPauseRing);

  const [isPaused, setIsPaused] = useState(true);
  const [secLeft, setSecLeft] = useState(0);
  const [mode, setMode] = useState("work");

  const secLeftRef = useRef(secLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function initTimer() {
    secLeftRef.current = settingsInfo.workMinutes * 60;
    setSecLeft(secLeftRef.current);
  }

  function tick() {
    secLeftRef.current--;
    setSecLeft(secLeftRef.current);
  }

  useEffect(() => {
    Break();
  }, [mode]);

  function switchMode() {
    const nextMode = modeRef.current === "work" ? "break" : "work";
    const nextSec =
      (nextMode === "work"
        ? settingsInfo.workMinutes
        : settingsInfo.breakMinutes) * 60;
    setMode(nextMode);
    modeRef.current = nextMode;
    setSecLeft(nextSec);
    secLeftRef.current = nextSec;
  }

  useEffect(() => {
    initTimer();
    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secLeftRef.current === 0) {
        return switchMode();
      }
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSec =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secLeft / totalSec) * 100);

  const minutes = Math.floor(secLeft / 60);
  let seconds = secLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={minutes + ":" + seconds}
        styles={buildStyles({
          textColor: "#757582",
          pathColor: mode === "work" ? red : green,
          trailColor: "#DDDEE6",
        })}
      />
      <div style={{ marginTop: "20px" }}>
        <audio>
          <source src="./assets/StartSound.mp3" type="audio/mp3"></source>
        </audio>
        {isPaused ? (
          <PlayBtn
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
              PlayPause();
            }}
          />
        ) : (
          <PauseBtn
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
              PlayPause();
            }}
          />
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <SettingsBtn onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
};

export default Timer;
