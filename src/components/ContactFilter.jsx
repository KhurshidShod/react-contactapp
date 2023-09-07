import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { categories } from "../data/Categories";

export class ContactFilter extends Component {
  render() {
    const { search, handleSearch, categoryFilt, handleCategory, order, handleOrder } = this.props;
    return (
      <InputGroup className="mb-3">
        <Form.Control
          value={search}
          onChange={handleSearch}
          id="search"
          placeholder="Search..."
        />
        <InputGroup.Text>
          <Form.Select value={categoryFilt} onChange={handleCategory}>
            <option value="All">All</option>
            {categories.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
          <Form.Select value={order} onChange={handleOrder}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </Form.Select>
        </InputGroup.Text>
      </InputGroup>
    );
  }
}

export default ContactFilter;
