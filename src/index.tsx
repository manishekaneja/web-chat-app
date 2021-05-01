import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { firebaseKeys } from "./firebase-keys";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// Initialin=zing Firebase App
firebase.initializeApp(firebaseKeys);

// Initializing global firebase objects
const projectRealTime = firebase.database();
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp;
const increment = firebase.firestore.FieldValue.increment(1);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export {
  projectFirestore,
  projectAuth,
  serverTimeStamp,
  increment,
  projectRealTime,
};
