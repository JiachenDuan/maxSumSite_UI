import React, { useState, useCallback } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import { Redirect } from "react-router-dom";
import { useUser } from "./UserProvider";
import { useAuth } from "./AuthProvider";

function UnauthenticatedApp() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const user = useUser();
  const {
    register,
    login,
    isLoading,
    errorMessage,
    setErrorMessage,
  } = useAuth();

  const validEmailRegex = useCallback(
    RegExp(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    )
  );

  // redirect to main app page if we successfully get user login data
  if (errorMessage === null && user !== null) {
    return <Redirect to="/home" />;
  }

  const emailOnchange = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(validEmailRegex.test(e.target.value));
  };

  return (
    <Container>
      <Card>
        <Card.Header>
          <Row>
            <Col>
              <Card.Title>{isLogin ? "Login" : "Create Account"}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {isLogin
                  ? "Please sign in to continue."
                  : "Please sign up to continue."}
              </Card.Subtitle>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                Email address{" "}
                {!isValidEmail && (
                  <Badge pill variant="danger">
                    Email is not valid!
                  </Badge>
                )}
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => emailOnchange(e)}
              />
              <Form.Text className="text-muted">
                We will never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              block
              disabled={
                email === "" || password === "" || !isValidEmail || isLoading
              }
              onClick={
                isLogin
                  ? () => login(email, password)
                  : () => register(email, password)
              }
            >
              {isLoading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {isLogin ? "LOG IN" : "SIGN UP"}
            </Button>
            {errorMessage !== null && (
              <Alert
                variant="danger"
                onClose={() => {
                  setEmail("");
                  setPassword("");
                  setErrorMessage(null);
                }}
                dismissible
              >
                <p>{errorMessage}</p>
              </Alert>
            )}
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          {isLogin ? `Don't have an account?` : `Already have an account?`}{" "}
          <Button
            onClick={() => {
              setIsLogin(!isLogin);
            }}
            variant="outline-success"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default UnauthenticatedApp;
