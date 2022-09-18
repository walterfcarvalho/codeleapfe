import React, { useContext } from 'react'
import {AppContext} from '../../pages/App'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useNavigate } from "react-router-dom"

const  Subscription = () => {
  const navigator = useNavigate()
  const [user, setUser] = useContext(AppContext).user

  const handlesubmit = (e) => {
    e.preventDefault()

    navigator("/posts")
  }

  return (
    <>
      <Modal show={true} >
        <Modal.Header>
          <Modal.Title>Welcome to CodeLeap network !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
          onSubmit={handlesubmit}
          >
            <Form.Group className="mb-3" controlId="subscriptionForm.ControlInput1">
              <Form.Label>Please enter your username</Form.Label>
              <Form.Control
                type="text"
                placeholder="@mynickname"
                autoFocus
                onChange={ (e) => setUser(e.target.value)  }
                defaultValue = {user}
              />
            </Form.Group>


            <Modal.Footer>

          <Button 
            type="submit"
            variant="dark" 
            disabled= { user.length <= 0 ? "disabled" : "" }
          >
            ENTER
          </Button>
        </Modal.Footer>


          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Subscription
