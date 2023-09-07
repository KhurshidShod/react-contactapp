import React, { Component, Fragment } from "react";
import { Alert, Badge, Button } from "react-bootstrap";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export class ContactItem extends Component {
  render() {
    const { id, firstName, lastname, number, category, no, favourite, deleteCont, handleFav } = this.props;
    return (
      <Alert
        variant={"info"}
        className="d-flex justify-content-between align-items-center"
      >
        <div>
          <span className="mx-1 h5">
            {no}. {firstName} {lastname}
          </span>
          <Badge bg="danger">{category}</Badge>
        </div>
        <div className="d-flex gap-1 align-items-center">
          <Button onClick={() => handleFav(id)} style={{backgroundColor: 'transparent', border: 'none'}} className="">{favourite ? (
            <AiFillStar style={{ cursor: "pointer" }} color="yellow" size={25} />
          ) : (
            <AiOutlineStar style={{ cursor: "pointer" }} color="yellow" size={25} />
          )}</Button>
          <Button className="btn btn-success"><a href={'tel:'+number} style={{color: 'white', textDecoration: 'none'}}>{number}</a></Button>
          <Button className="btn btn-danger" onClick={() => deleteCont(id)}>Del</Button>
        </div>
      </Alert>
    );
  }
}

export default ContactItem;
