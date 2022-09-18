import React, { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'

import { AppContext } from '../../pages/App'

import * as firebase from './../../actions/firebase'


const EditPost = ({editPost, setEditPost, propPost}) => {
  const [posts, setPosts] = useContext(AppContext).posts
  const [post, setPost] = useState({...propPost})
  const [error, setErrMsg ] = useContext(AppContext).error

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    let newPost = {
      ...propPost,
      title: form.title.value,
      content: form.content.value,
    }

    let id = newPost.id
    delete newPost.id

    firebase.updPost(id, newPost)
      .then(res => {

        setPosts(oldPosts => oldPosts
        .map( oldPost => oldPost.id === id 
          ? { ...newPost, id: id}       
          : oldPost
        )    
        .sort( (a, b) => a.created_datetime.seconds < b.created_datetime.seconds ? 1 : -1)
        )
        setEditPost(false)          
      })
      .catch(err => {
        console.log(err.msg)
        setErrMsg('Error update post ' + err.message)
      })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setEditPost(false)
  }

  return <Modal show={editPost} >

    <Form className="m-5 border" onSubmit={handleSubmit}>

      <h3 className="m-2"> Have you changed idea ? </h3>

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
          defaultValue={post.title}
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
          defaultValue={post.content}
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

        <Button className='me-2 mb-2'
          type="cancel"
          variant="dark"
          onClick={handleCancel}
          >
          CANCEL
        </Button>

      </div>
    </Form>
  </Modal>
}

export default EditPost 