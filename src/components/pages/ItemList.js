import React, { Component } from "react";
import { Table, Card, Button, ButtonToolbar } from "react-bootstrap";
import { Header } from "./Header";
import Axios from "axios";
import { MDBIcon, MDBBtn } from "mdbreact";
import { CustomInput } from "reactstrap";

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
      additems: ["Denim", "Frock", "Tshirt", "Shirt", "Throuser", "Skirt"],
      ordered_items: [],
      itemid: "",
      qty: "",
      remain_items: [],
      add_items: [],
      select_number: []
    };
  }

  componentDidMount(ItemId) {
    // const { orderid } = this.props.match.params;
    // console.log(orderid);

    Axios.get("http://localhost:5000/orders/")
      .then(
        res =>
          this.setState({
            itemlist: res.data
          })
        //console.log(res.data)
      )
      .catch(err => console.log(err));

    Axios.get("http://localhost:5000/items/")
      .then(
        res =>
          this.setState({
            available_items: res.data
          })
        // console.log(res.data)
      )
      .catch(err => console.log(err));

    Axios.get("http://localhost:5000/items/")
      .then(
        res =>
          this.setState({
            remain_items: res.data
          })
        // console.log(res.data)
      )
      .catch(err => console.log(err));

    //Delete request
    Axios.delete(
      `http://localhost:5000/orders/${this.state.orderid}/${ItemId}`
    ).then(res => {
      console.log(res);
      console.log(res.data);
    });
  }

  getItems() {
    // console.log("**********************");
    // console.log(this.state.itemlist);
    // console.log(this.state.available_items);
    // console.log("_____________________");
    // console.log(this.state.available_items2);

    const item = [];
    for (var i = 0; i < this.state.itemlist.length; i++) {
      //console.log(this.state.itemlist[i]._id);
      if (this.state.itemlist[i]._id === this.state.orderid) {
        this.state.items = this.state.itemlist[i].items;
        // console.log(this.state.itemlist[i].items);
      }
    }
    // console.log(this.state.items);
    // console.log(this.state.items.length);
    // console.log("&&&&&&&&&&&&&&&&&&&&&&");

    const qty = [];
    for (var i = 0; i < this.state.items.length; i++) {
      for (var j = 0; j < this.state.available_items.length; j++) {
        if (this.state.items[i].Itemid === this.state.available_items[j]._id) {
          //   console.log(this.state.items[i].Itemid);
          //   console.log(this.state.items[i].Qty);
          qty[i] = this.state.available_items[j].Qty - this.state.items[i].Qty;
          this.state.available_items[j].Qty = qty[i];
          //   console.log(qty[i]);

          //   console.log(this.state.available_items[j]);

          //   this.state.ordered_items[i].itemid = this.state.available_items[
          //     j
          //   ]._id;
          //   console.log(this.state.ordered_items[i].Itemid);

          this.state.ordered_items[i] = this.state.available_items[j];

          this.state.ordered_items[i].Qty = this.state.items[i].Qty;
        }
      }
    }

    this.state.subtotal = 0;
    //this.setState({ subtotal: 0 });
    console.log(this.state.ordered_items);
    for (var i = 0; i < this.state.ordered_items.length; i++) {
      this.state.subtotal =
        this.state.subtotal +
        this.state.ordered_items[i].Qty * this.state.ordered_items[i].unitprice;
    }
    // console.log(this.state.subtotal);
    //this.setState({ subtotal: this.total });
  }

  onClick(e, id) {
    console.log(id);
    console.log(e.target.value);
    console.log(this.state.available_items);
    var ids = "";
    for (var i = 0; i < this.state.available_items.length; i++) {
      if (e.target.value === this.state.available_items[i].Itemname) {
        console.log("****");
        ids = this.state.available_items[i]._id;
      }
    }
    console.log(ids);

    let currentComponent = this;

    Axios.post("http://localhost:5000/orders/" + id, {
      ItemId: ids,
      Qty: 1
    })
      .then(function(response) {
        console.log(response.data);
        // currentComponent.state.ordered_items.push(response.data);
        console.log("&&&&&&");
        console.log(this.state.ordered_items);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  Clicked(e, ItemId) {
    console.log("+++++++++++");
    console.log(this.state.orderid);
    console.log(ItemId);
    e.preventDefault();
    this.componentDidMount(ItemId);
  }
  select(e) {
    console.log(e.target.value);
  }

  render() {
    this.getItems();
    console.log(this.state.ordered_items);
    var arr = [];
    // for (var i = 0; i < this.state.ordered_items; i++) {
    //   console.log("heeeeee");
    //   console.log(this.state.ordered_items[i].Itemname);
    //   for (var j = 0; j < this.state.additems.length; j++) {
    //     if (this.state.ordered_items[i].Itemname !== this.state.additems[j]) {
    //       console.log("heeeeee");
    //       arr.push(this.state.additems[j].Itemname);
    //     }
    //   }
    // }

    for (var i = 1; i <= 100; i++) {
      this.state.select_number[i] = i;
    }
    console.log(arr);

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
                {/* <td>{item._id}</td> */}
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

                  {/* {item.Qty}
                  <Button color="primary" onClick={e => this.BtnClick2(e)}>
                    change
                  </Button> */}
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
                {/* <MDBBtn floating size="lg" gradient="purple">
                  <MDBIcon icon="trash" className="cyan-text pr-3" />
                </MDBBtn> */}
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
              {this.state.additems.map(items => (
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
