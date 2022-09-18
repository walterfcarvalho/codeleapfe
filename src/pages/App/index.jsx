import React, { useState } from 'react'
import Subscription from '../../components/Subscription'
import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from "react-router-dom"
import { createBrowserHistory } from "history"
import LockedRoute from '../../components/LockedRoute'
import Feed from '../Feed'


export const AppContext = React.createContext()

const history = createBrowserHistory({ window })

function App() {
  const [user, setUser] = useState("")
  const [posts, setPosts] = useState([])
  const [errorMsg, setErrorMsg] = useState("")

  return <AppContext.Provider value={{ 
    user: [ user, setUser ], 
    posts: [ posts, setPosts ],
    error: [errorMsg, setErrorMsg]
  }}>

    <React.StrictMode>
      <HistoryRouter history={history}>
        <Routes>

          <Route path="/" element={<Subscription />} >
            <Route index element={<Subscription />} />
          </Route>

          <Route path="/posts" element={< LockedRoute child={<Feed />} />} >
            <Route index element={<App />} />
          </Route>

        </Routes>
      </HistoryRouter>

    </React.StrictMode>

  </AppContext.Provider>

}

export default App
