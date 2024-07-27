import { isRunningAtom, timeLeftAtom } from "@/store";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Paragraph } from "./ui/typography";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useAtom(timeLeftAtom);
  const [isRunning, setIsRunning] = useAtom(isRunningAtom);

  useEffect(() => {
    let initialInterval = null;

    if (isRunning && timeLeft > 0) {
      initialInterval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => {
      if (initialInterval) clearInterval(initialInterval);
    };
  }, [setTimeLeft, timeLeft, isRunning, setIsRunning]);

  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    if (minutes === 0 && seconds === 0) {
      setIsRunning(false);
    }

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  return (
    <div className="bg-destructive rounded-sm px-2 py-1 fixed top-4">
      <Paragraph className="font-bold text-white">
        Your time: {formatTime(timeLeft)}
      </Paragraph>
    </div>
  );
}
