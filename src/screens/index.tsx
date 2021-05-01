import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Routes } from "../constants/Routes";
import { watchUserStateThunk } from "../redux/thunk/watchUserStateThunk";
import ContactScreen from "./ContactScreen";
import ErrorScreen from "./ErrorScreen";
import HomeScreen from "./HomeScreen";
import OnBoardingScreen from "./OnBoardingScreen";
import RequestScreen from "./RequestScreen";

function EntryScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(watchUserStateThunk());
  }, [dispatch]);
  const { isLoggedIn } = useSelector((state: RootState) => state.application);
  console.log(isLoggedIn);
  return (
    <div className="w-full  h-full flex flex-col flex-1 shadow-2xl overflow-y-auto">
      {isLoggedIn && <Header />}
      {isLoggedIn ? (
        <Switch>
          <Route path={Routes.chat} component={HomeScreen} />
          <Route path={Routes.contact} component={ContactScreen} />
          <Route path={Routes.request} component={RequestScreen} />
          <Route path={Routes.login}>
            <Redirect from={Routes.login} to={Routes.chat} />
          </Route>
          <Route exact path={Routes.home}>
            <Redirect from={Routes.home} to={Routes.chat} />
          </Route>
          <Route path="/*" component={ErrorScreen} />
        </Switch>
      ) : (
        <Switch>
          <Route path={Routes.login} component={OnBoardingScreen} />
          <Route path="*">
            <Redirect to={Routes.login} />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default EntryScreen;
