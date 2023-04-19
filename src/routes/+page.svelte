<script lang="ts">
	import Board from "$lib/components/Board.svelte";
    import type { IBoard } from "$lib/mongoose/documents";
	import { onMount } from "svelte";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;

	let board: IBoard;

	onMount(async () => {
		if (data) {
			board = JSON.parse(data.board);
			console.log(data);
		}
	});

	// const board = eval(data.board??"")
</script>

<!-- <div>{JSON.stringify(data)}</div> -->

<!-- Component Start -->
<Board board={board} />
