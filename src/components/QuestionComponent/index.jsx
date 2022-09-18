import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const QuestionComponent = ({ isDel, setIsDel, handleDelete }) => {

  return <>
    <Modal show={isDel}>
      <Modal.Body>Are you sure you want to delete this item ? </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={(e) => setIsDel(false)}>
          Cancel
        </Button>
        <Button variant="light" onClick={handleDelete}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  </>
}
export default QuestionComponent