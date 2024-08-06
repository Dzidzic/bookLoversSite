import { goto } from "$app/navigation";

// @ts-ignore
export async function afterLogin(url) {
    console.log(url);
    console.log(url.searchParams);
    console.log(url.searchParams.get('redirect'));
    const route = url.searchParams.get('redirect') || '/';
    console.log(route);
    goto(route);
}