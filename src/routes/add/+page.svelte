<script>
	import BookForm from "$lib/components/Books/BookForm.svelte";
    export let form;
</script>

<svelte:head>
    <title>BookLovers - Add Book</title>
</svelte:head>

<div class="row">
    <div class="col">
        <h1>Add Book</h1>
    </div>
</div>

{#if form && form.success}
    <h2>Success Submit</h2>
{:else}
    <main class="m-1">
        <BookForm {form}/>
    </main>
{/if}