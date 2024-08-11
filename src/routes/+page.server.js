import { PAGE_SIZE } from '$env/static/private';
import { getBooks } from '$lib/firebase/database.server';
import { db } from '$lib/firebase/firebase.server';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, url }) {
    const page = url.searchParams.get('page') || 1;
    
    const booksInDb = await db.collection('books').count().get();
    const booksCount = booksInDb.data().count;
    
    const pages = booksCount % +PAGE_SIZE === 0 ? Math.floor(booksCount / +PAGE_SIZE) : Math.floor(booksCount / +PAGE_SIZE) + 1; 
    
    // @ts-ignore
    const { books, next, prev } = await getBooks(locals?.user?.id, +page);
    
    return{ books, next, prev, page, pages};
}