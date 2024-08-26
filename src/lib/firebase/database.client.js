import { setDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.client";

// @ts-ignore
export async function setUser(userId) {
    const users = collection(db, 'users');
    
    if(a.data().bookIds){
        await setDoc(doc(users, userId), {
            bookIds: a.data().bookIds,
            user_id: userId
        })
    }else{
        await setDoc(doc(users, userId), {
            user_id: userId
        })
    }
    
    
}