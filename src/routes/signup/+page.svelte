<script lang="ts">
	import { AuthMngr } from "$lib/auth-mngr.js";
	import { logedIn } from "$lib/logedIn";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	const authMngr = new AuthMngr("localhost:8080");

	let signUpData = $state({ username: "", email: "", password: "" });
	let confirmPassword = $state("");
	let error = $state<string | null>(null);
	let loading = $state(false);

	const isValid = $derived.by((): boolean => {
		const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpData.email);
		const passOk = signUpData.password.length >= 8;
		const match = signUpData.password === confirmPassword;
		const userOk = signUpData.username.trim().length >= 3;
		return emailOk && passOk && match && userOk;
	});

	async function signUp() {
		if (!isValid) {
			error = "Проверьте корректность всех полей";
			return;
		}
		error = null;
		loading = true;
		try {
			const result = await authMngr.signup(signUpData);
			if (result.status == "Error") {
				error = result.body.error || "Ошибка регистрации";
				return;
			}
			$logedIn = true;
			await goto(resolve("/"));
		} catch (e) {
			error = "Ошибка сети или сервера " + e;
		} finally {
			loading = false;
		}
	}
</script>

<div class="mx-auto flex min-h-[calc(100vh-9rem)] w-full items-center justify-center px-4 py-10">
	<div class="w-full max-w-md rounded-3xl border border-emerald-100 bg-white/90 p-7 shadow-xl backdrop-blur">
		<div class="mb-6 text-center">
			<h2 class="text-2xl font-bold text-emerald-900">Регистрация</h2>
			<p class="mt-1 text-sm text-gray-500">Создайте профиль и отслеживайте свой прогресс</p>
		</div>

		{#if error}
			<p class="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg w-full text-center">{error}</p>
		{/if}

		<div class="space-y-3">
		<input class="w-full rounded-xl border border-emerald-200 bg-emerald-50/30 p-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300"
			type="text" placeholder="Логин" bind:value={signUpData.username} />
		
		<input class="w-full rounded-xl border border-emerald-200 bg-emerald-50/30 p-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300"
			type="email" placeholder="Email" bind:value={signUpData.email} />
		
		<input class="w-full rounded-xl border border-emerald-200 bg-emerald-50/30 p-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300"
			type="password" placeholder="Пароль (мин. 8 символов)" bind:value={signUpData.password} />
		
		<input class="w-full rounded-xl border {signUpData.password !== confirmPassword && confirmPassword ? 'border-red-400' : 'border-emerald-200'} bg-emerald-50/30 p-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300"
			type="password" placeholder="Повторите пароль" bind:value={confirmPassword} />
		</div>

		<button class="mt-5 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 p-3 font-semibold text-white transition hover:from-emerald-600 hover:to-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
			onclick={signUp}
			disabled={loading}>
			{loading ? "Загрузка..." : "Зарегистрироваться"}
		</button>

		<p class="mt-4 text-center text-sm text-gray-500">
			Уже есть аккаунт? 
			<a href={resolve("/login")} class="font-medium text-teal-700 hover:underline">Войти</a>
		</p>
	</div>
</div>