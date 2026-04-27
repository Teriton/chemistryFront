<script lang="ts">
	import MenuItem from '$lib/components/menu-item.svelte';
	import { resolve } from '$app/paths';
	import { logedIn } from '$lib/logedIn';

	let { articlesTree, lessonsCompleted, children  } = $props();

	let menuOpen = $state(false);
	let lessonsMenuOpen = $state(false);

	function toggleLessonsMenu() {
		lessonsMenuOpen = !lessonsMenuOpen;
	}

</script>
<div class="flex justify-between relative z-50 h-screen">
	<div class="h-screen fixed  flex">
		<div class="py-5 h-screen justify-items-center items-center bg-green-300 flex flex-col gap-5">
			 <a href={resolve($logedIn ? "/profile" : "/login")} class="flex flex-col justify-center items-center">
				<i class="fa-solid fa-circle-user text-4xl "></i>
				{#if $logedIn}
					<h3 class="text-center">Профиль</h3>	
				{:else} 
					<h3 class="text-center">Войти</h3>
				{/if}	
			</a>
			<button onclick={() => lessonsMenuOpen = !lessonsMenuOpen } class="flex flex-col justify-center items-center hover:text-green-700 transition-colors">
				<i class="fa-solid fa-list text-5xl"></i>
						Уроки	
			</button>
			<a href={resolve("/ref")} class="flex flex-col justify-center items-center">
				<i class="fa-solid fa-book text-5xl"></i>
				Справочник 
			</a>
			<div class="flex flex-col justify-center items-center">
				<i class="fa-solid fa-pencil text-5xl"></i>
				Задачи
			</div>
		</div>
		{#if lessonsMenuOpen && articlesTree}
			<!-- svelte-ignore a11y_interactive_supports_focus -->
			<div data-sveltekit-reload
				role="button"
				class=" bg-white top-0 text-black shadow-lg rounded-md py-2 w-50 z-40 "
				onkeypress={() => {}}
				onclick={() => lessonsMenuOpen = true}
			>
				{#each articlesTree.articles as section (section.title)}
					<MenuItem lessonsCompleted={lessonsCompleted} section={section} path="" />
				{/each}
			</div>
		{/if}
	</div>
	<div class="w-screen flex flex-col">
		<header class="bg-green-300 text-black shadow-lg grid justify-end ">
			<div class="mx-auto px-4 py-3 flex items-center ">
				<div class="flex items-center space-x-2 ">
					<i class="fas fa-flask text-2xl"></i>
					<h1 class="text-xl md:text-2xl font-bold">Химическая химия</h1>
				</div>
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
							<button class="hover:text-blue-200 transition-colors py-1 text-left" onclick={toggleLessonsMenu}>Уроки</button>
							{#if lessonsMenuOpen && articlesTree}
								<div class="pl-4">
									{#each articlesTree.articles as section (section.title)}
										<MenuItem section={section} path="" />
									{/each}
								</div>
							{/if}
						</nav>
					</div>
				{/if}
			</header>
			
			<div class="pl-30">
				{@render children()}
			</div>
		</div>
	</div>
<!-- 
<div class="pl-100 ">
	{#if lessonsMenuOpen && articlesTree}
		<!-- svelte-ignore a11y_interactive_supports_focus 
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
</div> -->
