import React, { Component } from "react";
import { Form, Row, Button, Col } from "react-bootstrap";
import { categories } from "../data/Categories";

export class ContactForm extends Component {
  render() {
    const { handleChange, handleSubmit, contact, validated } = this.props;
    return (
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="w-50 mx-auto my-3 border p-3 rounded-4"
      >
        <Row className="mb-3">
          <Form.Group as={Col} md={6} controlId="firstName">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              value={contact.firstName}
              required
              onChange={handleChange}
              type="text"
              placeholder="Enter firstname..."
            />
          </Form.Group>
          <Form.Group as={Col} md={6} controlId="lastName">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              onChange={handleChange}
              required
              type="text"
              value={contact.lastName}
              placeholder="Enter lastname..."
            />
          </Form.Group>
          <Form.Group as={Col} md={6} controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select onChange={handleChange} value={contact.category} required>
              <option value="gdfsd" selected disabled>Category</option>
              {categories.map((cat) => (
                <option value={cat} key={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md={6} controlId="number">
            <Form.Label>Number</Form.Label>
            <Form.Control
              value={contact.number}
              required
              onChange={handleChange}
              type="tel"
              placeholder="Enter number..."
            />
          </Form.Group>
        </Row>
        <Button type="submit" className="w-100">
          Add
        </Button>
      </Form>
    );
  }
}

export default ContactForm;
