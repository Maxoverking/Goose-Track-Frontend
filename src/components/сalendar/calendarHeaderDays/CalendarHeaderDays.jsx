import css from "../calendarHeaderWeek/CalendarHeaderWeek.module.scss";
import { useEffect, useState } from "react";
const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const CalendarHeaderDays = () => {
    const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
    
    return (
        <div key={new Date()} className={`${css.days_wrapper} `}>
                { daysOfWeek.map((item, i) => <div key={i} className={css.days_wrap} >
                    <div className={`${css.days} ${i > 4? css.weekend : ''}`}> {windowSize.width < 768 ? `${item.slice(0, 1)}`:  `${item}` } </div>
                    </div>)}
                </div>
    )
}
export { CalendarHeaderDays }
