<script lang="ts">
	import Swimlane from "$lib/components/Swimlane.svelte";
	import type { ListData } from "$lib/interfaces/ListData";
	import type { LayoutServerData } from "./$types";

	export let listsData: ListData[] = [];

	listsData = [
		{
			title: "BackLog",
			cards: [
				{
					attachments: [],
					comments: [],
					tags: ["Design"],
					// description: "",
					title:
						"This is the title of the card for the thing that needs to be done.",
				},
			],
		},
	];

	export let data: LayoutServerData | undefined;

	const backlog = [1, 2, 3, 4, 5, 6];
	const ready = [1, 2, 3];
	const doing = [1, 2];
	const review = [1, 2, 3];
	const blocked = [1];
	const done = [1, 2, 3, 4, 5];
	// let isFocused = false;
	// $: active_class = isFocused ? 'py-0 cursor-pointer' : 'input readonly py-0 cursor-pointer';
	// const onFocus =()=> isFocused = !isFocused;
</script>

<!-- markup (zero or more items) goes here -->
<!-- Component Start -->
<div class="flex flex-col w-screen h-screen overflow-auto">
	<div class="flex items-center flex-shrink-0 w-full h-16 px-10 ">
		<i class="fa-solid fa-swatchbook text-2xl" />
		<input
			class="flex items-center h-10 px-4 ml-10 text-sm rounded-full focus:outline-none focus:ring"
			type="search"
			placeholder="Search for anything…"
		/>
		<div class="ml-10">
			<a class="mx-2 text-sm font-semibold " href="#">Projects</a>
			<a class="mx-2 text-sm font-semibold " href="#">Team</a>
			<a class="mx-2 text-sm font-semibold " href="#">Activity</a>
		</div>
		<button
			class="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer"
		>
			<img
				src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
				alt=""
			/>
		</button>
	</div>
	<div class="px-10 mt-6">
		<h1 class="text-2xl font-bold">{data?.board.title}</h1>
		<!-- <h4>Kanban is based on 3 basic principles</h4>

		<dl class="list-dl">
			<div>
				<span class="badge bg-primary-500"
					><i class="fa-solid fa-arrow-right" /></span
				>
				<span class="flex-auto">
					<dt class="font-bold">Visualize what you do today (workflow)</dt>
					<dd class="text-sm opacity-50">
						seeing all the items in context of each other can be very
						informative
					</dd>
				</span>
			</div>
			<div>
				<span class="badge bg-primary-500"
					><i class="fa-solid fa-arrow-right" /></span
				>
				<span class="flex-auto">
					<dt class="font-bold">Limit the amount of work in progress (WIP)</dt>
					<dd class="text-sm opacity-50">
						this helps balance the flow-based approach so teams don’t start and
						commit to too much work at once
					</dd>
				</span>
			</div>
			<div>
				<span class="badge bg-primary-500"
					><i class="fa-solid fa-arrow-right" /></span
				>
				<span class="flex-auto">
					<dt class="font-bold">Enhance flow</dt>
					<dd class="text-sm opacity-50">
						this helps balance the when something is finished, the next highest
						thing from the backlog is pulled into play
					</dd>
				</span>
			</div>
		</dl>

		<p>
			Kanban promotes continuous collaboration and encourages active, ongoing
			learning and improving by defining the best possible team workflow.
		</p> -->
	</div>
	<div class="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
		{#if data?.board.swimlanes}
			{#each data?.board.swimlanes as swimlane}
				<Swimlane boardId={data?.board?.id?? ""} {swimlane} />
			{/each}
		{/if}

		<!-- {#each listsData as listData}
			<List {...listData} />
		{/each} -->
		<!-- <div class="flex flex-col flex-shrink-0 w-72">
			<div class="flex items-center flex-shrink-0 h-10 px-2">
				<span class="block text-sm font-semibold">Backlog</span>
				<span class="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold ">6</span>
				<button class="flex items-center justify-center w-6 h-6 ml-auto  rounded  ">
					<i class="fa-solid fa-plus"></i>
				</button>
			</div>
			<div class="flex flex-col pb-2 pr-1 overflow-auto">
				{#each backlog as item}
					<Card />
				{/each}
			</div>
		</div> -->
		<!-- <div class="flex flex-col flex-shrink-0 w-72">
			<div class="flex items-center flex-shrink-0 h-10 px-2">
				<span class="block text-sm font-semibold">Ready</span>
				<span class="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold  ">3</span>
				<button class="flex items-center justify-center w-6 h-6 ml-auto  rounded  ">
					<i class="fa-solid fa-plus"></i>
				</button>
			</div>
			<div class="flex flex-col pb-2 pr-1 overflow-auto">
				{#each ready as item}
					<Card />
				{/each}
			</div>
		</div>
		<div class="flex flex-col flex-shrink-0 w-72">
			<div class="flex items-center flex-shrink-0 h-10 px-2">
				<span class="block text-sm font-semibold">Doing</span>
				<span class="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold  ">2</span>
				<button class="flex items-center justify-center w-6 h-6 ml-auto  rounded  ">
					<i class="fa-solid fa-plus"></i>
				</button>
			</div>
			<div class="flex flex-col pb-2 pr-1 overflow-auto">
				{#each doing as item}
					<Card />
				{/each}
			</div>
		</div>
		<div class="flex flex-col flex-shrink-0 w-72">
			<div class="flex items-center flex-shrink-0 h-10 px-2">
				<span class="block text-sm font-semibold">Review</span>
				<span class="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold  ">3</span>
				<button class="flex items-center justify-center w-6 h-6 ml-auto  rounded  ">
					<i class="fa-solid fa-plus"></i>
				</button>
			</div>
			<div class="flex flex-col pb-2 pr-1 overflow-auto">
				{#each review as item}
					<Card />
				{/each}
			</div>
		</div>
		<div class="flex flex-col flex-shrink-0 w-72">
			<div class="flex items-center flex-shrink-0 h-10 px-2">
				<span class="block text-sm font-semibold">Blocked</span>
				<span class="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold  ">1</span>
				<button class="flex items-center justify-center w-6 h-6 ml-auto  rounded  ">
					<i class="fa-solid fa-plus"></i>
				</button>
			</div>
			<div class="flex flex-col pb-2 pr-1 overflow-auto">
				{#each blocked as item}
					<Card />
				{/each}
			</div>
		</div>
		<div class="flex flex-col flex-shrink-0 w-72">
			<div class="flex items-center flex-shrink-0 h-10 px-2">
				<span class="block text-sm font-semibold">Done</span>
				<span class="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold  ">3</span>
				<button class="flex items-center justify-center w-6 h-6 ml-auto  rounded  ">
					<i class="fa-solid fa-plus"></i>
				</button>
			</div>
			<div class="flex flex-col pb-2 pr-1 overflow-auto">
				{#each done as item}
					<Card />
				{/each}
			</div>
		</div> -->
		<div class="flex-shrink-0 w-6" />
	</div>
</div>
