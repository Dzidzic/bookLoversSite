<script>
	import Book from '$lib/components/Book.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    function filterUnlikedBooks(e) {
        const { id } = e.detail;
        data.likedBook = data.likedBook.filter((b) => b.id !== id);
    }
</script>

{#each data.likedBook as book (book.id)}
    <Book {book} on:toggle_like={filterUnlikedBooks}/>
{/each}