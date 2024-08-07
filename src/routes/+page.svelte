<script>
    /** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
    <title>BookLovers</title>
</svelte:head>

<h1>Number of users: {data.count}</h1>
