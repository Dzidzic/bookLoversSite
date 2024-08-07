<script>
	import AuthForm from "$lib/components/Auth/AuthForm.svelte";
    import LoginWithGoogle from "$lib/components/Auth/LoginWithGoogle.svelte";
    import messageStore from "$lib/stores/message.store";
    import { emailPasswordSignIn } from "$lib/firebase/auth.client";
	import { afterLogin } from "$lib/helpers/route.helper";
	import { page } from "$app/stores";

    // @ts-ignore
    async function login(e) {
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
            // @ts-ignore
            const user = await emailPasswordSignIn(email, password);
            await afterLogin($page.url, user.uid);
            messageStore.showSucces('Logged in successfully!');
        }catch(error) {
            // @ts-ignore
            if(error.code === 'auth/invalid-credential'){
                messageStore.showError('Invalide email or password');
                return;
            }
            // @ts-ignore
            console.log(error.code);
			messageStore.showError();
        }
    }
</script>

<div class="row">
    <div class="col">
        <h1>Login</h1>
    </div>
</div>
<hr>
<AuthForm on:submit={login} btnName="Login"/>
<div class="row">
    <div class="col text-center">
        <a href="/forgotPassword" class="btn btn-warning w-50 m-1">I forgot my password</a>
    </div>
</div>

<hr>
<LoginWithGoogle />

<svelte:head>
    <title>BookLovers - Login</title>
</svelte:head>