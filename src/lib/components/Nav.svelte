<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { logout } from "$lib/firebase/auth.client";
	import authStore from "$lib/stores/auth.store";
	import messageStore from "$lib/stores/message.store";

    let openNavbar = false;
    $: currentPage = $page.url.pathname;

    function changeNavbar(){
        openNavbar = !openNavbar;
    }

	async function onLogout(){
		try {
			await logout();
			goto('/');
		} catch (error) {
			console.log(error);
			messageStore.showError();
		}
	}
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">Book Lover</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNav"
			aria-controls="navbarNav"
			aria-expanded="false"
			aria-label="Toggle navigation"
            on:click={changeNavbar}
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class:show = {openNavbar} class="collapse navbar-collapse" id="navbarNav">             
            <ul class="navbar-nav">
                {#if $authStore.isLoggedIn}
    				<li class="nav-item">
    					<a class:active = {currentPage == '/'} class="nav-link" aria-current="page" href="/">Home</a>
				    </li>
				    <li class="nav-item">
    					<a class:active = {currentPage == '/add'} class="nav-link" href="/add">Add Book</a>
				    </li>
				    <li class="nav-item">
					    <a class:active = {currentPage == 'profile'} class="nav-link" href="/profile">Profile</a>
				    </li>
				    <li class="nav-item">
    					<a class:active = {currentPage == '/about'} class="nav-link" href="/about">About</a>
	    			</li>
		    		<li class="nav-item">
			    		<!-- svelte-ignore a11y-click-events-have-key-events -->
			    		<!-- svelte-ignore a11y-no-static-element-interactions -->
			    		<span class="nav-link" on:click={onLogout}>Logout</span>
				    </li>              
                {:else}
				    <!-- Not Logged In -->
				    <li class="nav-item">
					    <a class:active = {currentPage == '/'} class="nav-link" aria-current="page" href="/">Home</a>
				    </li>
				    <li class="nav-item">
					    <a class:active = {currentPage == '/about'} class="nav-link" href="/about">About</a>
				    </li>
				    <li class="nav-item">
					    <a class:active = {currentPage == '/login'} class="nav-link" href="/login">Login</a>
				    </li>
				    <li class="nav-item">
					    <a class:active = {currentPage == '/signup'} class="nav-link" href="/signup">Sign Up</a>
				    </li>
                {/if}  
			</ul>
		</div>
	</div>
</nav>

<style>
	.nav-item > span {
		cursor: pointer;
	}
</style>