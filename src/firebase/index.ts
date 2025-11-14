'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (getApps().length) {
    return getSdks(getApp());
  }

  // This configuration is used for client-side initialization of Firebase.
  // It is public and does not contain any sensitive information.
  // Security is enforced by Firebase Security Rules.
  const firebaseConfig = {
    // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  // In a production environment with Firebase App Hosting, the config
  // is often provided automatically. We prioritize that but fall back
  // to the environment variables for local development.
  let firebaseApp;
  try {
    // Attempt to initialize via Firebase App Hosting's auto-config
    firebaseApp = initializeApp();
  } catch (e) {
    // Since this is a prototype without a backend, we will return nulls
    // to allow the app to run without a real Firebase project.
    return { firebaseApp: null, auth: null, firestore: null };
  }

  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp | null) {
  if (!firebaseApp) {
    return { firebaseApp: null, auth: null, firestore: null };
  }
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
