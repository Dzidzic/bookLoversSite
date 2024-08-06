<script>
	import { goto } from '$app/navigation';
	import AuthForm from '$lib/components/Auth/AuthForm.svelte';
	import LoginWithGoogle from '$lib/components/Auth/LoginWithGoogle.svelte';
	import { emailPasswordSignUp } from '$lib/firebase/auth.client';
	import messageStore from '$lib/stores/message.store';
	// @ts-ignore
	async function register(e) {
		try {
			const formData = new FormData(e.target);
			const email = formData.get('email');
			const password = formData.get('password');
			if (!email || !password) {
				messageStore.showError('Please enter a valid email and password.');
				return;
			}
			// @ts-ignore
			if (password.length < 6) {
				messageStore.showError('Password must be 6 characters or more.');
				return;
			}
			const user = await emailPasswordSignUp(email, password);
            goto('/');
			messageStore.showSucces('Registered successfully!');
		} catch (error) {
			// @ts-ignore
			if (error.code === 'auth/email-already-in-use') {
				messageStore.showError('You have already registered, please log in.');
				await goto('/login');
				return;
			}
			console.log(error);
			messageStore.showError();
		}
	}
</script>

<div class="row">
	<div class="col">
		<h1>Sign Up</h1>
	</div>
</div>
<hr />
<AuthForm on:submit={register} btnName="Sign Up!" />
<hr />
<LoginWithGoogle />
<svelte:head>
	<title>BookLovers - Sign Up</title>
</svelte:head>