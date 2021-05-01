import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import store from "./redux";
import EntryScreen from "./screens";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="w-screen h-screen bg-gray-100 flex items-stretch justify-center ">
          <EntryScreen />
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
