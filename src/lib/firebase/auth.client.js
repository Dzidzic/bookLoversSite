import { getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';

export async function loginWithGoogle() {
    const auth = getAuth();
    const userCredntial = await signInWithPopup(auth, new GoogleAuthProvider());
    return userCredntial.user;
}

export async function logout() {
    await signOut(getAuth());
}