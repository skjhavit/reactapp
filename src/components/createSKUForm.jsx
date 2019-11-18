// src/components/CatInputs.js
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { instanceOf } from "prop-types";

const SKUForm = props => {
  return props.skus.map((val, idx) => {
    let skuNameId = `Item-${idx}`,
      skuQtyId = `QTY-${idx}`;
    return (
      <div key={idx}>
        <label htmlFor={skuNameId}>{`SKU #${idx + 1}`}</label>
        <input
          type="text"
          name={skuNameId}
          data-id={idx}
          id={skuNameId}
          value={props.skus[idx].skuName}
          className="skuName"
        />
        <label htmlFor={skuQtyId}>QTY</label>
        <input
          type="text"
          name={skuQtyId}
          data-id={idx}
          id={skuQtyId}
          value={props.skus[idx].skuQty}
          className="skuQty"
        />
      </div>
    );
  });
};
export default SKUForm;
