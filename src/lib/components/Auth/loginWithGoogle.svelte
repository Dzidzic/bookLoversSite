<script>
	import { page } from '$app/stores';
	import { loginWithGoogle } from '$lib/firebase/auth.client';
	import { afterLogin } from '$lib/helpers/route.helper';
	import messageStore from '$lib/stores/message.store';
    async function loginGoogle() {
        try {
            const user = await loginWithGoogle();
            await afterLogin($page.url, user.uid);
            messageStore.showSucces('Logged in successfully!');            
        } catch (e) {
            // @ts-ignore
            if(e.code === 'auth/popup-closed-by-user'){
                return;
            }
            console.log(e);
            messageStore.showError();
        } 
    }
</script>

<div class="row">
    <div class="col">
        <button on:click={loginGoogle} class="btn btn-primary w-100">Login with Google</button>
    </div>
</div>