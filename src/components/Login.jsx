import { useEffect, useState } from "react";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import InputGroup from "react-bootstrap/esm/InputGroup";
import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
} from "../../src/components/utils/pattern";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "./gql/gql";
import Alert from "./Alerts/Alert";
import { db } from "../db";
import { useApolloClient } from "@apollo/client";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState("");
  const [alertMess, setAlertMess] = useState(null)
  const [dexieUserId, setDexieUserId] = useState("")


  const [createUser, { loading, error: userError, data: userResult }] =
    useMutation(CREATE_USER);

    useEffect(()=>{
      if(!userError) return;
      db.deckByUser.clear()
      
      console.log(userError)
      setAlertMess(userError.graphQLErrors[0].message)
      setAlertHeader(userError.name)
      setShowAlert(true)
    }, [userError])
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    //trigger mutation
    await createUser({variables: {email: userEmail, password: userPass}})
      .catch((err) => {
        setAlertHeader(err);
        setShowAlert(true);
      })
       .then((res) => {localStorage.setItem("user", JSON.stringify(res.data.createUser)); const userId = res.data.createUser.id;
         navigate(`/${userId}/flashboard`)});

        
      
      
    
   
  }

  return (
    <Container
      style={{
        textAlign: "center",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Row>
        <Col>
         
            <Alert
              success={!showAlert}
              header={alertHeader}
              message={alertMess}
              show={showAlert}
            />
         
          
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <h2>Sign In</h2>
        </Col>
        <Col></Col>
      </Row>

      <Row>
        <Form style={{ paddingTop: "100px" }} noValidate>
          <Form.Group as={Row} className="mb-3" controlId="validationCustom01">
            <Form.Label column>Email Address</Form.Label>

            <Col>
              <InputGroup hasValidation>
                <Form.Control
                  isInvalid={
                    userEmail !== "" && !userEmail.match(EMAIL_PATTERN)
                  }
                  isValid={userEmail.match(EMAIL_PATTERN)}
                  onChange={(e) => setUserEmail(e.target.value)}
                  value={userEmail}
                  maxLength={50}
                  type="text"
                  placeholder="We will not share your email..."
                  required
                />

                <Form.Control.Feedback type="invalid">
                  Please Enter A Valid Email
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
            <Form.Label column>Password</Form.Label>

            <Col>
              <Form.Control
                isInvalid={userPass !== "" && !userPass.match(PASSWORD_PATTERN)}
                isValid={userPass.match(PASSWORD_PATTERN)}
                onChange={(e) => setUserPass(e.target.value)}
                value={userPass}
                maxLength={50}
                type="password"
                placeholder="Enter Password"
                required
              />

              <Form.Control.Feedback type="invalid">
                Please Enter Valid Password with at least:
                <ul>
                  <li>minimum 8 characters</li>
                  <li>one upper case letter</li>
                  <li>one lower case letter</li>
                  <li>one number</li>
                  <li>one special character</li>
                </ul>
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} style={{ padding: "50px 0px 50px 0px" }}>
            <Col>
              <Button
                variant="dark"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Sign In
              </Button>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col>
              <p>
                Trouble accessing account? Receive a{" "}
                <a href="/">temporary password</a> and reset your account
              </p>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col>
              <p>
                Have an account? If not, then <a href="/sign-up">sign up!</a>{" "}
              </p>
            </Col>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}
