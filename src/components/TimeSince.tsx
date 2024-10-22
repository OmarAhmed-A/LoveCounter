import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

interface TimeSinceProps {
  date: string;
}

function TimeSince({ date }: TimeSinceProps): JSX.Element {
  const [years, setYears] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [timeSince, setTimeSince] = useState<string>("");
  const [anniversary, setAnniversary] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const then = new Date(date);
      const now = new Date();
      let diff = now.getTime() - then.getTime();
      const newYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      diff -= newYears * (1000 * 60 * 60 * 24 * 365);
      const newMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
      diff -= newMonths * (1000 * 60 * 60 * 24 * 30);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= days * (1000 * 60 * 60 * 24);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      diff -= hours * (1000 * 60 * 60);
      const minutes = Math.floor(diff / (1000 * 60));
      diff -= minutes * (1000 * 60);
      const seconds = Math.floor(diff / 1000);

      setYears(newYears);
      setMonths(newMonths);

      let output = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      setTimeSince(output);

      // Trigger confetti and set anniversary message at specific milestones
      if (
        (newMonths === 1 && days === 0 && newYears === 0) ||
        (newMonths === 6 && days === 0) ||
        (newYears >= 1 && newMonths % 12 === 0 && days === 0)
      ) {
        confetti({
          particleCount: 200,
          spread: 80,
          origin: { y: 0.9 },

        });
        let annivMessage = `Happy ${
          newYears > 0 ? newYears + " Year" : newMonths + " Month"
        } Anniversary Babygirl ❤️`;
        setAnniversary(annivMessage);
        // alert(annivMessage); // This will show the popup
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [date]);

  return (
    <div className="FullMessage">
      {years > 0 && <span>{years} Years</span>}
      {months > 0 && <span>{months} Months</span>}
      {timeSince && <span>{timeSince}</span>}
      <p className="text2">together</p>
      {anniversary && <div className="anniversary-message">{anniversary}</div>}
    </div>
  );
}

export default TimeSince;
