// Firebase Admin SDK for server-side only.
// Safe to import only in server components, API routes, or server actions.

import * as admin from "firebase-admin";

if (!admin.apps.length) {
  const key = process.env.FIREBASE_ADMIN_KEY;
  if (!key) {
    console.warn("⚠ FIREBASE_ADMIN_KEY not set. Admin SDK unavailable.");
  } else {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(key)),
      });
      console.log("✅ Firebase Admin initialized.");
    } catch (err) {
      console.error("❌ Firebase Admin initialization error:", err);
    }
  }
}

export const adminDB = admin.firestore();
export default admin;
