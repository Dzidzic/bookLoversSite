<script>
	import { goto } from '$app/navigation';
    import '$lib/firebase/auth.client';
	import { loginWithGoogle } from '$lib/firebase/auth.client';
	import messageStore from '$lib/stores/message.store';

    async function loginGoogle() {
        try {
            const user = await loginWithGoogle();
            goto('/');
        } catch (e) {
            // @ts-ignore
            if(e.code === 'auth.popup-closed-by-user'){
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