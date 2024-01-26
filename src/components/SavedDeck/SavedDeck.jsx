import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Layout from "../Layout/Layout";
import "./style.css";
import ButtonLayout from "../Layout/ButtonLayout";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_DECK, GET_DECK_BY_ID } from "../gql/gql";
import SpinnerLoadingScreen from "../LoadingSpinner/LoadingSpinner";
import Alert from "../Alerts/Alert";

export default function SavedDeck() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [realDeck, setRealDeck] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMess, setAlertMess] = useState(null);
  let { id } = useParams();
  let { userId } = useParams();
  if (!id || !userId) {
    navigate("/");
  }
  let navigate = useNavigate();
  const {
    data: deckFromDB,
    loading: deckLoading,
    error: returnErr,
  } = useQuery(GET_DECK_BY_ID, { variables: { id: id } });
  const [updateDeck, { loading: updateLoad, error: saveError }] = useMutation(CREATE_DECK);
  

 useEffect(() => {
if (!deckFromDB) return;
setRealDeck(deckFromDB?.getDeckById?.flashcards)
 }, [deckFromDB])
 
  const [indexToDelete, setIndexToDelete] = useState(null);
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

  const divFlip = (e) => {
    switch (
      e.detail //flip on double click
    ) {
      case 2:
        setIsFlipped(!isFlipped);
        break;
      default: //do nothing
    }
  };

  async function saveDeck(e)  {
e.preventDefault()
    const updateDate = formatDate();
    const done = await updateDeck({
      variables: {
        input: {
          id: id,
          userId: userId,
          name: deckFromDB?.getDeckById?.name,
          dateCreated: deckFromDB?.getDeckById?.dateCreated,
          lastUpdate: updateDate,
          flashcards: realDeck,
        },
      },
    }).catch(() => {
      setShowAlert(true);
      setAlertMess("Cannot upsert flashcard deck");
    });
    if (done && !saveError) {
      navigate(`/${userId}/flashboard`)

    } else {
      setAlertMess("cannot save" )
      setShowAlert(true)
    }
  };
  

  const addCard = () => {
    const temp = [...realDeck, { front: "", back: "" }];
    setRealDeck(temp);
  };

  const removeCard = (index) => {
    console.log(index);

    const temp = [...realDeck].filter((_, ind) => ind !== index);
    setRealDeck(temp);
  };

  const updateFrontCard = (e, index) => {
    const temp = realDeck.map((card, i) => {
      if (i === index) {
        card = { ...card, front: e.target.value };
        return card;
      }
      return card;
    });
    setRealDeck(temp);
  };

  const updateBackCard = (e, index) => {
    const temp = realDeck.map((card, i) => {
      if (i === index) {
        card = { ...card, back: e.target.value };
        return card;
      }
      return card;
    });
    setRealDeck(temp);
  };

  return (
    <Layout>
      <Alert
        success={!showAlert}
        header={""}
        message={alertMess}
        show={showAlert}
      />
      {
      deckLoading ||  updateLoad ? (
        <SpinnerLoadingScreen />
      ) : (
        <Carousel fade>
          {realDeck.lenth === 0 ? (
            <h2>no flashcards in this deck</h2>
          ) : (
            realDeck.map((card, index) => (
              <Carousel.Item key={index + 200}>
                <div
                  onClick={(e) => {
                    divFlip(e);
                    setIndexToDelete(index);
                  }}
                  style={{
                    width: "100%",
                    height: "700px",
                    backgroundColor: "gray",
                  }}
                >
                  <div
                    className="flip-card"
                    style={{
                      width: "60%",
                      height: "60%",
                      textAlign: "center",
                      position: "fixed",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div
                      className={`flip-card-inner ${
                        isFlipped ? "flipped" : ""
                      }`}
                    >
                      <div className="flip-card-front">
                        <InputGroup style={{ height: "100%" }}>
                          <Form.Control
                            as="textarea"
                            aria-label="With textarea"
                            placeholder="Double click to flip to back"
                            type="text"
                            value={card.front}
                            onChange={(e) => updateFrontCard(e, index)}
                          />
                        </InputGroup>
                      </div>
                      <div className="flip-card-back">
                        <InputGroup style={{ height: "100%" }}>
                          <Form.Control
                            as="textarea"
                            aria-label="With textarea"
                            placeholder="Double click to flip to front"
                            type="text"
                            value={card.back}
                            onChange={(e) => updateBackCard(e, index)}
                          />
                        </InputGroup>
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))
          )}
        </Carousel>
      )}

      <br />
      <ButtonLayout
        removeName={"Delete Card"}
        addName={"New Card"}
        submitName={"Save Deck"}
        onLeave={() => removeCard(indexToDelete)}
        onCancel={addCard}
        onSubmit={(e)=> saveDeck(e)}
      />
    </Layout>
  );
}
