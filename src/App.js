import React from "react";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import logo from "./logo.svg";
import "./App.css";
import "@aws-amplify/ui/dist/style.css"; // Styles for login component

import { withAuthenticator } from "aws-amplify-react";

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withAuthenticator(App, {
  usernameAttributes: "email",
  includeGreetings: true, // This adds the header, letting you sign out.
  signUpConfig: {
    hiddenDefaults: ["phone_number"]
  }
});
