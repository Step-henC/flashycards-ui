import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useNavigate } from "react-router-dom";
export default function Alert({ success, header, message, show}) {
  let navigate = useNavigate();

  return (
    <ToastContainer className="p-2">
      <Toast
        bg={"danger"}
        show={show}
        onClose={() => navigate("/")}
      >
        <Toast.Header>
          <strong className="me-auto">{header}</strong>
        </Toast.Header>
        <Toast.Body className={"text-white"}>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
