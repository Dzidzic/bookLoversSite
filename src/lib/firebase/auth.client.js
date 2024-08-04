import { getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

export async function loginWithGoogle() {
    const auth = getAuth();
    const userCredntial = await signInWithPopup(auth, new GoogleAuthProvider());
    return userCredntial.user;
}