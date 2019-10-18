import React, { Component } from 'react'
import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList'
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { db } from '../../config/fbConfig'
import firebase from 'firebase'
import { throwStatement } from '@babel/types'

class Dashboard extends Component {


  render() {
    
    
    
    const { projects, auth, users, notifications } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    var id = auth.uid;
    
    var isRendered = false;

    
    return (

      <div className = "dashboard container">
        { projects && projects.map(project => {
          {users && users.map(user => {
            if (user.email == auth.email) {
            id = user.jLink;
            }
          })}
          var projectID = project.jLink;
          if (id == projectID && isRendered == false) {
            isRendered = true;
            return (
              <div className="row">
                <div className="col s12 m6">
                  <ProjectList projects={project}/>
                </div>
                <div className="col s12 m5 offset-m1">
                  <Notifications notifications={notifications}/>
                </div>
              </div>
            )
          } else if (id === projectID && isRendered == true) {
            return (
              <div className="row">
                <div className="col s12 m6">
                  <ProjectList projects={project}/>
                </div>
              </div>
            )
          }

          
        })}
      </div>
    )
  }
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
)(Dashboard)
