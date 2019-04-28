import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Button, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Axios from "axios";
import "./login.css";
import Orderlist from "./Orderlist";

var logger = require("loglevel");

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",

      redirect: false
    };
  }

  validateForm() {
    return this.state.name.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    //post data to backend

    const url = "http://localhost:5000/users/";

    const user = {
      name: this.state.name,
      password: this.state.password
    };

    Axios.post(url, user)
      .then(function(response) {
        logger.debug(response);
      })
      .catch(function(error) {
        logger.error(error);
      });

    event.preventDefault();
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="./orderlist" />;
    }
  };

  render() {
    return (
      <div className="Login-component" style={{ height: 930 }}>
        <div className="Login" style={{ paddingLeft: 700, paddingTop: 300 }}>
          <Card style={{ width: "18rem", height: "18rem" }}>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <form onSubmit={this.handleSubmit}>
                <Form.Group controlId="name" bssize="large">
                  <Form.Control
                    autoFocus
                    type="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="password" bssize="large">
                  <Form.Control
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                  />
                </Form.Group>
                {this.renderRedirect()}
                <Button
                  block
                  bssize="large"
                  disabled={!this.validateForm()}
                  onClick={this.setRedirect}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Card.Body>
          </Card>
        </div>
        <Router>
          <Route component={Orderlist} path="./orderlist" />
        </Router>
      </div>
    );
  }
}
