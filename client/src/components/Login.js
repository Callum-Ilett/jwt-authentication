import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import AuthService from "../services/auth/authService";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({ email: "", password: "" });

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
      await AuthService.login(formData.email, formData.password);

      history.push("/profile");
      window.location.replace(window.location.href);
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
            Login
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

export default Login;
