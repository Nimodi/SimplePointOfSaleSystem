import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/pages/Login";
//import shop from "./components/2.jpg";
import Orderlist from "./components/pages/Orderlist";
import Modal from "./components/pages/Modal";
//import Axios from "axios";

class App extends Component {
  //ridirect to the login page.

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/login" component={Login} />
          <Orderlist />
          <Modal />
        </div>
      </Router>
    );
  }
}

export default App;
