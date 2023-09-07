import React, { Component, createRef } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import ContactForm from "../components/ContactForm";
import ContactItem from "../components/ContactItem";
import ContactFilter from "../components/ContactFilter";

export class HomePage extends Component {
  state = {
    validated: false,
    contacts: localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')) : [],
    contact: {
      firstName: "",
      lastName: "",
      category: "",
      number: "",
    },
    search: "",
    categoryFilt: "All",
    order: 'def'
  };
  render() {
    let { contact, contacts, categoryFilt, validated, search, order } = this.state;
    let fav = contacts
      .filter((cont) => cont.favourite)
      .filter(
        (cont) =>
          cont.lastName.toLowerCase().includes(search) ||
          cont.firstName.toLowerCase().includes(search)
      );
    contacts = contacts.filter(
      (cont) =>
        cont.lastName.toLowerCase().includes(search) ||
        cont.firstName.toLowerCase().includes(search)
    );
    if (categoryFilt !== "All") {
      contacts = contacts.filter((cont) => cont.category === categoryFilt);
      fav = fav.filter((cont) => cont.category === categoryFilt);
    }
    if (order !== "def") {
      contacts = contacts.sort((a, b) => a-b);
      fav = fav.sort((a, b) => a.firstName-b.firstName);
    }
    const handleChange = (e) => {
      let newContact = { ...contact, [e.target.id]: e.target.value };
      this.setState({ contact: newContact });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      this.setState({
        contacts:
          localStorage.getItem("contacts") &&
          JSON.parse(localStorage.getItem("contacts")),
      });
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({ validated: true });
      } else {
        let newContacts = [
          ...contacts,
          { ...contact, id: Date.now(), favourite: false },
        ];
        this.setState({
          contacts: newContacts,
          contact: { firstName: "", lastName: "", category: "", number: "" },
        });
        localStorage.setItem("contacts", JSON.stringify(newContacts));
      }
    };
    const handleSearch = (e) => {
      this.setState({ search: e.target.value.trim().toLowerCase() });
    };
    const handleCategory = (e) => {
      this.setState({ categoryFilt: e.target.value });
    };
    const handleFav = (id) => {
      let newCont = contacts.map((cont) => {
        if (cont.id === id) {
          cont.favourite = !cont.favourite;
        }
        return cont;
      });
      this.setState({ contacts: newCont });
    };
    const deleteCont = (id) => {
      let newConts = this.state.contacts.filter((cont) => cont.id !== id);
      this.setState({ contacts: newConts });
      localStorage.setItem('contacts', JSON.stringify(newConts))
      console.log(id);
    };
    const handleOrder = (e) => {
      this.setState({order: e.target.value})
    }
    return (
      <Container>
        <ContactForm
          validated={validated}
          contact={contact}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
        <ContactFilter
          categoryFilt={categoryFilt}
          handleCategory={handleCategory}
          search={search}
          handleSearch={handleSearch}
          order={order}
          handleOrder={handleOrder}
        />
        <Tabs>
          <Tab eventKey="all" title="All">
            {contacts.map((contact, i) => (
              <ContactItem
                handleFav={handleFav}
                deleteCont={deleteCont}
                key={i}
                no={i + 1}
                {...contact}
              />
            ))}
          </Tab>
          <Tab eventKey="favourite" title="Favourite">
            {fav.map((contact, i) => (
              <ContactItem
                handleFav={handleFav}
                deleteCont={deleteCont}
                key={i}
                no={i + 1}
                {...contact}
              />
            ))}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default HomePage;
