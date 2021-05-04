import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { Routes } from "../constants/Routes";
import { useLoginAuthWatcher } from "../hooks/useLoginAuthWatcher";
import { useProfileWatcher } from "../hooks/useProfileWatcher";
import ChatRoom from "./ChatRoom";
import ContactScreen from "./ContactScreen";
import ErrorScreen from "./ErrorScreen";
import HomeScreen from "./HomeScreen";
import OnBoardingScreen from "./OnBoardingScreen";
import RequestScreen from "./RequestScreen";

function EntryScreen() {
  useLoginAuthWatcher();
  useProfileWatcher();
  const { isLoggedIn } = useSelector((state: RootState) => state.application);
  return (
    <div className="w-full  h-full bg-white max-w-3xl flex flex-col flex-1 shadow-2xl overflow-y-auto">
      {isLoggedIn ? (
        <Switch>
          <Route path={Routes.chat} component={HomeScreen} />
          <Route path={Routes.contact} component={ContactScreen} />
          <Route path={Routes.request} component={RequestScreen} />
          <Route path={Routes.room + "/:roomid"} component={ChatRoom} />
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
