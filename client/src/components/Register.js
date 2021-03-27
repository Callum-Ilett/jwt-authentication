import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import AuthService from "../services/auth/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    try {
      const data = await AuthService.register(formData);
      setMessage(data.message);
      setSuccessful(true);
    } catch (error) {
      const responseMessage = error.response.data.message;

      setMessage(responseMessage);
      setSuccessful(false);
    }
  };

  return (
    <Card className="card-container">
      <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
      />

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Button type="submit" variant="primary" block>
            Register
          </Button>
        </Form.Group>

        {message && (
          <Form.Group>
            <Alert variant={successful ? "success" : "danger"}>{message}</Alert>
          </Form.Group>
        )}
      </Form>
    </Card>
  );
};

export default Register;
