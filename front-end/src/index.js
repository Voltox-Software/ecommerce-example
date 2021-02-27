import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from 'react-router-dom';

import * as yup from "yup";

function equalTo(ref, msg) {
	return this.test({
		name: 'equalTo',
		exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
		params: {
			reference: ref.path
		},
		test: function(value) {
      return value === this.resolve(ref) 
		}
	})
};

yup.addMethod(yup.string, 'equalTo', equalTo);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
