<script>
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppBar, AppShell, LightSwitch, menu } from "@skeletonlabs/skeleton";


	let showMenu = false;

	function toggleNavbar() {
		showMenu = !showMenu;
	}

</script>
<!-- App Shell -->
<AppShell>

	<!-- --- HEADER --- -->
	<svelte:fragment slot="header">
		<AppBar>
			<nav class="flex items-center flex-wrap">
				<div class="block lg:hidden">
					<button class="lg:!hidden btn btn-sm" on:click={toggleNavbar}>
						<i class="fa-solid fa-bars text-xl" />
					</button>
				</div>
				<div class="flex items-center flex-shrink-0 mr-6">
					<span><strong class="text-xl uppercase">Kanban</strong></span>
				</div>
				<div
					class="w-full block flex-grow lg:flex lg:items-center lg:w-auto {showMenu
						? 'flex'
						: 'hidden'}"
				>
					<div class="text-sm lg:flex-grow">
						<a
							href="#responsive-header"
							class="block mt-4 lg:inline-block lg:mt-0 te mr-4"
						>
							Docs
						</a>
						<a
							href="#responsive-header"
							class="block mt-4 lg:inline-block lg:mt-0  mr-4"
						>
							Examples
						</a>
						<a
							href="#responsive-header"
							class="block mt-4 lg:inline-block lg:mt-0 "
						>
							Blog
						</a>
						<a
						href="#"
						class="inline-block text-sm px-4 py-2 leading-none border rounded  hover:border-transparent  mt-4 lg:mt-0"
						>Login</a
					>
					</div>
					
				</div>
			</nav>
			<!-- TRAIL -->
			<svelte:fragment slot="trail">

				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- --- HEADER --- -->

	<!-- Page Route Content -->
	<slot />
</AppShell>
