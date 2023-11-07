import * as functions from 'firebase-functions/v2';
import admin = require('firebase-admin');

export default exports.createSession = functions.https.onRequest(
    (request, response) => {
    // Checking that the user is authenticated.
    // if (!request.auth) {
    //     // Throwing an HttpsError so that the client gets the error details.
    //     throw new functions.https.HttpsError('failed-precondition', 'Must be called while authenticated.');
    // }
    try{
        const data = request.query;
        const id = data.id;
        const session_name = data.session_name;
        const created = new Date();
        const expires = new Date();
        expires.setMonth(created.getMonth() + 1);
        const active_deck_id = data.activeDeckId;
        const owner = request.query.owner;
  
        const session = {
            "id": id,
            "session_name": session_name,
            "created": created,
            "expires": expires,
            "active_deck_id": active_deck_id,
            "owner": owner,
        }
  
        const db = admin.firestore();
        db.collection("sessions").doc(`${session_name}`).set(session);
  
        response.send("Session added to sessions bucket with id=" + id 
                                                        + "session name=" + session_name
                                                        + ", created=" + created
                                                        + ", expires=" + expires
                                                        + ", active_deck_id=" + active_deck_id
                                                        + ", owner=" + owner);
    } catch (e){
        console.log(e);
    }
  });