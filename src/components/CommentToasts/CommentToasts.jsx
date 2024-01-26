import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
export default function CommentToasts({ header, message, show}) {

  return (
    <ToastContainer className="p-2">
      <Toast
        bg={"dark"}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">User: {header}</strong>
        </Toast.Header>
        <Toast.Body className={"text-white"}>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
