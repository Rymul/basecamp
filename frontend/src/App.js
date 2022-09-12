import React from "react";
import { Route, Switch } from 'react-router-dom'
import CampsiteShow from "./components/CampsiteShow";
import ReviewForm from "./components/CampsiteShow/ReviewForm";
import LoginFormPage from "./components/LoginFormPage/index";
import Navigation from "./components/Navigation";
import SignupForm from "./components/SignupFormPage";
import SplashPage from "./components/SplashPage";


function App() {
  return (
    <>
      <Navigation />
        <Switch>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupForm />
          </Route>
          <Route path='/campsites/:campsiteId'>
            <CampsiteShow />
          </Route>
          <Route path='/new_review/:campsiteId'>
            <ReviewForm />
          </Route>
          <Route path='/'>
            <SplashPage />
          </Route>
        </Switch>
    </>
  );
}

export default App;
