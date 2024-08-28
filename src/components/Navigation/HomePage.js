import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
// import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css'; // Import the custom CSS file

const HomePage = () => {

    // const navigate = useNavigate()

    // const handleMeetings = () => {
    //     // Navigate to the home page
    //     navigate(`/view-meetings`);
    // };

    // onClick={handleMeetings} 

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">IN000A1 Toastmasters Club</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto flex-fill">
          <Nav.Item className="flex-item">
            <Button variant="outline-light" href="view-meetings">Meetings</Button>
          </Nav.Item>
          <Nav.Item className="flex-item">
            <Button variant="outline-light" href="/view-members">Members</Button>
          </Nav.Item>
          <Nav.Item className="flex-item">
            <Button variant="outline-light" href="/view-role">Roles</Button>
          </Nav.Item>
          <Nav.Item className="flex-item">
            <Button variant="outline-light" href="#guest">Guest</Button>
          </Nav.Item>
          <Nav.Item className="flex-item">
            <Button variant="outline-light" href="#winner">Winner</Button>
          </Nav.Item>
          <Nav.Item className="flex-item">
            <Button variant="outline-light" href="#attendance">Attendance</Button>
          </Nav.Item>
          <Nav.Item className="flex-item">
            <Button variant="outline-light" href="#payments">Payments</Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HomePage;
