<script lang="ts">
	import Board from "$lib/components/Board.svelte";
import Swimlane from "$lib/components/Swimlane.svelte";
    import { board } from "$lib/stores";
	import type { LayoutServerData } from "./$types";

	export let data: LayoutServerData | undefined;

	board.set(data?.board?? null);

</script>

<!-- Component Start -->
<Board />
