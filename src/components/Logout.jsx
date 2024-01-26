import { DELETE_ALL_DECKS, DELETE_USER } from "./gql/gql";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Layout from "./Layout/Layout";
import SpinnerLoadingScreen from "./LoadingSpinner/LoadingSpinner";
import Alert from "./Alerts/Alert";

export default function Logout() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMess, setAlertMess] = useState(null);
  let { userId } = useParams();

  const [deleteUser, { error: userDelErr, loading: userDelLoad }] =
    useMutation(DELETE_USER);
  const [deletingDecksByUser, { error: deckDelErr, loading: deckDelLoad }] =
    useMutation(DELETE_ALL_DECKS);

  useEffect(() => {
    deletingDecksByUser({ variables: { userId: userId } }).catch((err) => {
      setShowAlert(true);
      setAlertMess("cannot delete decks " + err);
    });

    deleteUser({ variables: { userId: userId } }).catch((err) => {
      setShowAlert(true);
      setAlertMess("cannot delete user " + err);
    });
  }, []);

 
  return (
    <Layout>
      <Alert
        success={!showAlert}
        header={""}
        message={alertMess}
        show={showAlert}
      />
      {userDelLoad || deckDelLoad ? (
        <SpinnerLoadingScreen />
      ) : (
        <div>
          <h4>User and related Deck have been deleted</h4>
        </div>
      )}
    </Layout>
  );
}
