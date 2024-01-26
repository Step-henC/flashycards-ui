import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Layout from "../Layout/Layout";
import { db } from "../../db";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DashboardButtonLayout from "../Layout/DashboardButtonLayout";
import { useQuery } from "@apollo/client";
import { COMMENT_SUBSCRIPTION, DELETE_DECK, GET_USERS_DECK } from "../gql/gql";
import { useMutation, useSubscription } from "@apollo/client";
import Alert from "../Alerts/Alert";
import SpinnerLoadingScreen from "../LoadingSpinner/LoadingSpinner";
import CommentToasts from "../CommentToasts/CommentToasts";
export default function FlashBoard() {
  const [name, setName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMess, setAlertMess] = useState(null);
  const [showComment, setShowComment] = useState(false)
  let { userId } = useParams();

 
  const {
    data: deckData,
    loading: deckLoading,
    error: deckError,
  } = useQuery(GET_USERS_DECK, { variables: { userId: userId }, pollInterval: 500});
  let navigate = useNavigate();
 const {data: commentData, loading: commentLoading, error: de} = useSubscription(COMMENT_SUBSCRIPTION)

  const [deletingDeck, { loading: deleteLoad, error: deleteErr }] =
    useMutation(DELETE_DECK);

    useEffect(() => {
      if (!commentData) return;
         console.log(de)
    
     
        console.log(commentLoading)
      
      console.log(commentData)
      addCommentToDexie(commentData.comment)
      setShowComment(true)
    }, [commentData])

  useEffect(() => {
    if (deckError) {
      setShowAlert(true);
      setAlertMess('there has been an error retrieving your deck')
      //setAlertMess(deckError.graphQLErrors[0].message);
    }
    if (deleteErr) {
      setShowAlert(true);
      
      //setAlertMess(deleteErr.graphQLErrors[0].message);
    }
    console.log(deckError)
    if (!deckData) return;
    console.log(deckData.getDeckByUser);
  }, [deckData, deckError, deleteErr]);

  async function addDeck() {
    const newDate = formatDate();
    return db.deckByUser.add({
      flashyDeck: {
        id: "", //backend will create it
        name: name,
        userId: userId,
        lastUpdate: newDate,
        dateCreated: newDate,
        flashcards: [
          { front: "hey", back: "there" },
          { front: "laverne", back: "shirley" },
          { front: "shrek", back: "donkey" },
        ],
      },
      name,
    });
  }


  async function addCommentToDexie(kafkaComment) {
    const dexId = await db.comments.add({
      kafkaComment,
    }).catch((err) => {
      setShowAlert(true);
      console.log(err);
      setAlertMess("cannot save comment to db");
    });
    if (dexId) {
      console.log(dexId);
    }
  }
  const formatDate = (date = new Date()) => {
    let year, month, day, hours, minutes, seconds, milliseconds;

    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    milliseconds = date.getMilliseconds();

    month = month.toString().padStart(2, 0);
    day = day.toString().padStart(2, 0);
    hours = hours.toString().padStart(2, 0);
    minutes = minutes.toString().padStart(2, 0);
    seconds = seconds.toString().padStart(2, 0);
    milliseconds = milliseconds.toString().padStart(2, 0);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const id = await addDeck().catch((err) => console.log(err));
    if (id) {
      navigate(`/${userId}/newDeck/${id}`);
    }
  }
 
  async function deleteDeck(deck, e) {
    e.preventDefault();
    await deletingDeck({ variables: { deckId: deck.id } });
  }

  return (
    <Layout>
      <CommentToasts 
      show={commentData !== undefined}
      header={commentData?.comment?.userId}
      message={commentData?.comment?.comment}
      />
      {deleteLoad || deckLoading ? (
        <SpinnerLoadingScreen />
      ) : (
        <>
          <DashboardButtonLayout />
          <Alert
            success={!showAlert}
            header={""}
            message={alertMess}
            show={showAlert}
          />
          {deckData?.getDeckByUser?.length !== 0 ? (
            <Table responsive style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Deck Name</th>
                  <th>Card Amt</th>
                  <th>Date Create</th>
                  <th>Last Updated</th>
                  <th>Open Deck</th>
                  <th>Delete Deck</th>
                </tr>
              </thead>
              <tbody>
                {deckData?.getDeckByUser.map((deck, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{deck.name}</td>
                    <td>{deck.flashcards.length}</td>
                    <td>{deck.dateCreated}</td>
                    <td>{deck.lastUpdate}</td>
                    <td>
                      <Button
                        onClick={() =>
                          navigate(`/${userId}/saveddeck/${deck.id}`)
                        }
                        size="sm"
                        variant="success"
                      >
                        Open!
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={(e) => deleteDeck(deck, e)}
                        size="sm"
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>{""}</td>
                  <td colSpan={5}>
                    <Form.Control
                      placeholder="name of new deck..."
                      onChange={(e) => setName(e.target.value)}
                    />
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-success"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Create
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <Table responsive style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Deck Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{""}</td>
                  <td colSpan={5}>
                    <Form.Control
                      placeholder="name of new deck..."
                      onChange={(e) => setName(e.target.value)}
                    />
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-success"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Create
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
        </>
      )}
    </Layout>
  );
}
