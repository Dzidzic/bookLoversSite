import { auth } from "$lib/firebase/firebase.server";
import { json } from "@sveltejs/kit";


/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
    try {
        const { token, email } = await request.json();
        const verifyToken = await auth.verifyIdToken(token ?? '', true);

        if(verifyToken.email === email){
            cookies.set('jwt', token, {
                maxAge: verifyToken.exp - Date.now() / 1000, path: '/'
            });

            return json({ message: 'Success'}, {status: 200});
        }
                
        return json({ message: 'Access Denied' }, { status: 403 });
    } catch (error) {
        return json({ message: 'Access Denied' }, { status: 403 });
    }
}