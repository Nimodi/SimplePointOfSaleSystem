import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Button, Card } from "react-bootstrap";
//import Bootstrap from "react-bootstrap";
import Axios from "axios";
import "./login.css";
//import { send } from "q";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    this.state = {
      name: "",
      password: ""
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
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    event.preventDefault();
  };

  //login redirect to the orderlist page
  routeChange() {
    {
      let path = `/orderlist`;
      this.props.history.push(path);
    }
  }

  render() {
    return (
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
              <Button
                block
                bssize="large"
                disabled={!this.validateForm()}
                onClick={this.routeChange}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
