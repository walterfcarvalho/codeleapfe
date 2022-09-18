import React, { useEffect, useContext } from 'react'
import * as firebase from '../../actions/firebase'

import { AppContext } from '../../pages/App'
import PostCard from './PostCard'

const Posts = () => {
  const user = useContext(AppContext).user[0]
  const setErrMsg = useContext(AppContext).error[1]
  const [posts, setPosts] = useContext(AppContext).posts

  useEffect(() => {
    firebase.getPosts()
      .then(res => setPosts(res))
      .catch(err =>
        setErrMsg(err.message)
      )
    // eslint-disable-next-line    
  }, [])


  return <>
    {
      posts.map((post, idx) => (
        <PostCard
          key={idx }
          post={post}
          setPosts={post.user === user ? setPosts : undefined}
          user={user}
        />
      ))
    }
  </>
}

        /*           xkey={post.id} */
export default Posts