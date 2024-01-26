import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Layout from "../Layout/Layout";
import "./style.css";
import ButtonLayout from "../Layout/ButtonLayout";
import { useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import { CREATE_DECK } from "../gql/gql";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Alert from "../Alerts/Alert";

export default function NewDeck() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [realDeck, setRealDeck] = useState([]);
  const [showAlert, setShowAlert] = useState(false)
  const [alertMess, setAlertMess] = useState("")
  let navigate = useNavigate()
  const [deckObjectToSave, setDeckObjectToSave] = useState({});
  const [savingDeck, {loading: saveLoading, error: saveError, data: saveData}] = useMutation(CREATE_DECK)
  let { dexId } = useParams();
  let {userId} = useParams()
  if (!dexId) {
    navigate("/")
  }


  const deckByUser = useLiveQuery(
    async () => {
      const deckByUser = await db.deckByUser
        .where("id")
        .equals(parseInt(dexId))
        .toArray();
      //load spinner
      return deckByUser;
    },
    [dexId] //objects that affect query
  );
  useEffect(() => {
    if (!deckByUser) return;

    setRealDeck(deckByUser.at(0).flashyDeck.flashcards);
    setDeckObjectToSave(deckByUser.at(0).flashyDeck);
  }, [deckByUser]);

  const [indexToDelete, setIndexToDelete] = useState(null);

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

  async function saveDeck (e) {
e.preventDefault();
    console.log("Save this", deckObjectToSave)
    const res = await savingDeck({variables: {input: {...deckObjectToSave, flashcards: realDeck}}}).catch((err) => {setShowAlert(true); setAlertMess(err)})

    if (res && !saveError) {
      navigate(`/${userId}/flashboard`)

    } else {
      setAlertMess("cannot save" )
      console.log(res)
      setShowAlert(true)
    }
  };

  const addCard = () => {
    const temp = [...realDeck, { front: "", back: "" }];
    setRealDeck(temp);
  };

  const removeCard = (indexToDelete) => {
    console.log(indexToDelete);

    const temp = [...realDeck].filter((_, ind) => ind !== indexToDelete);
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
      <Carousel fade>
        {realDeck.map((card, index) => (
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
                  className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}
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
        ))}
      </Carousel>
      <br />
      <ButtonLayout
        removeName={"Delete Card"}
        addName={"New Card"}
        submitName={"Save Deck"}
        onLeave={() => removeCard(indexToDelete)}
        onCancel={addCard}
        onSubmit={(e) => saveDeck(e)}
      />
    </Layout>
  );
}
