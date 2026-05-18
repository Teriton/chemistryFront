<script lang="ts">
	import { goto } from '$app/navigation';
	import { AuthMngr } from '$lib/auth-mngr';
	import { logedIn } from '$lib/logedIn';
	import {
		UserMngr,
		type UserWithCompletedLessonsCount,
		type UserWithPasswordToEdit
	} from '$lib/user-mngr';
	import { resolve } from '$app/paths';
	import DefaultAvatar from '$lib/components/DefaultAvatar.svelte';
	import type { Achievement } from '$lib/models/achievement';

	const authMngr = new AuthMngr('localhost:8080');
	const userMngr = new UserMngr('localhost:8080');
	let achievements = $state<Achievement[]>([]);
	let allAchievements = $state<Achievement[]>([]);
	const earnedIds = $derived(new Set(achievements.map(a => a.id)));
	const unearned = $derived(allAchievements.filter(a => !earnedIds.has(a.id)));
	let user = $state<UserWithCompletedLessonsCount | null>(null);
	let isEditing = $state(false);
	let editForm = $state<UserWithPasswordToEdit>({
		username: '',
		email: '',
		password: '',
		current_password: ''
	});
	let editError = $state<string | null>(null);
	let editSuccess = $state<string | null>(null);
	let avatarError = $state<string | null>(null);
	let avatarBusy = $state(false);
	let fileInput = $state<HTMLInputElement | undefined>(undefined);

	const isValid = $derived.by((): boolean => {
		const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email);
		const passOk = editForm.password.length >= 8 || editForm.password == '';
		const userOk = editForm.username.trim().length >= 3;
		return emailOk && passOk && userOk;
	});

	const avatarSrc = $derived(
		user?.avatar && user.avatar.length > 0 ? user.avatar : null
	);

	$effect(() => {
	(async () => {
		const [u, earned, all] = await Promise.all([
			userMngr.getUserWithCompletedLessonsCount(),
			userMngr.getAchievements(),
			userMngr.getAllAchievements()
		]);
		user = { ...u, creation_date: new Date(u.creation_date) };
		achievements = earned;
		allAchievements = all;
	})();
});

	function startEdit() {
		editForm = {
			username: user?.username ?? '',
			email: user?.email ?? '',
			password: '',
			current_password: ''
		};
		editError = null;
		editSuccess = null;
		isEditing = true;
	}

	async function saveEdit() {
		if (!isValid) {
			editError = 'Проверьте корректность всех полей';
			return;
		}
		editError = null;
		editSuccess = null;
		if (!editForm.current_password) {
			editError = 'Введите текущий пароль для подтверждения';
			return;
		}
		const result = await userMngr.edit(editForm);
		if (result?.status === 'Error') {
			editError = result.body?.message || 'Ошибка обновления данных';
			return;
		}
		editSuccess = 'Данные успешно обновлены';
		const updated = await userMngr.getUserWithCompletedLessonsCount();
		user = { ...updated, creation_date: new Date(updated.creation_date) };
		isEditing = false;
	}

	async function logout() {
		const res = await authMngr.logout();
		if (res.status === 'ok') {
			$logedIn = false;
			await goto(resolve('/login'));
		}
	}

	function formatDate(date: Date): string {
		return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
	}

	const maxAvatarBytes = 350_000;

	async function onAvatarFile(e: Event) {
		const input = e.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		input.value = '';
		if (!file || !file.type.startsWith('image/')) {
			avatarError = 'Выберите файл изображения';
			return;
		}
		if (file.size > maxAvatarBytes) {
			avatarError = 'Файл слишком большой (макс. ~350 КБ). Выберите меньшее изображение.';
			return;
		}
		avatarError = null;
		avatarBusy = true;
		try {
			const dataUrl = await new Promise<string>((res, rej) => {
				const r = new FileReader();
				r.onload = () => res(String(r.result));
				r.onerror = () => rej(new Error('read'));
				r.readAsDataURL(file);
			});
			const result = await userMngr.updateAvatar(dataUrl);
			if (!result.ok) {
				avatarError = result.message ?? 'Ошибка сохранения';
				return;
			}
			const updated = await userMngr.getUserWithCompletedLessonsCount();
			user = { ...updated, creation_date: new Date(updated.creation_date) };
		} catch {
			avatarError = 'Не удалось прочитать файл';
		} finally {
			avatarBusy = false;
		}
	}

	async function clearAvatar() {
		avatarError = null;
		avatarBusy = true;
		try {
			const result = await userMngr.updateAvatar('');
			if (!result.ok) {
				avatarError = result.message ?? 'Ошибка';
				return;
			}
			const updated = await userMngr.getUserWithCompletedLessonsCount();
			user = { ...updated, creation_date: new Date(updated.creation_date) };
		} finally {
			avatarBusy = false;
		}
	}
</script>

<input
	type="file"
	accept="image/jpeg,image/png,image/webp,image/gif"
	class="hidden"
	bind:this={fileInput}
	onchange={onAvatarFile}
/>

