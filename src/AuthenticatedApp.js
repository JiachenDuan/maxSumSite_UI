import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { useUser } from "./UserProvider";
import { useAuth } from "./AuthProvider";

function AuthenticatedApp() {
  const [binaryTree, setBinaryTree] = useState("");
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();
  const { logout } = useAuth();

  const genCalculate = useCallback(() => {
    setIsLoading(true);
    fetch(`http://localhost:8080/maxsum`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
      body: JSON.stringify({ serializedBinaryTree: binaryTree }),
    })
      .then((res) => res.json())
      .then((response) => {
        setIsLoading(false);
        if (response.message !== undefined) {
          setErrorMessage(response.message);
        }
        if (response.maxsum !== undefined) {
          setResult(response.maxsum);
        }
      })
      .catch((error) => setErrorMessage(error));
  }, [binaryTree, user]);

  const binaryTreeOnChange = useCallback((e) => {
    setResult(null);
    setErrorMessage(null);
    setBinaryTree(e.target.value);
  }, []);

  // redirect to login page if there is no user token exist
  if (user === null) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-end">
            <Button variant="outline-success" onClick={() => logout()}>
              LOGOUT
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>
                Given a preorder serialized binary tree, each tree node has an
                integer value. Calculate the maximum sum of the longest path.
                Each node should be separated by , and use # as null node.
                Example: 1,2,#,5,2,#,#,#,6,9,#,1,#,#,7,#,#
              </Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={binaryTree}
                onChange={(e) => binaryTreeOnChange(e)}
              />
            </Form.Group>
            <Button
              disabled={binaryTree === "" || isLoading}
              onClick={() => genCalculate()}
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
              CALCULATE
            </Button>
            {errorMessage !== null && (
              <Alert
                variant="danger"
                onClose={() => {
                  setBinaryTree("");
                  setResult(null);
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
          {result !== null && binaryTree !== "" && (
            <Form.Label> The sum of the longest path is {result}.</Form.Label>
          )}
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default AuthenticatedApp;
