import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import Axios from "axios";
import { Form, Modal, Card } from "react-bootstrap";
import { AddItem } from "./AddItem";
import { Redirect } from "react-router-dom";
import ItemList from "./ItemList";
import { Header } from "./Header";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

//import Modal from "./Modal";

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
      .then(
        res =>
          this.setState({
            itemlist: res.data
          })
        //console.log(res.data)
      )
      .catch(err => console.log(err));
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
      console.log("********");
      return <Redirect to={`/itemlist`} />;
    }
  };

  total = 0;
  handleShow(event, items, orderid) {
    // this.setRedirect();
    this.setState({ items: items });
    this.setState({ orderid: orderid });

    this.props.history.push("/itemlist/" + orderid);
  }

  // Add item to the order

  addItem() {
    // Axios.post("http://localhost:5000/orders/", {
    //   item: [],
    //   completed: false
    // }).then(res =>
    //   this.setState({ items: [...this.state.itemlist.items, res.data] })
    // );
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
                        {/* {this.renderRedirect()} */}
                        {/* <Link to={`/itemlist`} /> */}
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
