import pkg from 'firebase-admin';
const {firestore} = pkg;
import { db } from "./firebase.server";
import { saveFileToBuccket } from './firestorage.server';
import { PAGE_SIZE } from '$env/static/private';


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
export async function editBook(id, form, userId) {
    const bookRef = await db.collection('books').doc(id);
    let mainPicture = form.main_picture || null;
    let smallPicture = form.small_picture || null;
    
    delete form.main_picture;
    delete form.small_picture;
    
    await bookRef.update(form);

    if(mainPicture && mainPicture.size){
        
        const mainPictureUrl = await saveFileToBuccket(mainPicture,
            `${userId}/${bookRef.id}/main_picture`);
        bookRef.update({main_picture: mainPictureUrl})       
    }

    if(smallPicture && mainPicture.size){        
        const smallPictureUrl = await saveFileToBuccket(smallPicture,
            `${userId}/${bookRef.id}/small_picture`); 
        bookRef.update({small_picture: smallPictureUrl})   
    }
}

// @ts-ignore
export async function getBooks(userId, page = 1) {
    const user = userId ? await getUser(userId) : null;

    const booksInDb = await db.collection('books').count().get();
    const bookCount = booksInDb.data().count;
        
    const next = bookCount > (page * +PAGE_SIZE);
    const prev = page > 1;
    
    const books = await db.collection('books')
        .limit(+PAGE_SIZE)
        .offset((page - 1) * +PAGE_SIZE)
        .orderBy('created_at', 'desc').get();

    const likedBooks = books.docs.map(d => {
        const likedBook = user?.bookIds?.includes(d.id) || false;
        return { ...d.data(), id: d.id, likedBook };
    });

    return {
        books: likedBooks,
        next,
        prev
    };
}

// @ts-ignore
export async function getBook(id, userId = null) {
    const bookRef = await db.collection('books').doc(id).get();

    if(bookRef.exists){
        const user = userId ? await getUser(userId) : null;
        const likedBook = user?.bookIds?.includes(id) || false;
        
        return { id: bookRef.id, ...bookRef.data(), likedBook }
    }
}

// @ts-ignore
export async function getUser(userId) {
    const user = await db.collection('users').doc(userId).get();

    return user?.data();
}

// @ts-ignore
export async function toggleBookLike(bookId, userId) {
    const bookDoc = db.collection('books').doc(bookId);
    const userDoc = db.collection('users').doc(userId);

    const user = await userDoc.get();
    const userData = user.data();

    // @ts-ignore
    if(userData.bookIds && userData.bookIds.includes(bookId)){
        await userDoc.update({
            bookIds: firestore.FieldValue.arrayRemove(bookId)
        })
        await bookDoc.update({
            likes: firestore.FieldValue.increment(-1)
        })
    }else{
        await userDoc.update({
            bookIds: firestore.FieldValue.arrayUnion(bookId)
        })
        await bookDoc.update({
            likes: firestore.FieldValue.increment(1)
        })
    }

    return await getBook(bookId, userId);
}