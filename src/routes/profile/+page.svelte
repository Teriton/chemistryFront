<script lang="ts">
	import { goto } from "$app/navigation";
	import { AuthMngr } from "$lib/auth-mngr";
	import { logedIn } from "$lib/logedIn";
	import { UserMngr, type UserWithCompletedLessonsCount, type UserWithPasswordToEdit } from "$lib/user-mngr";
	import { resolve } from '$app/paths';

	const authMngr = new AuthMngr("localhost:8080");
	const userMngr = new UserMngr("localhost:8080");

	let user = $state<UserWithCompletedLessonsCount | null>(null);
	let isEditing = $state(false);
	let editForm = $state<UserWithPasswordToEdit>({ username: "", email: "", password: "", current_password: "" });
	let editError = $state<string | null>(null);
	let editSuccess = $state<string | null>(null);
    const isValid = $derived.by((): boolean => {
		const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editForm.email);
		const passOk = editForm.password.length >= 8 || editForm.password == "";
		const userOk = editForm.username.trim().length >= 3;
		return emailOk && passOk && userOk;
	});


	$effect(() => {
		(async () => {
			const u = await userMngr.getUserWithCompletedLessonsCount();
			user = { ...u, creation_date: new Date(u.creation_date) };
		})();
	});

	function startEdit() {
		editForm = { username: user?.username ?? "", email: user?.email ?? "", password: "", current_password: "" };
		editError = null;
		editSuccess = null;
		isEditing = true;
	}

	async function saveEdit() {
        if (!isValid) {
			editError = "Проверьте корректность всех полей";
			return;
		}
		editError = null;
		editSuccess = null;
		if (!editForm.current_password) {
			editError = "Введите текущий пароль для подтверждения";
			return;
		}
		const result = await userMngr.edit(editForm);
		if (result?.status === "Error") {
			editError = result.body?.message || "Ошибка обновления данных";
			return;
		}
		editSuccess = "Данные успешно обновлены";
		// Refresh user data
		const updated = await userMngr.getUserWithCompletedLessonsCount();
		user = { ...updated, creation_date: new Date(updated.creation_date) };
		isEditing = false;
	}

	async function logout() {
		const res = await authMngr.logout();
		if (res.status === "ok") {
			$logedIn = false;
			await goto(resolve("/"));
		}
	}

	function formatDate(date: Date): string {
		return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
	}
</script>

<div class="flex justify-center min-h-screen py-10">
	<div class="px-8 py-6 w-full max-w-3xl bg-(--sec-col) rounded-3xl shadow-2xl space-y-6">
		
		{#if !isEditing}
			<!-- Profile View -->
			<div class="flex gap-6 items-center">
				<div class="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
					{user?.username?.charAt(0)?.toUpperCase()}
				</div>
				<div class="flex-1">
					<h1 class="text-2xl font-bold text-gray-900">{user?.username}</h1>
					<p class="text-gray-600"><span class="font-semibold">Email:</span> {user?.email}</p>
					<p class="text-gray-600"><span class="font-semibold">Создан:</span> {user ? formatDate(user.creation_date) : '—'}</p>
				</div>
				<button onclick={startEdit} class="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" title="Редактировать">
					<i class="fa-solid fa-pen"></i>
				</button>
			</div>

			<!-- Stats -->
			<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div class="p-4 border rounded-2xl text-center bg-white/50">
					<p class="text-2xl font-bold text-gray-900">{user?.xp ?? 0}</p>
					<p class="text-sm text-gray-500">Очков опыта</p>
				</div>
				<div class="p-4 border rounded-2xl text-center bg-white/50">
					<p class="text-2xl font-bold text-gray-900">{user?.streak ?? 0}</p>
					<p class="text-sm text-gray-500">Дней подряд</p>
				</div>
				<div class="p-4 border rounded-2xl text-center bg-white/50">
					<p class="text-2xl font-bold text-gray-900">{user?.completed_lessons ?? 0}</p>
					<p class="text-sm text-gray-500">Пройдено уроков</p>
				</div>
			</div>
		{:else}
			<!-- Edit Form -->
			<div class="space-y-4">
				<h2 class="text-xl font-semibold text-gray-900">Редактирование профиля</h2>
				
				{#if editError}
					<p class="text-red-600 bg-red-50 px-4 py-2 rounded-lg text-sm">{editError}</p>
				{/if}
				{#if editSuccess}
					<p class="text-green-600 bg-green-50 px-4 py-2 rounded-lg text-sm">{editSuccess}</p>
				{/if}

				<div class="space-y-3">
					<input class="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
						type="text" placeholder="Логин" bind:value={editForm.username} />
					<input class="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
						type="email" placeholder="Email" bind:value={editForm.email} />
					<input class="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
						type="password" placeholder="Новый пароль (оставьте пустым, чтобы не менять)" bind:value={editForm.password} />
					<input class="w-full p-2.5 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500"
						type="password" placeholder="Текущий пароль *" bind:value={editForm.current_password} required />
				</div>

				<div class="flex gap-3 justify-end pt-2">
					<button onclick={() => isEditing = false} class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
						Отмена
					</button>
					<button onclick={saveEdit} class="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors">
						Сохранить
					</button>
				</div>
			</div>
		{/if}

		<!-- Logout -->
		<div class="flex justify-end pt-4 border-t border-gray-200">
			<button onclick={logout} class="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium">
				Выйти
			</button>
		</div>
	</div>
</div>