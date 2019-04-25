import React, { Component } from "react";
import Orderlist from "./Orderlist";
import { Button, ButtonToolbar } from "react-bootstrap";
import Axios from "axios";

export class AddItem extends Component {
  state = {
    item_list2: ["Denim", "Frock", "Trouser", "Skirt", "TShirt", "Shirt"]
  };

  onClick = e => {
    e.preventDefault();

    console.log(this.props.orderid);

    const user = {
      name: this.state.name
    };

    Axios.post(`http://localhost:5000/orders/`, { user }).then(res => {
      console.log(res);
      console.log(res.data);
    });
  };

  render() {
    // console.log(this.state.student);
    // console.log(this.state.new_items.length);
    // console.log(this.state.new_items[0].ItemId);
    return (
      <div>
        <br />
        <br />
        <h2>Items</h2>
        <br />
        <ButtonToolbar>
          {this.state.item_list2.map(items => (
            <Button
              variant="primary"
              onClick={this.onClick}
              style={{ width: 200 }}
            >
              {items}
            </Button>
          ))}
        </ButtonToolbar>
        <div>{this.props.orderid}</div>
        <Orderlist order_id={this.props.orderid} />
      </div>
    );
  }
}

export default AddItem;
