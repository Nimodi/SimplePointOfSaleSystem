import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import Axios from "axios";
import { Form, Modal } from "react-bootstrap";
//import Modal from "./Modal";

export class Orderlist extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      itemlist: [
        {
          _id: "",
          customerName: "",
          createdDate: "",
          items: [
            {
              ItemId: "",
              Itemname: "",
              Qty: "",
              unitprice: ""
            }
          ]
        }
      ],

      show: false
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

  handleShow() {
    this.setState({ show: true });
  }

  // Add item to the order
  /*
  addItem(){
    
  
    Axios.post('http://localhost:5000/orders/', {
      title,
      completed: false
    })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  }
  */

  render() {
    const orders = this.state.itemlist;

    console.log(orders);
    return (
      //this.state.items.map(order => <h4>{order.Itemname}</h4>);

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
                  onClick={this.handleShow}
                />

                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ textAlign: "center" }}>
                      Order Details{" "}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Item Id</th>
                          <th>Item Name</th>
                          <th>Quantity</th>
                          <th>Unit Price</th>
                          <th>Total Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map(item => (
                          <tr>
                            <td>{item.ItemId}</td>
                            <td> {item.Itemname}</td>
                            <td>{item.Qty}</td>
                            <td>{item.unitprice}</td>
                            <td>{item.Qty * item.unitprice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Button variant="secondary" onClick={this.addItem}>
                      Add New Item
                    </Button>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </td>

              <td>{order._id}</td>
              <td>{order.customerName}</td>
              <td>{order.createdDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default Orderlist;
