import React from "react";
import { Route, Switch } from 'react-router-dom'
import LoginFormPage from "./components/LoginFormPage/index";
import SignupForm from "./components/SignupFormPage";

function App() {
  return (
    <>
      <h1>Hello from App</h1>
      <Switch>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupForm />
        </Route>
      </Switch>
    </>
  );
}

export default App;
