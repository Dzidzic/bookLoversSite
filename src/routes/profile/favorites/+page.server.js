import { getLikedBooks } from '$lib/firebase/database.server';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }){
    // @ts-ignore
    const likedBook = await getLikedBooks(locals?.user?.id);

    return { likedBook };
}