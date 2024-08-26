<script>
// @ts-nocheck

	import Nav from '$lib/components/Nav.svelte';
	import { sendJWT } from '$lib/firebase/auth.client';
	import '$lib/firebase/firebase.client';
	import authStore from '$lib/stores/auth.store.js';
	import bookNotifyStore from '$lib/stores/bookNotify.store.js';
	import messageStore from '$lib/stores/message.store';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import { onDestroy, onMount } from 'svelte';	
    
    // @ts-ignore
	let timerId;
    // @ts-ignore
    let bookAlert;
	export let data;

    const unSub = bookNotifyStore.subscribe(book => {
        if(!$authStore.isLoggedIn){
            bookAlert = book;
            return;
        }

        // @ts-ignore
        if($authStore.userId !== book.user_id){
            bookAlert = book;
            return;
        }       
    });

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
		};
	}

	onMount(async () => {
		try {
			await sendServerToken();
			setInterval(
				async () => {
					await sendServerToken();
				},
				1000 * 10 * 60
			);
		} catch (error) {
			console.log(error);
			messageStore.showError();
		}
	});

    onDestroy(() => {
        unSub();
    });

	$: messageTitle = $messageStore.type === 'error' ? 'Error:' : 'Success:';

	function hideMessage() {
		messageStore.hide();
	}

    function closeAlert(){
        bookAlert = null;
    }
</script>

<Nav {isLoggedIn} />
<main class="container">
	{#if $messageStore.show}
		<div class="row mt-3">
			<div class="col">
				<div
					class:alert-danger={$messageStore.type === 'error'}
					class:alert-success={$messageStore.type === 'success'}
					class="alert alert-dismissible"
					role="alert"
				>
					<strong>{messageTitle}</strong>
					{$messageStore.message}
					<button type="button" class="btn-close" aria-label="Close" on:click={hideMessage} />
				</div>
			</div>
		</div>
	{/if}
	<slot />
	{#if bookAlert}
		<div
			class="toast show position-fixed top-0 end-0 m-3"
			role="alert"
			aria-live="assertive"
			aria-atomic="true"
		>
			<div class="toast-header">
				<strong class="me-auto">New Book</strong>
				<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"
                on:click={closeAlert} />
			</div>
			<div class="toast-body">
				Book <a href="/book/{bookAlert.id}">{bookAlert.title}</a> just created!!
			</div>
		</div>
	{/if}
</main>
