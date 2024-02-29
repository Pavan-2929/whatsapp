import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet, Navigate} from 'react-router-dom'

const PrivateRoute = () => {

    const currentUser = useSelector((state) => state.currentUser)

  return (
    <div>

        {currentUser ? <Outlet/> : <Navigate to='/login'/>}
    </div>
  )
}

export default PrivateRoute