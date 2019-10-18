import { db } from '../../config/fbConfig'
import React from 'react'
import moment from 'moment'
import firebase from 'firebase'
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const Notifications = (props) => {
  const { auth, notifications, users } = props;
  var count = 0;
  var id = " ";
  return (
    <div className="section">
      
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notifications</span>
          <ul className="online-users">
            {users && users.map(user => {
              if (user.email == auth.email) {
              id = user.jLink;
              }
            })}
            { notifications && notifications.map(item =>{
              
              if (item.jLink == id && count < 3) {
                count += 1;
                return <li key={item.id}>
                <span className="pink-text">{item.user} </span>
                <span>{item.content}</span>
                <div className="note-date grey-text">{moment(item.time.toDate()).fromNow()}</div>
              </li>
              }
            })}
            
          </ul>
        </div>
      </div>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
    users: state.firestore.ordered.users,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc']},
    { collection: 'notifications', orderBy: ['time', 'desc']}
  ]),
  firestoreConnect([
    { collection: 'users'}
  ])
)(Notifications)
