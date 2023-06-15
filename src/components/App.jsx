import { Suspense, lazy, useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { RestrictedRoute } from './RestrictedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'hooks/useAuth';
import { authCurrentThunk } from 'redux/user/user-operations';
import { PrivateRoute } from './PrivateRoute';
import Calendar from './сalendar/Calendar';
import CalendarDaysTask from './сalendar/calendarDaysTask/CalendarDaysTask';
import { getCurrentDate } from '../redux/calendar/selectors';
import { fetchTasks } from 'redux/tasks/tasksOperations';
import { Loader } from './Loader/Loader';
import { selectorAuthStatus } from 'redux/user/selectors';
import { ROUTES } from 'constants/routes.constans';

const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const UserPage = lazy(() => import('../pages/AccountPage/AccountPage'));
const MainPage = lazy(() => import('../pages/MainPage/MainPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing, isLoggedIn } = useAuth();
  const currentDate = useSelector(getCurrentDate);
  const status = useSelector(selectorAuthStatus);
  

  useEffect(() => {
    dispatch(authCurrentThunk());
    if (isLoggedIn) {
      dispatch(fetchTasks());
    }
  }, [dispatch, isLoggedIn]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      {status === "loading" && <Loader />}
      <Suspense>
        <Routes>
          <Route path={ROUTES.root} index element={<HomePage />} />
          <Route
            path={ROUTES.login}
            element={
              <RestrictedRoute
                redirectTo={`/calendar/month/${currentDate.slice(0, 7)}`}
                component={<LoginPage />}
              />
            }
          />
          <Route
            path={ROUTES.register}
            element={
              <RestrictedRoute
                redirectTo={`/calendar/month/${currentDate.slice(0, 7)}`}
                component={<RegisterPage />}
              />
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute redirectTo={ROUTES.root} component={<MainPage />} />
            }
          >
            <Route path={ROUTES.account} element={<UserPage />} />
            <Route
              path={ROUTES.calendar}
              element={
                <div>
                  <Outlet />
                </div>
              }
            >
              <Route path="month/:currentDate" element={<Calendar />} />
              <Route path="day/:currentDay" element={<CalendarDaysTask />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};
