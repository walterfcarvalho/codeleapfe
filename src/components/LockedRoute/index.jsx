import React, { useContext } from 'react'
import { AppContext } from '../../pages/App'
import Subscription from '../Subscription'


const LockedRoute = ({ child }) => {
  const user = useContext(AppContext).user[0]

  return user.length >= 3
    ? child
    : <Subscription />
}

export default LockedRoute
