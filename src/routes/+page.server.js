import { getBooks } from '$lib/firebase/database.server';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, url }) {
    const page = url.searchParams.get('page') || 1;
    // @ts-ignore
    const { books, next, prev } = await getBooks(locals?.user?.id, +page);
    return{ books, next, prev, page};
}