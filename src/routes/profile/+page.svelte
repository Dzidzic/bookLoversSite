<script>
	import Book from '$lib/components/Book.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
</script>

{#each data.books as book (book.id)}
    <Book {book}/>
{/each}