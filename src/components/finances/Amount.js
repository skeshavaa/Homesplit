import React, { Component } from 'react'
import firebase from 'firebase'

import { db } from '../../config/fbConfig'
import ProjectList from '../projects/ProjectList'
import {connect} from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Amount extends Component {


  clear(id){
    console.log(id);
    const myId = firebase.auth().currentUser.uid;
    db.collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      [id]: 0
    });
    db.collection("users")
    .doc(id)
    .update({
      [myId]: 0
    });
  }


  render() {

    const { projects, auth, users } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    var sid = auth.uid;
    var strOutput = '';
    var owedAmount = 0.0;
    var intTotal = 0.0;
    var intPay = 0.0;
    var updated = true;
  
    {users && users.map(user => {
        if (user.email == auth.email) {
            sid = user.jLink;
        }
    })}

    return (
      <div>
        <div className = "dashboard container section finances">
          <div className="card z-depth-0">
              <div className="card-content1">
                  <div className="title">
                    <span className="card-title1">Your Current Roomates</span>
                  </div>
                  
                  {users && users.map(user => {
                      if (sid == user.jLink && user.email == auth.email) {
                        return (
                          <div>
                            {users && users.map(fas => {
                            if (sid == fas.jLink && fas.email != auth.email) { 
                              var currentAmount = user[fas.id]
                              var roomAmount = fas[firebase.auth().currentUser.uid]
                              if (roomAmount < currentAmount) {
                                strOutput = 'You owe $';
                                owedAmount = (currentAmount - roomAmount).toFixed(2);
                                intPay +=  (currentAmount - roomAmount);
                                return (
                                  <div className="cards roomates negative">
                                      <h2>{ fas.firstName } { fas.lastName }</h2>
                                      <p>{ strOutput }{ owedAmount }</p>
                                  </div>
                                )
                            } else if (roomAmount > currentAmount) {
                                strOutput = 'Owes you $';
                                owedAmount = (roomAmount - currentAmount).toFixed(2);
                                intTotal += (roomAmount - currentAmount);
                                intTotal = parseFloat(intTotal, 10)
                                return (
                                  <div className="cards roomates positive">
                                      <h2>{ fas.firstName } { fas.lastName }</h2>
                                      <p>{ strOutput }{ owedAmount }</p>
                                      <button onClick={  (e) => { this.clear(fas.id); } } className="btn pink lighten-1 z-depth-0">Clear Fee</button>
                                      <h3 className="reload">Reload Page after clicking button to see updated finances!</h3>
                                  </div>
                                  )
                                   
                            } else {
                              strOutput = 'Owes you $0.00';
                              return (
                                <div className="cards roomates">
                                    <h2>{ fas.firstName } { fas.lastName }</h2>
                                    <p>{ strOutput }</p>
                                </div>
                              )  
                            }
                            }
                            
                          })};
                          
                          </div>
                          
                        )
                          
                         
                      }
                      
                  })}
                  
              </div>
          </div>     
        </div>


        <div className = "dashboard container section finances overall">
          <div className="card z-depth-0">
              <h1>Overall Finances</h1>
              <div className="payout">
                <p>You need to pay:</p>
                <h2>${ intPay.toFixed(2) }</h2>
              </div>
              <div className="collect">
                <p>You need to collect: </p>
                <h2>${ intTotal.toFixed(2) }</h2>
              </div>
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
      auth: state.firebase.auth
    }
  }
  
  export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'projects'}
    ]),
    firestoreConnect([
      { collection: 'users'}
    ])
  )(Amount)
