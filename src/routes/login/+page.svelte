<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { AuthMngr, type LoginDataRequst } from '$lib/auth-mngr.js';
	import { logedIn } from '$lib/logedIn';
	import type { AddUser } from '$lib/models/user';

	const authMngr = new AuthMngr('localhost:8080');

	let mode = $state<'login' | 'signup'>('login');

	let loginData: LoginDataRequst = $state({ login: '', password: '' });
	let signUpData = $state<AddUser>({ username: '', email: '', password: '' });
	let confirmPassword = $state('');

	let error = $state<string | null>(null);
	let loading = $state(false);

	const isSignupValid = $derived.by((): boolean => {
		const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpData.email);
		const passOk = signUpData.password.length >= 8;
		const match = signUpData.password === confirmPassword;
		const userOk = signUpData.username.trim().length >= 3;
		return emailOk && passOk && match && userOk;
	});

	$effect(() => {
		const m = page.url.searchParams.get('mode');
		mode = m === 'signup' ? 'signup' : 'login';
	});

	function setMode(next: 'login' | 'signup') {
		mode = next;
		error = null;
		const url = new URL(page.url);
		if (next === 'signup') {
			url.searchParams.set('mode', 'signup');
		} else {
			url.searchParams.delete('mode');
		}
		goto(`${url.pathname}${url.search}`, { replaceState: true, noScroll: true });
	}

	async function login() {
		error = null;
		loading = true;
		try {
			const result = await authMngr.login(loginData);
			if (result.status == 'Error') {
				error = result.body.error || 'Ошибка входа';
				return;
			}
			$logedIn = true;
			await goto(resolve('/'));
		} catch (e) {
			error = 'Ошибка сети или сервера ' + e;
		} finally {
			loading = false;
		}
	}

	async function signUp() {
		if (!isSignupValid) {
			error = 'Проверьте корректность всех полей';
			return;
		}
		error = null;
		loading = true;
		try {
			const result = await authMngr.signup(signUpData);
			if (result.status == 'Error') {
				error = result.body.error || 'Ошибка регистрации';
				return;
			}
			$logedIn = true;
			await goto(resolve('/'));
		} catch (e) {
			error = 'Ошибка сети или сервера ' + e;
		} finally {
			loading = false;
		}
	}
</script>

<div class="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-12">
	<div class="mb-8 text-center">
		<div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
			<i class="fas fa-flask text-2xl text-emerald-200"></i>
		</div>
		<h1 class="text-3xl font-bold text-white">chemicals</h1>
		<p class="mt-2 text-sm text-emerald-100/90">Войдите или создайте аккаунт, чтобы начать</p>
	</div>

	<div class="rounded-3xl border border-white/10 bg-white/95 p-7 shadow-2xl backdrop-blur">
		<div class="mb-6 flex rounded-2xl bg-emerald-50/80 p-1">
			<button
				type="button"
				class="flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors {mode === 'login'
					? 'bg-white text-emerald-900 shadow-sm'
					: 'text-emerald-800/70 hover:text-emerald-900'}"
				onclick={() => setMode('login')}
			>
				Вход
			</button>
			<button
				type="button"
				class="flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors {mode === 'signup'
					? 'bg-white text-emerald-900 shadow-sm'
					: 'text-emerald-800/70 hover:text-emerald-900'}"
				onclick={() => setMode('signup')}
			>
				Регистрация
			</button>
		</div>

		{#if error}
			<p class="mb-4 rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-600">{error}</p>
		{/if}

		{#if mode === 'login'}
			<div class="space-y-3">
				<input
					class="w-full rounded-xl border border-emerald-200 bg-emerald-50/30 p-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300"
					type="text"
					name="login"
					placeholder="Логин"
					bind:value={loginData.login}
				/>
				<input
					class="w-full rounded-xl border border-emerald-200 bg-emerald-50/30 p-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300"
					type="password"
					name="password"
					placeholder="Пароль"
					bind:value={loginData.password}
				/>
			</div>
			<button
				class="mt-5 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 p-3 font-semibold text-white transition hover:from-emerald-600 hover:to-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
				onclick={() => login()}
				disabled={loading}
			>
				{loading ? 'Загрузка...' : 'Войти'}
			</button>
		{:else}
			<div class="space-y-3">
				<input
					class="w-full rounded-xl border border-emerald-200 bg-emerald-50/30 p-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300"
					type="text"
					placeholder="Логин"
					bind:value={signUpData.username}
				/>
				<input
					class="w-full rounded-xl border border-emerald-200 bg-emerald-50/30 p-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300"
					type="email"
					placeholder="Email"
					bind:value={signUpData.email}
				/>
				<input
					class="w-full rounded-xl border border-emerald-200 bg-emerald-50/30 p-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300"
					type="password"
					placeholder="Пароль (мин. 8 символов)"
					bind:value={signUpData.password}
				/>
				<input
					class="w-full rounded-xl border p-3 outline-none transition focus:ring-2 focus:ring-emerald-300 {signUpData.password !==
						confirmPassword && confirmPassword
						? 'border-red-400'
						: 'border-emerald-200'} bg-emerald-50/30 focus:border-emerald-400"
					type="password"
					placeholder="Повторите пароль"
					bind:value={confirmPassword}
				/>
			</div>
			<button
				class="mt-5 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 p-3 font-semibold text-white transition hover:from-emerald-600 hover:to-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
				onclick={signUp}
				disabled={loading}
			>
				{loading ? 'Загрузка...' : 'Зарегистрироваться'}
			</button>
		{/if}
	</div>
</div>

<style>
	input {
		color: #1f2937;
	}
	input::placeholder {
		color: #6b7280;
		opacity: 1;
	}
</style>
