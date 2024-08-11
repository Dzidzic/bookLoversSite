<script>
// @ts-nocheck

	import { goto } from '$app/navigation';
	import Book from '$lib/components/Book.svelte';
	import messageStore from '$lib/stores/message.store';
    import { redirect } from '@sveltejs/kit';

    /** @type {import('./$types').PageData} */
    export let data;

    async function next() {
        try {
            await goto(`/?page=${+data.page + 1}`);
        } catch (error) {
            messageStore.showError();
        }
    }

    async function prev() {
        try {
            await goto(`/?page=${+data.page - 1}`);
        } catch (error) {
            messageStore.showError();
        }
    }
</script>

<svelte:head>
    <title>BookLovers - Home</title>
</svelte:head>

<div class="row m-3">
    <div class="col">
        <div class="text-center">
            <h1>Latest books&nbsp;{data.page}/{data.pages}</h1>
        </div>
    </div>
</div>

{#each data.books as book (book.id)}
    <Book {book} />
{/each}

<div class="row">
    <div class="col text-end">
        <button class="btn btn-info w-75 mt-3" disabled={!data.prev} on:click={prev}><strong>&lt- Previous --</strong></button>
    </div>
    <div class="col">
        <button class="btn btn-info w-75 mt-3" disabled={!data.next} on:click={next}><strong>-- Next -&gt</strong></button>
    </div>
</div>