<div class="flex min-h-screen justify-center py-10">
	<div class="w-full max-w-3xl space-y-6 rounded-3xl bg-(--sec-col) px-8 py-6 shadow-2xl">
		{#if !isEditing}
			<div class="flex flex-wrap items-start gap-6">
				<div
					class="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-slate-200 shadow-inner"
				>
					{#if avatarSrc}
						<img src={avatarSrc} alt="" class="h-full w-full object-cover" />
					{:else}
						<DefaultAvatar class="h-16 w-16 text-slate-500" />
					{/if}
				</div>
				<div class="min-w-0 flex-1">
					<h1 class="text-2xl font-bold text-gray-900">{user?.username}</h1>
					<p class="text-gray-600"><span class="font-semibold">Email:</span> {user?.email}</p>
					<p class="text-gray-600">
						<span class="font-semibold">Создан:</span>
						{user ? formatDate(user.creation_date) : '—'}
					</p>
					<div class="mt-3 flex flex-wrap gap-2">
						<button
							type="button"
							class="rounded-xl bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
							disabled={avatarBusy}
							onclick={() => fileInput?.click()}
						>
							{avatarBusy ? 'Сохранение…' : 'Сменить фото'}
						</button>
						{#if avatarSrc}
							<button
								type="button"
								class="rounded-xl border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
								disabled={avatarBusy}
								onclick={clearAvatar}
							>
								Удалить фото
							</button>
						{/if}
					</div>
					{#if avatarError}
						<p class="mt-2 text-sm text-red-600">{avatarError}</p>
					{/if}
				</div>
				<button
					onclick={startEdit}
					class="rounded-xl p-2.5 text-gray-500 transition-colors hover:bg-teal-50 hover:text-teal-700"
					title="Редактировать"
				>
					<i class="fa-solid fa-pen"></i>
				</button>
			</div>

			<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<div class="rounded-2xl border bg-white/50 p-4 text-center">
					<p class="text-2xl font-bold text-gray-900">{user?.xp ?? 0}</p>
					<p class="text-sm text-gray-500">Очков опыта</p>
				</div>
				<div class="rounded-2xl border bg-white/50 p-4 text-center">
					<p class="text-2xl font-bold text-gray-900">{user?.streak ?? 0}</p>
					<p class="text-sm text-gray-500">Дней подряд</p>
				</div>
				<div class="rounded-2xl border bg-white/50 p-4 text-center">
					<p class="text-2xl font-bold text-gray-900">{user?.completed_lessons ?? 0}</p>
					<p class="text-sm text-gray-500">Пройдено уроков</p>
				</div>
			</div>
		{:else}
			<div class="space-y-4">
				<h2 class="text-xl font-semibold text-gray-900">Редактирование профиля</h2>

				{#if editError}
					<p class="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{editError}</p>
				{/if}
				{#if editSuccess}
					<p class="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-600">{editSuccess}</p>
				{/if}

				<div class="space-y-3">
					<input
						class="w-full rounded-xl border border-gray-300 p-2.5 focus:ring-2 focus:ring-teal-500"
						type="text"
						placeholder="Логин"
						bind:value={editForm.username}
					/>
					<input
						class="w-full rounded-xl border border-gray-300 p-2.5 focus:ring-2 focus:ring-teal-500"
						type="email"
						placeholder="Email"
						bind:value={editForm.email}
					/>
					<input
						class="w-full rounded-xl border border-gray-300 p-2.5 focus:ring-2 focus:ring-teal-500"
						type="password"
						placeholder="Новый пароль (оставьте пустым, чтобы не менять)"
						bind:value={editForm.password}
					/>
					<input
						class="w-full rounded-xl border border-red-300 p-2.5 focus:ring-2 focus:ring-red-500"
						type="password"
						placeholder="Текущий пароль *"
						bind:value={editForm.current_password}
						required
					/>
				</div>

				<div class="flex justify-end gap-3 pt-2">
					<button
						onclick={() => (isEditing = false)}
						class="rounded-xl px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100"
					>
						Отмена
					</button>
					<button
						onclick={saveEdit}
						class="rounded-xl bg-emerald-600 px-5 py-2 font-medium text-white transition-colors hover:bg-emerald-700"
					>
						Сохранить
					</button>
				</div>
			</div>
		{/if}

		<div class="flex justify-end border-t border-gray-200 pt-4">
			<button
				onclick={logout}
				class="rounded-xl px-4 py-2 font-medium text-red-600 transition-colors hover:bg-red-50"
			>
				Выйти
			</button>
		</div>
		{#if achievements.length > 0}
			<div class="border-t border-gray-200 pt-6">
				<h3 class="text-lg font-semibold text-gray-900 mb-4">Достижения</h3>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{#each achievements as achievement(achievement.id)}
						<div class="flex gap-3 rounded-2xl border bg-white/50 p-4">
							<img 
								src={achievement.icon_data} 
								alt="" 
								class="h-12 w-12 rounded-full object-cover bg-gray-100"
							/>
							<div class="min-w-0">
								<p class="font-medium text-gray-900">{achievement.title}</p>
								<p class="text-sm text-gray-500 truncate">{achievement.description}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
		{#if unearned.length > 0}
			<div class="border-t border-gray-200 pt-6">
				<h3 class="text-lg font-semibold text-gray-900 mb-4">Ещё не получено</h3>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{#each unearned as achievement(achievement.id)}
						<div class="flex gap-3 rounded-2xl border bg-white/30 p-4 opacity-70">
							<div class="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
								<i class="fa-solid fa-lock text-gray-400"></i>
							</div>
							<div class="min-w-0">
								<p class="font-medium text-gray-700">{achievement.title}</p>
								<p class="text-sm text-gray-500 truncate">{achievement.description}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
