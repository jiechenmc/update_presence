import * as functions from 'firebase-functions/v2';
import { FieldValue } from 'firebase-admin/firestore';
import admin = require('firebase-admin');

export default exports.joinSession = functions.https.onRequest(async (request, response) => {
    const data = request.query;
    const session_name = data.session_name;
    const user_name = data.user_name
    const user_id = data.user_id;
  
    const db = admin.firestore();
    const sessionRef = db.collection("sessions").doc(`${session_name}`);
    sessionRef.update({
      student_names: FieldValue.arrayUnion(user_name),
      student_ids: FieldValue.arrayUnion(user_id)
    });
    response.send("Finished join_session :)");
  });