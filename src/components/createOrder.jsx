import React, { Component } from "react";
import { Link } from "react-router-dom";
import SKUForm from "./createSKUForm";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

class createOrder extends Component {
  state = {
    order: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      skus: [{ skuName: "", skuQty: "" }]
    }
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
  }

  handleChange = e => {
    let { order } = { ...this.state };
    if (["skuName", "skuQty", "skuMetric"].includes(e.target.className)) {
      let skus = order.skus;
      skus[e.target.dataset.id][e.target.className] = e.target.value;
      console.log(skus);
    } else {
      order[e.target.name] = e.target.value;
    }
    this.setState({ order });
    console.log(order);
  };

  handleSubmit = e => {
    let { order } = { ...this.state };
    console.log(order);
  };

  addSKU = e => {
    let { order } = { ...this.state };
    let skus = order.skus;
    skus[skus.length] = { skuName: "", skuQty: "", skuMetric: "" };
    this.setState({ order });
  };

  async fetchUser(event) {
    event.preventDefault();
    let { order } = { ...this.state };
    fetch("http://www.mocky.io/v2/5dd0f4de3200006a0006f9b7")
      .then(res => res.json())
      .then(
        result => {
          let user = result.user;
          order.firstName = user.firstName;
          order.lastName = user.lastName;
          order.phoneNumber = user.phoneNumber;
          this.setState({ order });
        },
        error => {
          console.log(error);
        }
      );
  }

  render() {
    const { order } = this.state;
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <Input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={order.phoneNumber || ""}
          onChange={this.handleChange}
          autoComplete="phone"
        />
        <button onClick={this.fetchUser} type="button">
          Enter Phone Number To Fetch Customer Details{" "}
        </button>
        <div>
          <Label for="firstName">First Name</Label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            onChange={this.handleChange}
            value={order.firstName || ""}
            autoComplete="name"
          />
          <Label for="firstName">Last Name</Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            onChange={this.handleChange}
            value={order.lastName || ""}
            autoComplete="name"
          />
          <button onClick={this.addSKU} type="button">
            Add new Item{" "}
          </button>
          <div>
            <SKUForm skus={order.skus} />
          </div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default createOrder;
