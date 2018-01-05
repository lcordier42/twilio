import * as React from "react";
import * as ReactDOM from "react-dom";

import "./index.css";
// @ts-ignore
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// @ts-ignore
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
