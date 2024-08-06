import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, signOut, sendPasswordResetEmail} from 'firebase/auth';

export async function loginWithGoogle() {
    const auth = getAuth();
    const userCredntial = await signInWithPopup(auth, new GoogleAuthProvider());
    return userCredntial.user;
}

export async function logout() {
    await signOut(getAuth());
}

/**
 * @param {any} email
 * @param {any} password
 */
export async function emailPasswordSignUp(email, password) {
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
    return userCredential.user;
}

// @ts-ignore
export async function emailPasswordSignIn(email, password) {
    const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
    return userCredential.user;
}

// @ts-ignore
export async function resetPassword(email) {
    await sendPasswordResetEmail(getAuth(), email);
}