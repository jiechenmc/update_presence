// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import { logger } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";

// The Firebase Admin SDK to access Firestore.
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.update_presence = onRequest(async (req, res) => {
  const { uid, name, course, section, photoURL } = req.body.data;

  logger.info(`${name} presence updated`);
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await getFirestore()
    .collection(`chats/${course}/${section}/room/users`)
    .doc(uid).set({ name: name, photoURL: photoURL });

  const updateTime = writeResult.writeTime.toDate();

  // Send back a message that we've successfully written the message
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST");
  res.json({ result: `User with ID: ${uid} updated at ${updateTime}.` });
});
