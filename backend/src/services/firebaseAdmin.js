import admin from "firebase-admin";
import "dotenv/config";

const { default: serviceAccount } = await import(
  "./firebaseAdminInfomation.json",
  {
    with: {
      type: "json",
    },
  }
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

export const db = admin.firestore();
