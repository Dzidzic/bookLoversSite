<script>
	import { goto } from "$app/navigation";
	import Like from "./Books/Like.svelte";
    // @ts-ignore
    export let book;

	function goToBookPage() {
		// @ts-ignore
		goto(`/book/${book.id}`)
	}
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={goToBookPage} class="row mt-2">
	<div class="col col-12 col-sm-6 col-md-4">
		<img src="{book.small_picture}" alt="" />
	</div>
	<div class="col col-12 col-sm-6 col-md-8 mt-2">
		<h2>&nbsp;{book.title}</h2>
		<h4>&nbsp;&nbsp;&nbsp;&nbsp;{book.author}</h4>
		<p>
			{book.short_description}
		</p>
        <Like {book} on:toggle_like />
	</div>
</div>

<style>
	img {
		max-width: 90%;
		margin: 5px auto;
		max-height: 200px;
		display: block;
	}
	.row {
		border: solid 1px gray;
		cursor: pointer;
	}
</style>