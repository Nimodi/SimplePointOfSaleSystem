import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/pages/Login";
//import shop from "./components/2.jpg";
import Orderlist from "./components/pages/Orderlist";
import Modal from "./components/pages/Modal";
import { Redirect } from "react-router-dom";
import { ItemList } from "./components/pages/ItemList";
import { Header } from "./components/pages/Header";
import { NumberPicker } from "react-widgets";

//import Axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //ridirect to the login page.

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Login} />
            <Route component={Orderlist} exact path="/orderlist" />
            <Route component={ItemList} path="/itemlist/:orderid" />
          </Switch>

          {/* <Orderlist /> */}

          <Modal />
        </div>
      </Router>
    );
  }
}

export default App;
