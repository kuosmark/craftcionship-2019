import React, { useState, useRef, useEffect } from 'react';
import background from '../../resources/background-01.png';
import meme1 from '../../resources/meme.jpg';
import meme2 from '../../resources/meme2.jpg';
import styles from './Calendar.module.css';

import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const Calendar = (props) => {
	const [ smShow, setSmShow ] = useState(false);
	const [ image, setImage ] = useState(meme1);
  const inputRef = useRef(null);
  const [ name, setName ] = useState('');

	const handleSubmit = (evt) => {
    evt.preventDefault();
		alert(`Submitting Name ${name}`);
	};

	return (
		<div className={styles.calendar}>
			<Modal
				size="lg"
				show={smShow}
				onHide={() => setSmShow(false)}
				aria-labelledby="example-modal-sizes-title-sm"
			>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-sm" style={{ width: '100px !important' }}>
						<div style={{ width: 100 }}>Door {smShow}</div>
					</Modal.Title>
					{smShow !== 23 ? (
						<InputGroup>
							<form onSubmit={handleSubmit}>
								<label>
									Frirst Name:
									<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
								</label>
								<input type="submit" value="Submit" />
							</form>
						</InputGroup>
					) : null}
				</Modal.Header>
				<Modal.Body>
					{smShow === 23 ? (
						<h4 style={{ textAlign: 'center', marginBottom: '50px' }}>Congratulations: Emppu N.!</h4>
					) : null}
					<img src={image} width={700} height={500} />
				</Modal.Body>
			</Modal>
			<img className={styles.calendar} src={background} />
			<Door
				number={24}
				x={470}
				y={590}
				width={260}
				height={220}
				image={meme1}
				setSmShow={setSmShow}
				setImage={setImage}
			/>{' '}
			<Door
				number={23}
				x={415}
				y={620}
				width={40}
				height={140}
				image={meme2}
				setSmShow={setSmShow}
				setImage={setImage}
			/>
		</div>
	);
};

const Door = (props) => {
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
				border: '2px solid blue'
			}}
		>
			{number}
		</div>
	);
};

export default Calendar;
