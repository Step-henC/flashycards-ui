import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Layout from "../Layout/Layout";
import { db } from "../../db";
import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DashboardButtonLayout from "../Layout/DashboardButtonLayout";
import Alert from "../Alerts/Alert";
import SpinnerLoadingScreen from "../LoadingSpinner/LoadingSpinner";

export default function CommentsDashboard() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMess, setAlertMess] = useState("");
  const [externalComments, setExternalComments] = useState([]);
  let navigate = useNavigate();
  let { userId } = useParams();
  if (!userId) {
    navigate("/");
  }


  async function deleteComment(e, index) {
    e.preventDefault();
   // db.comments.where({comment: {id: commentID}}).delete() //try this
    db.comments.clear();
    // db.deckByUser.clear();
  };

  const commentList =
    useLiveQuery(
      async () => {
        const commentList = await db.comments.toArray();

        //load spinner
        return commentList;
      },
      [userId, externalComments] //objects that affect query. Userid foes not but I need to stop endless rerenders
    )
  ;



  useEffect(() => {
    if (!commentList) return;
    setExternalComments(commentList);
    console.log(commentList)
  }, [commentList]);
  return (
    <Layout>
      <DashboardButtonLayout />
      <Alert
        success={!showAlert}
        header={""}
        message={alertMess}
        show={showAlert}
      />

      <Table responsive style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th colSpan={4}>Comment</th>
            <th>User Name</th>
            <th>Delete Comment</th>
          </tr>
        </thead>
        <tbody>
          {externalComments?.length !== 0 ? (
            externalComments.map((comm, index) => (
              <tr>
                <td colSpan={4}>{comm?.kafkaComment?.comment}</td>
                <td>{comm?.kafkaComment?.userId}</td>

                <td>
                  <Button
                    onClick={(e) => deleteComment(e, index)}
                    size="sm"
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <h2>No comments at this time</h2>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Layout>
  );
}
