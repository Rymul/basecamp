import React from "react";
import { Route, Switch } from 'react-router-dom'
import LoginFormPage from "./components/LoginFormPage/index";
import Navigation from "./components/Navigation";
import SignupForm from "./components/SignupFormPage";

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
          <Route path='/'></Route>
          <h1>Splash Page</h1>
        </Switch>
    </>
  );
}

export default App;
