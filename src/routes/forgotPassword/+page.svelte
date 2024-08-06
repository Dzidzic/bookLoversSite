<script>
	import AuthForm from "$lib/components/Auth/AuthForm.svelte";
	import { resetPassword } from "$lib/firebase/auth.client";
	import messageStore from "$lib/stores/message.store";

    // @ts-ignore
    async function forgotPassword(e) {
        try {
            const formData = new FormData(e.target);
            const email = formData.get('email');
            await resetPassword(email);
            messageStore.showSucces('Email send!')
        } catch (error) {
            // @ts-ignore
            console.log(error.code);
        }
    }
</script>

<svelte:head>
    <title>BookLovers - Reset Password</title>
</svelte:head>

<div class="row">
    <div class="col">
        <h1>Reset Your Password</h1>
    </div>
</div>
<hr>
<AuthForm on:submit={forgotPassword} btnName="Reset Password" forgotPassword={true}/>