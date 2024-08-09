import { editBook, getBook } from "$lib/firebase/database.server";
import validate from "$lib/validators/book.validator";
import { error, fail, redirect } from "@sveltejs/kit";

// @ts-ignore
export async function load({ params, locals }) {
    const book = await getBook(params.id);

    if(!book){
        throw error(404, { message: 'Book not found! '});
    }

    // @ts-ignore
    if(book.user_id !== locals.user.id ){
        throw error(403, { message: 'Access denied!'});
    }

    return { book };
}

export const actions = {
    // @ts-ignore
    default: async ({ request, locals, params }) => {
        const book = await getBook(params.id);

        // @ts-ignore
        if(!book || book.user_id !== locals.user.id ){
            throw error(403, { message: 'Access denied!'});
        }

        const formData = await request.formData();
        const data = await validate(formData, true);

        if(!data.success){
            return fail(422, data);
        }

        await editBook(params.id, data.book, locals.user.id);

        throw redirect(303, `/book/${params.id}`);
    }
}