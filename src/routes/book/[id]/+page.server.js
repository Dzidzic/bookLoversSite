import { getBook } from "$lib/firebase/database.server";
import { error } from "@sveltejs/kit";

// @ts-ignore
export async function load({ params }) {
    const book = await getBook(params.id);
    
    if(!book){
        throw error(404, { message: 'Book nor found! '});
    }

    console.log(book);
    
    return { book };
}