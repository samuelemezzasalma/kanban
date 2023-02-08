<script lang="ts">
	import Board from "$lib/components/Board.svelte";
import Swimlane from "$lib/components/Swimlane.svelte";
	import type { LayoutServerData } from "./$types";

	export let data: LayoutServerData | undefined;

</script>

<!-- Component Start -->
<Board board={data?.board} />
