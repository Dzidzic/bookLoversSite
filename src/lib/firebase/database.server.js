import pkg from 'firebase-admin';
const {firestore} = pkg;
import { db } from "./firebase.server";
import { saveFileToBuccket } from './firestorage.server';


// @ts-ignore
export async function addBook( book, userId ) {
    const bookCollection = db.collection('books');
    const bookRef = await bookCollection.add({
        title: book.title,
        short_description:  book.short_description,
        description: book.description,   
        author: book.author,
        user_id: userId,
        created_at: firestore.Timestamp.now().seconds,
        likes: 0
    });

    const smallPictureUrl = await saveFileToBuccket(book.small_picture,
        `${userId}/${bookRef.id}/small_picture`);
    const mainPictureUrl = await saveFileToBuccket(book.main_picture,
        `${userId}/${bookRef.id}/main_picture`);

    await bookRef.update({
        small_picture: smallPictureUrl,
        main_picture: mainPictureUrl
    });

    return bookRef.id;
}

// @ts-ignore
export async function getBook(id) {
    const bookRef = await db.collection('books').doc(id).get();

    if(bookRef.exists){
        return { id: bookRef.id, ...bookRef.data() }
    }
}