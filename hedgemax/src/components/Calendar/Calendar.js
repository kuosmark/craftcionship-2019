import React, { useState, useRef, useEffect } from "react";
import background from "../../resources/background-01.png";
import meme1 from "../../resources/meme.jpg";
import meme2 from "../../resources/meme2.jpg";
import styles from "./Calendar.module.css";

import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Form from "react-bootstrap/Form";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "@apollo/react-hooks";

const Calendar = props => {
  const [smShow, setSmShow] = useState(false);
  const [image, setImage] = useState(meme1);
  const inputRef = useRef(null);
  const [name, setName] = useState("");

  const showModal = smShow > 0 ? true : false;

  const handleSubmit = evt => {
    evt.preventDefault();
    saveUser(name);
  };

  const defaultOptions = {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore"
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    }
  };

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError, operation }) => {
        if (graphQLErrors && graphQLErrors.length > 0) {
          console.log("GraphQL errors: ");
          graphQLErrors.forEach(gqlError => {
            console.log(gqlError.message);
          });
        }
        if (networkError) {
          console.log(
            "Network error: ",
            networkError.statusCode,
            " ",
            networkError.name
          );
          if (networkError.response && networkError.response.redirected) {
            console.log("Redirecting...");
          }
        }
        if (operation) {
          console.log("Operation: ", operation);
        }
      }),
      new HttpLink({
        uri:
          "https://de4m4w45tnamdnpmvjyt4blscm.appsync-api.eu-west-1.amazonaws.com/graphql",
        headers: {
          "x-api-key": "da2-pdmbffublfb2zactnrxew62aj4"
        }
      })
    ]),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions
  });

  const saveUser = async user => {
    const input = {
      winner: new Date().getTime() * 1000,
      id: user
    };
    const mutationQuery = `mutation updateuser($winner: AWSTimestamp, $id: ID!) {
  updateUser(input: {winner: $winner, id: $id}) {
    id
    name
  }
}`;

    return new Promise((resolve, reject) => {
      client
        .query({
          query: gql`
            ${mutationQuery}
          `,
          variables: input
        })
        .then(result => {
          console.log("result: ", result);
          setSmShow(false);
        });
    });
  };

  return (
    <ApolloProvider client={client}>
      <div className={styles.calendar}>
        <Modal
          size="lg"
          show={showModal}
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="example-modal-sizes-title-sm"
              style={{ width: "100px !important" }}
            >
              <div style={{ width: 100 }}>Door {smShow}</div>
            </Modal.Title>
            {smShow !== 23 ? (
              <InputGroup>
                <form onSubmit={handleSubmit}>
                  <label>
                    Frirst Name:
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </label>
                  <input type="submit" value="Participate" />
                </form>
              </InputGroup>
            ) : null}
          </Modal.Header>
          <Modal.Body>
            {smShow === 23 ? (
              <h4 style={{ textAlign: "center", marginBottom: "50px" }}>
                Congratulations: Emppu N.!
              </h4>
            ) : null}
            <img src={image} width={700} height={500} />
          </Modal.Body>
        </Modal>
        <img className={styles.calendar} src={background} />
        <Door
          number={24}
          x={467}
          y={395}
          width={266}
          height={155}
          image={meme1}
          setSmShow={setSmShow}
          setImage={setImage}
        />{" "}
        <Door
          number={23}
          x={411}
          y={419}
          width={46}
          height={95}
          image={meme2}
          setSmShow={setSmShow}
          setImage={setImage}
        />
      </div>
    </ApolloProvider>
  );
};

const Door = props => {
  const { number, height, width, x, y } = props;
  return (
    <div
      className={styles.door}
      onClick={() => {
        props.setSmShow(number);
        props.setImage(props.image);
      }}
      style={{
        width: width,
        height: height,
        left: x,
        bottom: y,
        border: "2px solid blue"
      }}
    >
      <div className="door-title">
        <h2>{number}</h2>
      </div>
    </div>
  );
};

export default Calendar;
