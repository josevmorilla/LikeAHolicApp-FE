import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { fetchUsers } from "../../services/api";
import UserCard from "./UserCard";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then((response) => setUsers(response.data));
    }, []);

    return (
        <div className="center">
            <h1>User List</h1>
            <Container fluid>
                <Row sm={1} md={2} lg={3} className="justify-content-evenly">
                    {users.map((user) => (
                        <Col key={user.id} className="mb-4">
                            <UserCard user={user} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default UserList;
