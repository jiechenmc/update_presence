import * as functions from "firebase-functions/v2";
import admin = require('firebase-admin');

export default exports.deleteSession = functions.https.onRequest(async (request, response) => {
    const data = request.query;
    const session_name = data.session_name;

    const db = admin.firestore();
    await db.collection('sessions').doc(`${session_name}`).delete();

    response.send("Deleted session \"" + session_name + "\"");
});