<script>
// @ts-nocheck
	import BookForm from '$lib/components/Books/BookForm.svelte';
    
    /** @type {import('./$types').PageData} */
    export let data;
    export let form;
</script>

<BookForm form={{...data.book, ...form}}/>