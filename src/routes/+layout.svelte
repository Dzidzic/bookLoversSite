<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import Nav from '$lib/components/Nav.svelte';
    import messageStore from '$lib/stores/message.store';
    import '$lib/firebase/firebase.client';
	import { onMount } from 'svelte';
	import { sendJWT } from '$lib/firebase/auth.client';
	import authStore from '$lib/stores/auth.store.js';

    
    // @ts-ignore
    let timerId;
    export let data;
    
    let isLoggedIn = data.isLoggedIn;
    $: isLoggedIn = $authStore.isActive ? $authStore.isLoggedIn : data.isLoggedIn;
    
    async function sendServerToken() {
        try {
            await sendJWT();
        } catch (error) {
            // @ts-ignore
            clearInterval(timerId);
            messageStore.showError();
            console.log(error);
        }
        
        return () => {
            // @ts-ignore
            clearInterval(timerId);
        }
    }

    onMount(async() => {
        try {
            await sendServerToken();
            setInterval(async () => {
                await sendServerToken();
            }, 1000 * 10 * 60);
        } catch (error) {
            console.log(error);
            messageStore.showError();
        }
    })

    $: messageTitle = $messageStore.type === 'error' ? "Error:" : "Success:";

    function hideMessage(){
        messageStore.hide();
    }
</script>

<Nav {isLoggedIn}/>
<main class="container">
    {#if $messageStore.show}
        <div class="row mt-3">
            <div class="col">
                <div class:alert-danger = {$messageStore.type === 'error'} class:alert-success = {$messageStore.type === 'success'}  class="alert alert-dismissible" role="alert">
                    <strong>{messageTitle}</strong>
                    {$messageStore.message}
                    <button type="button" class="btn-close" aria-label="Close" on:click={hideMessage}/>
                </div>
            </div>
        </div>
    {/if}
    <slot />
</main>