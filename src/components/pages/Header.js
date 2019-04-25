import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

export class Header extends Component {
  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark" style={{ height: 80 }} />
        <br />

        <br />
      </div>
    );
  }
}

export default Header;
