// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import { logger } from "firebase-functions/v2";
import { onRequest } from "firebase-functions/v2/https";

// The Firebase Admin SDK to access Firestore.
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { onObjectFinalized } from "firebase-functions/v2/storage";

initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.update_presence = onRequest({ region: 'us-east1' }, async (req, res) => {
  const { uid, name, course, section, photoURL, status } = req.body.data ?? req.body;

  res.set("Access-Control-Allow-Origin", "*");

  switch (req.method) {
    case ("OPTIONS"): {
      res.set("Access-Control-Allow-Methods", "*");
      res.set("Access-Control-Allow-Headers", "*");
      res.set("Access-Control-Max-Age", "3600");
      res.status(204).send("");
      break
    }
    case ("POST"): {
      logger.info(`${name} presence updated`);
      // Push the new message into Firestore using the Firebase Admin SDK.
      const writeResult = await getFirestore()
        .collection(`chats/${course}/${section}/room/users`)
        .doc(uid).set({ name: name, photoURL: photoURL, status: status });

      const updateTime = writeResult.writeTime.toDate();

      // Send back a message that we"ve successfully written the message
      res.json({ result: `User with ID: ${uid} updated at ${updateTime}.` });
    }
      break;
  }
});

exports.upload_file_to_chat = onObjectFinalized({ region: 'us-east1' }, async (event) => {
  logger.log("Object Upload Event TRIGGERED")
  logger.log(event.data.metadata)
})