import Stack from "react-bootstrap/esm/Stack";
import Button from "react-bootstrap/esm/Button";

export default function ButtonLayout({
  removeName,
  addName,
  submitName,
  onLeave,
  onCancel,
  onSubmit,
  showGrade,
  grade,
}) {
  return (
    <Stack style={{ width: "100%", padding: "0 50px 0 50px" }} direction="horizontal" gap={3}>
      <Button onClick={onLeave} variant="outline-dark" className="p-2">
        {removeName}
      </Button>
      {showGrade && (
        <div className="p-2 m-auto">
          <h5>Your Grade: {grade}</h5>
        </div>
      )}
      <Button
        onClick={onCancel}
        variant="outline-success"
        className="p-2 ms-auto"
      >
        {addName}{" "}&#10009;
      </Button>
      <Button onClick={onSubmit} variant="dark" className="p-2">
        {submitName}
      </Button>
    </Stack>
  );
}
