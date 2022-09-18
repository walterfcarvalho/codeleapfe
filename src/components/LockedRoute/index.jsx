import React, { useContext } from 'react'
import { AppContext } from '../../pages/App'
import Subscription from '../Subscription'


const LockedRoute = ({ child }) => {
  const [user, setUser] =  useContext(AppContext).user

  console.log('LockedRoute, user:', user)

  return user.length >= 3
    ? child
    : <Subscription />
}

export default LockedRoute
