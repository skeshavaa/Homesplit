import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  return (
      <ul className="right">
        <li><NavLink to='/account'>Account</NavLink></li>
        <li><NavLink to='/view-finances'>Your Finances</NavLink></li>
        <li><NavLink to='/create'>New Entry</NavLink></li>
        <li><a onClick={props.signOut}>Log Out</a></li>
        <li><NavLink to='/' className="btn btn-floating pink lighten-1">
            {props.profile.initials}
          </NavLink></li>
      </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
