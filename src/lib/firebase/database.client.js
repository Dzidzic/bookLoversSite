import { setDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.client";

// @ts-ignore
export async function setUser(userId) {
    const users = collection(db, 'users'); 
    const likedBooks = await getDoc(doc(users, userId));
    
    if(likedBooks.data().bookIds){
        await setDoc(doc(users, userId), {
            bookIds: likedBooks.data().bookIds,
            user_id: userId
        })
    }else{
        await setDoc(doc(users, userId), {
            user_id: userId
        })
    }
    
    
}