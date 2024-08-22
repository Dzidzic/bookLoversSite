import { getUserBooks } from "$lib/firebase/database.server";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    // @ts-ignore
    const books = await getUserBooks(locals?.user?.id);

    return { books }
}