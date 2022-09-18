import { Link } from 'react-router-dom'

import FormPost from '../../components/FormPost'
import Posts from '../../components/Posts'


const Feed = () => {

  return <div className="container-md" >

    <nav className="nav d-flex justify-content-end ">
      <Link className="text-dark" to="/">Back</Link>
    </nav>

    <FormPost />

    <Posts />

  </div>
}

export default Feed
