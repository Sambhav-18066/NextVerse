
// IMPORTANT: This file should only be used in server-side code.
// It is not intended for use in client-side code.
import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let app: App;

// The service account is automatically discovered by App Hosting.
// No need to manually parse environment variables.
// const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
//   ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
//   : undefined;

function getApp() {
  if (app) {
    return app;
  }
  if (getApps().length) {
    app = getApps()[0];
  } else {
    // When deployed to App Hosting, initializeApp() automatically discovers
    // the project's credentials.
    app = initializeApp();
  }
  return app;
}

export const getFirebaseAdmin = () => {
  const app = getApp();
  return {
    auth: getAuth(app),
    db: getFirestore(app),
  };
};
