import css from "./CalendarGrid.module.scss";
// import currentDateFormatted from '../../../redux/calendar/getFormattedDate';
import moment from 'moment/moment';
import { useEffect, useState } from "react";
import { chosedDateAction, swichAction,} from "../../../redux/calendar/actions";
import { useSelector, useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { getCurrentDate } from "../../../redux/calendar/selectors";
import { selectTasks } from "redux/tasks/taskSelectors";

const CalendarGrid = ({theme}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const currentDate = useSelector(getCurrentDate);
    const deserialized = moment(currentDate);

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

    const dataAllMonth = useSelector(selectTasks)

    //старт заполнения ячеек датами
    const startDay = deserialized.clone().startOf("month").startOf("week");
    const firstDayOfMonth = deserialized.clone().startOf('month').date(1);
    const lastDayOfMonth = deserialized.clone().endOf('month');
    const day = startDay.clone().subtract(1, "day");

//масив заполненый датами и сразу наблюдая немой вопрос в ваших глазах зачем и причем здесь 42 или 35, может это мой возраст или количество выпитых чашек кофе, может количество выкуриных пачек сигарет за время написания проэкта, нет все проще это количество ячеек нашего календаря
    const arrayDays = [...Array(
        firstDayOfMonth.day() === 0 ? 42
        :
        lastDayOfMonth.day() === 1 ? 42 : 35)]

        .map(() => day.add(1, "day").clone());

        // console.log("🚀  arrayDays:", arrayDays);
// функция выбора даты из ячейки
    const boxClick = (day) => {
        dispatch(swichAction(false))
        navigate(`/calendar/day/${day.format("YYYY-MM-DD")}`);
        dispatch(chosedDateAction(moment(day).format()));
    };

    //сравнение это тот день или не тот день
    const isCurrentDay = (item) => moment().isSame(item, "D");
    //сравнение это тот месяц или другой не тот который показан или тот который нужно убрать
    const isCurrentMonth = (item) => deserialized.isSame(item, "month");

    return (
        <>
            <div className={`${css.grid} ${theme}`}>

            {arrayDays.map((item) => (
                <div key={item.unix()}
                    className={`${css.box} ${theme}`}
                    onClick={
                        isCurrentMonth(item)
                            ?
                        () => boxClick(item)
                            :
                            null
                    }>

                    <div className={`${css.box_wrap} ${theme}`}>
                        {isCurrentDay(item)
                                ?
                            <div className={`${css.box_day} ${css.current_day} ${theme}`}>
                                <span>{item.format("D")}</span>
                            </div>
                                :
                        <div className={isCurrentMonth(item) ? `${css.box_day}`
                                : `${css.box_day}  ${css.not_current_month}`}
                            ><span >{item.format("D")}</span></div>}

                    </div>
                    <div className={`${css.notice_wrap} ${theme}` }>
                        {dataAllMonth.filter((itemDay, i) =>
                            (item.format("YYYY-MM-DD") === moment(itemDay.taskDate).format("YYYY-MM-DD")))?.slice(0, 3)
                            .map((itemDay, i) => (
                                <p key={i} className={
                                    isCurrentMonth(item)
                                        ?
                                    itemDay.priority === "high"
                                        ?`${css.notice} ${css.high}`
                                        :
                                        itemDay.priority === "medium"
                                        ?
                                        `${css.notice} ${css.medium}`
                                        :
                                        `${css.notice}`: `${css.not_current_month}`
                                }> {windowSize.width > 768 ? `${itemDay.title.slice(0, 7)}...`
                                        : windowSize.width < 768 ? `${itemDay.title.slice(0, 3)}...`
                                            : windowSize.width < 660 ? `${itemDay.title.slice(0, 3)}...`
                                                : `${itemDay.title.slice(0, 2)}.`}</p>
                        ))}
                    </div>
                </div>
                ))
            }
        </div>
            </>
    )
}
export {CalendarGrid}