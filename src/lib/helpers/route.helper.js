import { goto } from "$app/navigation";
import { setUser } from "$lib/firebase/database.client";

// @ts-ignore
export async function afterLogin(url, userId) {
    const route = url.searchParams.get('redirect') || '/';
    await setUser(userId);
    await goto(route);
}