import { db } from "$lib/firebase/firebase.client";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { readable } from "svelte/store";

export default readable(null, (set) => {
    const curTimestamp = Date.now() / 1000;
    const q = query(collection(db, 'books'), 
        where('created_at', '>', curTimestamp),
        orderBy('created_at', 'desc'), 
        limit(1));
    
    const unsub = onSnapshot(q, (snapshot) => {
        if (snapshot.docs.length !== 1) return;
        if (snapshot.docChanges().find(d => d.type === 'added')){
            const book = snapshot.docs[0].data();
            // @ts-ignore
            set({...book, id: snapshot.docs[0].id})
        }
    });

    return () => {
        unsub;
    }
})