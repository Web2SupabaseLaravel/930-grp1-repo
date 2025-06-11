import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar variant="dark" expand="lg" className="py-2" style={{ backgroundColor: '#3498DB' }}>
      <Container>
        <div className="d-flex align-items-center">
          <div className="bg-white p-1 rounded me-2">
            <span className="fw-bold" style={{ fontSize: '1.2rem', color: '#3498DB' }}>
              <i className="fas fa-graduation-cap me-1"></i>
              LearnUp
            </span>
          </div>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="" className="text-white mx-3">
              <i className="fas fa-home me-1"></i> Home
            </Nav.Link>
            <Nav.Link as={Link} to="" className="text-white mx-3">
              <i className="fas fa-th me-1"></i> Courses
            </Nav.Link>
            <Nav.Link as={Link} to="" className="text-white mx-3">
              <i className="fas fa-book me-1"></i> My courses
            </Nav.Link>
            <Nav.Link as={Link} to="" className="text-white mx-3">
              <i className="fas fa-calendar me-1"></i> Calendar
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
