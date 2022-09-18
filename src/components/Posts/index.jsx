import React, { useState, useEffect, useContext } from 'react'
import * as firebase from '../../actions/firebase'

import { AppContext } from '../../pages/App'
import PostCard from './PostCard'

const Posts = () => {
  const [user, setUser] = useContext(AppContext).user
  const [errMsg, setErrMsg] = useContext(AppContext).error
  const [posts, setPosts] = useContext(AppContext).posts

  useEffect(() => {
    firebase.getPosts()
      .then(res => setPosts(res))
      .catch(err =>
        setErrMsg(err.message)
      )
  }, [])


  return <>
    {
      posts.map(post => (
        <>
          <PostCard
            key={post.id}
            post={post}
            setPosts={post.user === user ? setPosts : undefined}
            user={user}
          />
        </>
      ))
    }
  </>
}

export default Posts