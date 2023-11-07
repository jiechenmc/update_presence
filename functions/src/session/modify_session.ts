import * as functions from "firebase-functions/v2";
import admin = require('firebase-admin');

export default exports.modifySession = functions.https.onRequest((request, response) => {
    const data = request.query;
    const session_name = data.session_name;
    const new_deck_id = data.new_deck_id;
  
    const db = admin.firestore();
    const sessionRef = db.collection("sessions").doc(`${session_name}`);
    sessionRef.update({
        active_deck_id: new_deck_id,
    });
    response.send("finished modify session :)");
});