import React, { Component } from "react";
import { Table, Card, Button } from "react-bootstrap";
import { Header } from "./Header";
import Axios from "axios";
import { MDBIcon, MDBBtn } from "mdbreact";
import { CustomInput } from "reactstrap";
var logger = require("loglevel");

export class ItemList extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      itemlist: [],
      subtotal: 0,
      items: [],
      available_items: [],
      show: false,
      orderid: this.props.match.params.orderid,
      addeditems: ["Denim", "Frock", "Tshirt", "Shirt", "Throuser", "Skirt"],
      ordered_items: [],
      itemid: "",
      qty: "",
      remain_items: [],
      add_items: [],
      select_number: []
    };
  }

  componentDidMount(ItemId) {
    Axios.get("http://localhost:5000/orders/")
      .then(res =>
        this.setState({
          itemlist: res.data
        })
      )
      .catch(err => logger.error(err));

    Axios.get("http://localhost:5000/items/")
      .then(res =>
        this.setState({
          available_items: res.data
        })
      )
      .catch(err => logger.error(err));

    Axios.get("http://localhost:5000/items/")
      .then(res =>
        this.setState({
          remain_items: res.data
        })
      )
      .catch(err => logger.error(err));

    //Delete request
    Axios.delete(
      `http://localhost:5000/orders/${this.state.orderid}/${ItemId}`
    ).then(res => {
      logger.debug(res.data);
    });
  }

  getItems() {
    const item = [];
    for (var i = 0; i < this.state.itemlist.length; i++) {
      if (this.state.itemlist[i]._id === this.state.orderid) {
        this.state.items = this.state.itemlist[i].items;
      }
    }

    const qty = [];
    for (var i = 0; i < this.state.items.length; i++) {
      for (var j = 0; j < this.state.available_items.length; j++) {
        if (
          this.state.items[i].Itemid != null &&
          this.state.items[i].Itemid === this.state.available_items[j]._id
        ) {
          qty[i] = this.state.available_items[j].Qty - this.state.items[i].Qty;
          this.state.available_items[j].Qty = qty[i];
          this.state.ordered_items[i] = this.state.available_items[j];
          this.state.ordered_items[i].Qty = this.state.items[i].Qty;
        }
      }
    }

    this.state.subtotal = 0;

    logger.debug(this.state.ordered_items);
    for (var i = 0; i < this.state.ordered_items.length; i++) {
      this.state.subtotal =
        this.state.subtotal +
        this.state.ordered_items[i].Qty * this.state.ordered_items[i].unitprice;
    }
  }

  onClick(e, id) {
    var ids = "";
    for (var i = 0; i < this.state.available_items.length; i++) {
      if (e.target.value === this.state.available_items[i].Itemname) {
        ids = this.state.available_items[i]._id;
      }
    }

    let currentComponent = this;

    Axios.post("http://localhost:5000/orders/" + id, {
      ItemId: ids,
      Qty: 1
    })
      .then(function(response) {
        logger.debug(response.data);
      })
      .catch(function(error) {
        logger.error(error);
      });
  }

  Clicked(e, ItemId) {
    e.preventDefault();
    this.componentDidMount(ItemId);
  }
  select(e) {
    logger.debug(e.target.value);
  }

  render() {
    this.getItems();

    for (var i = 1; i <= 100; i++) {
      this.state.select_number[i] = i;
    }

    return (
      <div>
        <Header />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total Amount</th>
            </tr>
          </thead>

          <tbody>
            {this.state.ordered_items.map(item => (
              <tr>
                <td> {item.Itemname}</td>
                <td>
                  <CustomInput
                    type="select"
                    id="exampleCustomSelect"
                    name="customSelect"
                  >
                    <option value="">{item.Qty}</option>
                    {this.state.select_number.map(number => (
                      <option value="">{number} </option>
                    ))}
                  </CustomInput>
                </td>
                <td>{item.unitprice}</td>
                <td>{item.Qty * item.unitprice}</td>
                ￼￼￼￼￼￼￼￼￼￼
                <MDBBtn
                  rounded
                  outline
                  color="info"
                  onClick={e => this.Clicked(e, item._id)}
                >
                  <MDBIcon icon="trash" className="cyan-text pr-3" />
                </MDBBtn>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>Sub_Total={this.state.subtotal}</div>
        <br />
        <br />
        <div>
          <h3>Add Items</h3>
        </div>
        <div>
          <Card>
            <Card.Body>
              {this.state.addeditems.map(items => (
                <Button
                  variant="outline-primary"
                  value={items}
                  onClick={event => this.onClick(event, this.state.orderid)}
                >
                  {items}
                </Button>
              ))}
            </Card.Body>
          </Card>
          ;
        </div>
      </div>
    );
  }
}

export default ItemList;
