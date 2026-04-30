<script lang="ts">
	import MenuItem from '$lib/components/menu-item.svelte';
	import { resolve } from '$app/paths';
	import { logedIn } from '$lib/logedIn';

	let { articlesTree, children  } = $props();

	let menuOpen = $state(false);
	let lessonsMenuOpen = $state(false);

	function toggleLessonsMenu() {
		lessonsMenuOpen = !lessonsMenuOpen;
	}
</script>
<div class="min-h-screen bg-transparent">
	<div class="fixed inset-y-0 left-0 z-40 flex w-24 flex-col items-center gap-6 bg-gradient-to-b from-emerald-500 to-teal-500 py-5 text-white shadow-md">
		<a href={resolve($logedIn ? '/profile' : '/login')} class="flex flex-col items-center justify-center transition-transform duration-200 hover:scale-105">
			<i class="fa-solid fa-circle-user text-4xl"></i>
			{#if $logedIn}
				<h3 class="text-center">Профиль</h3>
			{:else}
				<h3 class="text-center">Войти</h3>
			{/if}
		</a>
		<button
			onclick={() => (lessonsMenuOpen = !lessonsMenuOpen)}
			class="flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 hover:text-teal-100"
		>
			<i class="fa-solid fa-list text-4xl"></i>
			Уроки
		</button>
		<a href={resolve('/ref')} class="flex flex-col items-center justify-center transition-transform duration-200 hover:scale-105">
			<i class="fa-solid fa-book text-4xl"></i>
			Справочник
		</a>
		<div class="flex flex-col items-center justify-center opacity-90">
			<i class="fa-solid fa-pencil text-4xl"></i>
			Задачи
		</div>
	</div>

	{#if lessonsMenuOpen && articlesTree}
		<div
			data-sveltekit-reload
			role="button"
			tabindex="0"
			class="fixed left-24 top-0 z-50 h-screen w-80 overflow-y-auto bg-teal-50 py-3 text-black shadow-xl"
			onkeypress={() => {}}
			onclick={() => (lessonsMenuOpen = true)}
		>
			{#each articlesTree.articles as section (section.title)}
				<MenuItem section={section} path="" />
			{/each}
		</div>
	{/if}

	<div class="ml-24 min-h-screen">
		<header class="sticky top-0 z-30 border-b border-emerald-500 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm">
			<div class="mx-auto flex items-center justify-between px-4 py-3">
				<div class="flex items-center space-x-2">
					<i class="fas fa-flask text-2xl"></i>
					<a href={resolve('/')} class="font-serif text-xl font-bold transition-colors hover:text-teal-100 md:text-2xl">chemicals</a>
				</div>
				<button
					class="text-2xl focus:outline-none md:hidden"
					onclick={() => (menuOpen = !menuOpen)}
					aria-label="Переключить меню"
				>
					<i class="fas {menuOpen ? 'fa-times' : 'fa-bars'}"></i>
				</button>
			</div>

			{#if menuOpen}
				<div class="bg-emerald-100 px-4 py-2 md:hidden text-emerald-900">
					<nav class="flex flex-col space-y-2">
						<button class="py-1 text-left transition-colors hover:text-teal-700" onclick={toggleLessonsMenu}
							>Уроки</button
						>
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

		<main class="w-full px-4 py-6 md:px-8">
			{@render children()}
		</main>
	</div>
</div>
