import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import './AddRole.css';
import HomePage from "../Navigation/HomePage";

const AddRole = () => {
    const [formData, setFormData] = useState({
        roleName: "",
        roleDescription: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:9090/api/role", formData);
            alert("Role added successfully...");
            console.log(response);
        } catch (error) {
            alert("Sorry... something went wrong...");
            console.error('Error:', error);
        }
    };

    return (
        <>
            <HomePage />
            <Container className="mt-0">
                <Row className="justify-content-center">
                    <Col xs={12} md={12} lg={12} xl={12}>
                        <div className="form-container p-4 bg-light border rounded shadow-sm">
                            <h2 className="text-center mb-4">Add Role</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="roleName">
                                    <Form.Label>Role Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="roleName"
                                        value={formData.roleName}
                                        onChange={handleChange}
                                        placeholder="Enter role name"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="roleDescription">
                                    <Form.Label>Role Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="roleDescription"
                                        value={formData.roleDescription}
                                        onChange={handleChange}
                                        placeholder="Enter description"
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AddRole;
