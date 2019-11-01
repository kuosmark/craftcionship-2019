import React, { useState } from "react";
import background from "../../resources/background.png";
import meme from "../../resources/meme.jpg";
import styles from "./Calendar.module.css";

import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
const Calendar = props => {
  const [smShow, setSmShow] = useState(false);
  return (
    <div className={styles.calendar}>
      <Modal
        size="lg"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="example-modal-sizes-title-sm"
            style={{ width: "100px !important" }}
          >
            Door 24
          </Modal.Title>
          <InputGroup className="mb-3" style={{ width: "200px !important" }}>
            <FormControl
              placeholder="Name"
              aria-label="Name"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </Modal.Header>
        <Modal.Body>
          <img src={meme} width={700} height={500} />
        </Modal.Body>
      </Modal>

      <img className={styles.calendar} src={background} />
      <Door
        number={"24"}
        x={470}
        y={600}
        width={280}
        height={200}
        setSmShow={setSmShow}
      />
    </div>
  );
};

const Door = props => {
  const { number, height, width, x, y } = props;
  return (
    <div
      className={styles.door}
      onClick={() => props.setSmShow(true)}
      style={{
        width: width,
        height: height,
        left: x,
        bottom: y,
        border: "2px solid blue"
      }}
    >
      {number}
    </div>
  );
};

export default Calendar;
