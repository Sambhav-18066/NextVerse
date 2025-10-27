'use server';

import * as admin from 'firebase-admin';

// This is a singleton to ensure we only initialize the admin SDK once.
let app: admin.app.App;

function getFirebaseAdmin() {
  if (!app) {
    // When running in a Google Cloud environment, the SDK will automatically
    // use the project's service account credentials.
    // For local development, you need to set the GOOGLE_APPLICATION_CREDENTIALS
    // environment variable to point to your service account key file.
    //
    // Note: This initialization is simplified and assumes it's running in an
    // environment where credentials are automatically handled or configured.
    app = admin.initializeApp({
        // If your project ID isn't set in an env var, specify it here.
        // projectId: 'your-firebase-project-id'
    });
  }

  return {
    db: admin.firestore(app),
    auth: admin.auth(app),
  };
}

export { getFirebaseAdmin };
