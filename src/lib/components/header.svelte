<script lang="ts">
	import MenuItem from '$lib/components/menu-item.svelte';

	let { articlesTree } = $props();

	let menuOpen = $state(false);
	let lessonsMenuOpen = $state(false);

	function toggleLessonsMenu() {
		lessonsMenuOpen = !lessonsMenuOpen;
	}

</script>

<header class="bg-blue-600 text-white shadow-lg">
	<div class="container mx-auto px-4 py-3 flex items-center justify-between">
		<!-- Logo/Title -->
		<div class="flex items-center space-x-2">
			<i class="fas fa-flask text-2xl"></i>
			<h1 class="text-xl md:text-2xl font-bold">Chemistry Learning Hub</h1>
		</div>

		<!-- Desktop Navigation -->
		<nav class="hidden md:flex space-x-6 relative">
			<a href="" class="hover:text-blue-200 transition-colors">Home</a>
			<div class="relative">
				<button
					class="hover:text-blue-200 transition-colors"
					onmouseenter={() => lessonsMenuOpen = true}
				>
					Lessons
				</button>
				{#if lessonsMenuOpen && articlesTree}
					<!-- svelte-ignore a11y_interactive_supports_focus -->
					<div role="button"
						class="absolute top-full left-0 mt-2 bg-white text-black shadow-lg rounded-md py-2 min-w-48 z-50"
						onmouseenter={() => lessonsMenuOpen = true}
						onmouseleave={() => lessonsMenuOpen = false}
					>
						{#each articlesTree.articles as section (section.title)}
							<MenuItem section={section} path="" />
						{/each}
					</div>
				{/if}
			</div>
			<a href="" class="hover:text-blue-200 transition-colors">Experiments</a>
			<a href="" class="hover:text-blue-200 transition-colors">About</a>
		</nav>

		<!-- Mobile Menu Button -->
		<button
			class="md:hidden text-2xl focus:outline-none"
			onclick={() => menuOpen = !menuOpen}
			aria-label="Toggle menu"
		>
			<i class="fas {menuOpen ? 'fa-times' : 'fa-bars'}"></i>
		</button>
	</div>

	<!-- Mobile Navigation -->
	{#if menuOpen}
		<div class="md:hidden bg-blue-700 px-4 py-2">
			<nav class="flex flex-col space-y-2">
				<a href="" class="hover:text-blue-200 transition-colors py-1" onclick={() => menuOpen = false}>Home</a>
				<button class="hover:text-blue-200 transition-colors py-1 text-left" onclick={toggleLessonsMenu}>Lessons</button>
				{#if lessonsMenuOpen && articlesTree}
					<div class="pl-4">
						{#each articlesTree.articles as section (section.title)}
							<MenuItem section={section} path="" />
						{/each}
					</div>
				{/if}
				<a href="" class="hover:text-blue-200 transition-colors py-1" onclick={() => menuOpen = false}>Experiments</a>
				<a href="" class="hover:text-blue-200 transition-colors py-1" onclick={() => menuOpen = false}>About</a>
			</nav>
		</div>
	{/if}
</header>