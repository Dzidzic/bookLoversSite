import { auth } from "$lib/firebase/firebase.server";
import { redirect } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }){
    const protectedRoutes = [
        '/add',
        '/edit',
        '/profile'
    ];
    const guessRoutes = [
        '/login',
        '/signup',
        '/forgotPassword'
    ];

    try {
        // @ts-ignore
        event.locals.user = await getFirebaseUser(event.cookies.get('jwt'));
    } catch (error) {
        // @ts-ignore
        event.locals.user = null;
    }

    // @ts-ignore
    const user = event.locals?.user;
    const url = event.url;
    if(url.pathname !== '/'){
        if(!user && protectedRoutes.find(u => url.pathname.indexOf(u) > -1 )){
            throw redirect(302, `/login?redirect=${url.pathname}`);
        }
        
        if(user && guessRoutes.find(u => url.pathname.indexOf(u) > -1 )){
            throw redirect(302, '/');
        }
    }
    
    const response = await resolve(event);
    return response;
}

// @ts-ignore
async function getFirebaseUser(token) {
    if(!token){
        return null;
    }

    const decodedToken = await auth.verifyIdToken(token, true);
    const user = await auth.getUser(decodedToken.uid);

    return {
        id: user.uid,
        email: user.email
    };
}