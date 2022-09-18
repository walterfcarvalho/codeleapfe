import { useState, useContext } from 'react'
import Card from 'react-bootstrap/Card';
import { RiDeleteBinLine } from 'react-icons/ri'
import { BiEdit } from 'react-icons/bi'
import QuestionComponent from '../../QuestionComponent'

import * as firebase from '../../../actions/firebase'
import { AppContext } from '../../../pages/App'
import * as dateUtil from '../../../actions/dateUtil'
import EditPost from '../../EditPost'



const PostCard = ({ user, post, setPosts }) => {
  const [isDel, setIsDel] = useState(false)
  const [errMsg, setErrMsg] = useContext(AppContext).error
  const [ editPost, setEditPost ] = useState(false)


  const isCanDelete = () => {
    if (setPosts == undefined) {
      setErrMsg("Unabled to delete posts from others nicks.")
      return
    }
    setIsDel(true)
  }

  const handleDelete = () => {
    setIsDel(false)

    firebase.delPost(post.id)
      .then(res => {
        setPosts(oldPosts => (
          oldPosts.filter(oldPost => oldPost.id !== post.id)
        ))
      })
      .catch(err => {
        setErrMsg(err.message)
      })
  }

  return <>

    <EditPost
      propPost={post}
      editPost={editPost}
      setEditPost={setEditPost}
    />

    <QuestionComponent
      isDel={isDel}
      setIsDel={setIsDel}
      handleDelete={handleDelete}
    />

    <Card
      className="m-5 mt-2"
      text={"light"}
    >
      <Card.Header
        className="d-flex justify-content-between bg-dark text-white"
      >
        {post.title}

        {post.user === user &&
          <div
            className="d-flex justify-content-between"
          >
            <RiDeleteBinLine
              className="me-3" size={'30px'}
              onClick={isCanDelete}
            />

            <BiEdit
              size={'30px'}
              onClick={(e) => setEditPost(true)}
            />
          </div>
        }

      </Card.Header>
      <Card.Body className="pt-1 mt-0">

        <div className="d-flex justify-content-between bg-white text-secondary mt-1">
          <small>
            {post.user}
          </small>
          <small>
            {dateUtil.sincePosted(post.created_datetime)}
          </small>
        </div>

        <Card.Text className="text-dark"
        >
          {post.content}
        </Card.Text>
      </Card.Body>
    </Card>
  </>

}

export default PostCard