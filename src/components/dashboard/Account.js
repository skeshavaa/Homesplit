import React, { Component } from 'react'
import Notifications from './Notifications'
import ProjectList from '../projects/ProjectList'
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { db } from '../../config/fbConfig'
import firebase from 'firebase'
import firestore from 'redux-firestore'
import { throwStatement } from '@babel/types'

class Account extends Component {

    del(id){
        db.collection('users').doc(firebase.auth().currentUser.uid).get().then(doc =>{
            var joinlink = doc.data().jLink;
            db.collection('users').where('jLink', '==', joinlink).get().then(function(querySnapshot) {
                querySnapshot.forEach(element => {
                    db.collection('users').doc(element.id).update({
                        [id]: firebase.firestore.FieldValue.delete()
                    })
                });
            })

            db.collection('users').doc(id).delete();

            var user = firebase.auth().currentUser;

            user.delete().then(function() {
            }).catch(function(error) {
            });
        })
        
    }

  render() {
    
    
    
    const { projects, auth, users, notifications, profile } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    var id = auth.uid;
    
    return (

      <div className = "dashboard container">
        <div className="card z-depth-0">
            <div className="about-title card-title">
                <h1>User Profile</h1>
            </div>
            <div className="about-contents ">
                <p>Name: <span className="data">{profile.firstName} {profile.lastName}</span></p>
                <p>Email: <span className="data">{ profile.email}</span></p>
                <p>JoinLink: <span className="data"> {profile.jLink}</span></p>
                <h2>Do you need to delete your account? Click Below</h2>
                <div className="buttons">
                  <button type="submit" onClick={() => {this.del(id, profile.jLink)}}className="btn pink lighten-1 z-depth-0 deletebtn">Delete Account</button>
                </div>
                <h2>You will be signed out immidiately when you click the button
                  If this does not occur, log out and sign back in and click the button
                  if you need to delete your account!
                </h2>
            </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
    users: state.firestore.ordered.users,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    profile: state.firebase.profile
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
)(Account)
