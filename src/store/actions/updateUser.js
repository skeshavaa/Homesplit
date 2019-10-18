import firebase from 'firebase'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { db } from '../../config/fbConfig'


export const updateUser = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        const intPrevious = 0;
        var uid = firebase.auth().currentUser.uid;
        var intRoomates = 0;
        db.collection("users")
.doc(firebase.auth().currentUser.uid)
.get()
.then(doc => {
    var joinlink = doc.data().jLink;

firestore.collection('users').where('jLink', '==', joinlink).get().then(function(querySnapshot) {
    querySnapshot.forEach(element => {
        intRoomates += 1;
    });
    querySnapshot.forEach(element => {
        if (firebase.auth().currentUser.email != element.data().email) {
            const increment = firebase.firestore.FieldValue.increment(parseFloat(project.content, 10) / intRoomates);
            firestore.collection('users').doc(element.id).update({
                [uid]: increment
            });
        }
    });
})


});



    }
}; 