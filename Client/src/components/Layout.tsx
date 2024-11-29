import React from 'react';
import {Container, Nav, Navbar } from 'react-bootstrap';

export default function Layout(props:React.PropsWithChildren) {
    return (
        <div className="d-flex flex-column min-vh-100">

            <Navbar expand="md" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/" role="button">HirePrep</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Your AI-Powered Interview Preparation Assistant</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <main className="flex-grow-1 py-3">
                <Container>
                    {props.children}
                </Container>
            </main>

            <footer className="py-4 text-center text-body-secondary bg-body-tertiary mt-4">
                Created by Peter Daniel Marko
            </footer>
        </div>
    );
}