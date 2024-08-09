import { getBook } from "$lib/firebase/database.server";
import { error } from "@sveltejs/kit";

// @ts-ignore
export async function load({ params, locals }) {
    const book = await getBook(params.id, locals?.user?.id);
    
    if(!book){
        throw error(404, { message: 'Book nor found! '});
    }
    
    return { book };
}