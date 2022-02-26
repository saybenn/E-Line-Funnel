import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const AdminEmailScreen = () => {
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");

  const handleSend = async () => {
    setSent(true);
    try {
      await axios.post("http://send_newsletter", {
        text,
        subject,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!sent ? (
        <Form onSubmit={handleSend}>
          <Form.Group controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="text">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" vairant="primary">
            Send Email
          </Button>
        </Form>
      ) : (
        <h1>Form Sent</h1>
      )}
    </>
  );
};

export default AdminEmailScreen;
