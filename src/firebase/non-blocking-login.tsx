import app, { db, auth } from "@/lib/firebase";
'use client';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(
  authInstance: Auth,
  onError?: (error: AuthError) => void
): void {
  // CRITICAL: Call signInAnonymously directly. Do NOT use 'await signInAnonymously(...)'.
  signInAnonymously(authInstance).catch(onError);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(
  authInstance: Auth,
  email: string,
  password: string,
  onError?: (error: AuthError) => void,
  onSuccess?: (user: User) => void
): void {
  // CRITICAL: Call createUserWithEmailAndPassword directly. Do NOT use 'await createUserWithEmailAndPassword(...)'.
  createUserWithEmailAndPassword(authInstance, email, password)
    .then((userCredential: UserCredential) => {
      if (onSuccess) {
        onSuccess(userCredential.user);
      }
    })
    .catch(onError);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(
  authInstance: Auth,
  email: string,
  password: string,
  onError?: (error: AuthError) => void
): void {
  // CRITICAL: Call signInWithEmailAndPassword directly. Do NOT use 'await signInWithEmailAndPassword(...)'.
  signInWithEmailAndPassword(authInstance, email, password).catch(onError);
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}
