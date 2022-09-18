import React, { useContext } from 'react'
import { AppContext } from '../App'
import { Link } from 'react-router-dom'

import FormPost from '../../components/FormPost'
import Posts from '../../components/Posts'
import { useEffect } from 'react'


const Feed = () => {
  const { user, setUser } = useContext(AppContext).user


  return <div className="container-md" >

    <nav className="nav d-flex justify-content-end ">
      <Link className="text-dark" to="/">Back</Link>
    </nav>

    <FormPost />

    <Posts />

  </div>
}

export default Feed
