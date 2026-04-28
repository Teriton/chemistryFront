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

<div class="flex flex-col items-center justify-center mx-auto my-20">
	<div class="flex flex-col items-center justify-center m-auto gap-4 px-6 py-8 rounded-2xl bg-gray-100 w-full max-w-sm">
		<h2 class="text-xl font-semibold text-gray-800 mb-2">Регистрация</h2>

		{#if error}
			<p class="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg w-full text-center">{error}</p>
		{/if}

		<input class="w-full p-2.5 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
			type="text" placeholder="Логин" bind:value={signUpData.username} />
		
		<input class="w-full p-2.5 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
			type="email" placeholder="Email" bind:value={signUpData.email} />
		
		<input class="w-full p-2.5 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
			type="password" placeholder="Пароль (мин. 8 символов)" bind:value={signUpData.password} />
		
		<input class="w-full p-2.5 rounded-xl border {signUpData.password !== confirmPassword && confirmPassword ? 'border-red-400' : 'border-green-300'} focus:outline-none focus:ring-2 focus:ring-green-400"
			type="password" placeholder="Повторите пароль" bind:value={confirmPassword} />

		<button class="bg-green-500 hover:bg-green-600 disabled:bg-green-300 font-medium py-2.5 px-6 rounded-xl w-full transition-colors"
			onclick={signUp}
			disabled={loading}>
			{loading ? "Загрузка..." : "Зарегистрироваться"}
		</button>

		<p class="text-sm text-gray-500 mt-2">
			Уже есть аккаунт? 
			<a href={resolve("/login")} class="text-blue-600 hover:underline font-medium">Войти</a>
		</p>
	</div>
</div>