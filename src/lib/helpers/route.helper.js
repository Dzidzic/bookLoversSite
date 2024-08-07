import { goto } from "$app/navigation";
import { sendJWT } from "$lib/firebase/auth.client";
import { setUser } from "$lib/firebase/database.client";

// @ts-ignore
export async function afterLogin(url, userId) {
    const route = url.searchParams.get('redirect') || '/';
    await setUser(userId);
    await sendJWT();
    await goto(route);
}