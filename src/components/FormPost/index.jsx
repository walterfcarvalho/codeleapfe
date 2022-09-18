import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { AppContext } from '../../pages/App'
import Posts from '../../pages/Feed'
import AlertDismissible from '../AlertDismissible'

import * as firebase from './../../actions/firebase'

const emptyPost = {
  title:"",
  content:""
}

const FormPost = () => {
  const [ user, setUser ] = useContext(AppContext).user
  const [ errMsg, setErrMsg ] = useContext(AppContext).error
  const [ posts, setPosts] = useContext(AppContext).posts

  const [validated, setValidated] = useState(false)
  const [post, setPost] = useState({...emptyPost})

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    let newPost = {
      user: user,
      title: form.title.value,
      content: form.content.value,
      created_datetime: firebase.getTimeStamp(),
    }


    firebase.addPost(newPost)
      .then(res => {

        setPosts(oldPosts => [
          ...oldPosts,
          {
            ...newPost,
            id: res.id
          }
        ]
        .sort( (a, b) => a.created_datetime.seconds < b.created_datetime.seconds ? 1 : -1)
        )
        form.reset()
        setPost({...emptyPost})

      })
      .catch(err => {
        console.log(err.msg)
        setErrMsg('Error on post ' + err.message)
      })
  }

  return <>
    <Form className="m-5 border" onSubmit={handleSubmit}>

      <h3 className="m-2"> What's on in your mind ?</h3>

      <Form.Group
        controlId="title"
        className="m-2"
        as={Row}
        md="4"
      >
        <Form.Label>
          Title
        </Form.Label>
        <Form.Control
          size="lg"
          required
          type="text"
          placeholder="Type a title to your post"
          onChange={ (e) => setPost( oldPost => ({ ...oldPost, title: e.target.value }))}
        />
      </Form.Group>

      <Form.Group
        controlId="content"
        className="m-2"
        as={Row}
        size="lg"
      >
        <Form.Label>Content *</Form.Label>
        <Form.Control
          as="textarea"
          rows="4"
          required
          type="text"
          placeholder="Type your thougths..."
          onChange={ (e) => setPost( oldPost => ({ ...oldPost, content: e.target.value}))}
        />
      </Form.Group>

      <div className='d-flex justify-content-end'>

        <Button className='me-2 mb-2'
          type="submit"
          variant="dark"
          disabled={(post.title.length <= 3 || post.content.length <= 3) ? "disabled" : ""}
          >
          ENTER
        </Button>
      </div>
    </Form>

    <AlertDismissible />

  </>
}

export default FormPost 