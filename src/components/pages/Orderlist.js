import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Axios from "axios";
import { Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Header } from "./Header";
import { withRouter } from "react-router";
var logger = require("loglevel");

export class Orderlist extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      itemlist: [],
      subtotal: 0,
      items: [],
      show: false,
      orderid: "",
      redirect: false,
      student: "hello"
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:5000/orders/")
      .then(res =>
        this.setState({
          itemlist: res.data
        })
      )
      .catch(err => logger.error(err));
  }

  handleClose() {
    this.setState({ show: false });
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/itemlist`} />;
    }
  };

  total = 0;
  handleShow(event, items, orderid) {
    this.setState({ items: items });
    this.setState({ orderid: orderid });

    this.props.history.push("/itemlist/" + orderid);
  }

  render() {
    const orders = this.state.itemlist;

    this.new_itemlist = this.props.new_items;

    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <Card style={{ paddingleft: 5000 }}>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th />
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          defaultChecked={this.state.complete}
                          ref="complete"
                          onClick={event =>
                            this.handleShow(event, order.items, order._id)
                          }
                        />
                      </td>
                      <td>{order._id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.createdDate}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default withRouter(Orderlist);
