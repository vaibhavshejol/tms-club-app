import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import './ViewMembers.css'; // Import custom CSS for additional styling if needed
import HomePage from "../Navigation/HomePage";

const ViewMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCount, setActiveCount] = useState(0);
    const [inactiveCount, setInactiveCount] = useState(0);

    useEffect(() => {
        fetchMembers();
    }, []);

    // Fetch members from the server
    const fetchMembers = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:9090/api/member");
            const memberData = response.data;
            setMembers(memberData);
            updateCounts(memberData);
        } catch (err) {
            setError("Failed to fetch members.");
        } finally {
            setLoading(false);
        }
    };

    // Update active and inactive member counts
    const updateCounts = (members) => {
        const activeMembers = members.filter(member => member.active);
        const inactiveMembers = members.filter(member => !member.active);

        setActiveCount(activeMembers.length);
        setInactiveCount(inactiveMembers.length);
    };

    // Toggle member status and update counts
    const toggleStatus = async (memberId, currentStatus) => {
        const newStatus = !currentStatus;
        try {
            await axios.put(`http://localhost:9090/api/member/update-status/${memberId}`, { active: newStatus });
            
            // Update local state
            setMembers(prevMembers => {
                const updatedMembers = prevMembers.map(member =>
                    member.memberId === memberId ? { ...member, active: newStatus } : member
                );
                updateCounts(updatedMembers); // Recalculate counts
                return updatedMembers;
            });
        } catch (err) {
            setError("Failed to update member status.");
        }
    };

    return (
        <>
            <HomePage />
            <Container fluid className="mt-0 px-0"> {/* Use 'fluid' for full width */}
                <Row className="justify-content-center">
                    <Col xs={12} md={12} lg={12} xl={12}>
                        <div className="container-fluid p-4 bg-light border rounded shadow-sm">
                            <div className="header-section d-flex justify-content-between align-items-center mb-4">
                                <h2>Members of Toastmasters Club</h2>
                                <div>
                                    <Button variant="success" className="mr-2">
                                        Active Members ({activeCount})
                                    </Button>
                                    <Button variant="secondary">
                                        Inactive Members ({inactiveCount})
                                    </Button>
                                </div>
                            </div>
                            {loading ? (
                                <div className="text-center">
                                    <Spinner animation="border" variant="primary" />
                                    <p>Loading...</p>
                                </div>
                            ) : error ? (
                                <Alert variant="danger">
                                    {error}
                                </Alert>
                            ) : (
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>First Name</th>
                                            <th>Middle Name</th>
                                            <th>Last Name</th>
                                            <th>Gender</th>
                                            <th>Date of Birth</th>
                                            <th>Profession</th>
                                            <th>Email</th>
                                            <th>Contact</th>
                                            <th>Address</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {members.map((member) => (
                                            <tr key={member.memberId}>
                                                <td>{member.firstName}</td>
                                                <td>{member.middleName || '-'}</td>
                                                <td>{member.lastName}</td>
                                                <td>{member.gender}</td>
                                                <td>{new Date(member.dateOfBirth).toLocaleDateString()}</td>
                                                <td>{member.profession || '-'}</td>
                                                <td>{member.email}</td>
                                                <td>{member.contact}</td>
                                                <td>{member.address || '-'}</td>
                                                <td>
                                                    <Button 
                                                        variant={member.active ? "success" : "secondary"}
                                                        onClick={() => toggleStatus(member.memberId, member.active)}
                                                    >
                                                        {member.active ? "Active" : "Inactive"}
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ViewMembers;
