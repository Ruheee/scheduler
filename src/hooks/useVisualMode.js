import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    
    if (replace) {
      setHistory([...history.slice(0, history.length - 1), newMode]);
      setMode(newMode);
      return;
    }

    setMode(newMode);
    setHistory([...history, newMode]);
  };

  const back = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();

      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return { mode, transition, back };
}

