
import css from "./CalendarHeaderWeek.module.scss"
import currentDateFormatted from '../../../redux/calendar/getFormattedDate';
import { newWeek} from "components/сalendar/helps/createNewWeek";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { getCurrentDate } from "../../../redux/calendar/selectors";
import { useEffect, useState } from "react";
import { chosedDateAction } from "redux/calendar/actions";
import { NavLink } from "react-router-dom";

const CalendarHeaderWeek = () => {
    const dispatch = useDispatch();
    const currentDate = useSelector(getCurrentDate);
    const deserialized = moment(currentDate);
    const week = newWeek(deserialized);

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
    
    const clickDay = (day) => {
        dispatch(chosedDateAction(moment(day).format()));
    }

    const isCurrentDay = (item) => moment().isSame(item, "D");
    const isCurrentChosedDay =(item)=> deserialized.isSame(item, "D")
    return (
        <div key={new Date()} className={`${css.days_wrapper } ${css.days_wrapp}`}>
            {
                week.map((item, i) =>
                    <NavLink key={i}
                        className={
                            !isCurrentChosedDay(item)
                            ?
                            `${css.days_wrap} ${css.column} ${css.hover_color}`
                            :
                            `${css.days_wrap} ${css.column} ${css.back}  ${css.scale}`
                        }
                        onClick={
                        (currentDateFormatted.slice(0,8)+"01" <= item.format('YYYY-MM-DD'))
                        
                            ?
                        () => clickDay(item)
                            :
                            null
                    }
                        to={`/calendar/day/${item.format("YYYY-MM-DD")}`}
                    >
                        <div className={`${css.days} `}>
                             {windowSize.width < 768 ? `${item.format('ddd').slice(0, 1)}`:`${item.format('ddd')}` }
                        </div>
                        {isCurrentDay(item)
                                ? 
                            <div className={`${ css.current_day} ${css.date} ${css.scale}  `}>
                                <span className={css.current_day} >{item.format('D')} </span>
                            </div>
                                :
                            <div className={`${css.date}  ${css.min_scale}  `}>
                                <span >{item.format('D')} </span>
                            </div>
                        }
                    </NavLink>
                )
            }
        </div>
        
    )
}
export { CalendarHeaderWeek }

