<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { AuthMngr, type LoginDataRequst } from "$lib/auth-mngr.js";
	import { logedIn } from "$lib/logedIn";


    const authMngr = new AuthMngr("localhost:8080")

    let loginData: LoginDataRequst = $state({
        login: "",
        password: ""
    });
    let error = $state<string | null>(null);
	let loading = $state(false);


    async function Login(data: LoginDataRequst){
        error = null;
		loading = true;
		try {
			const result = await authMngr.login(data);
			if (result.status == "Error") {
				error = result.body.error || "Ошибка входа";
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
			<h2 class="text-2xl font-bold text-emerald-900">Вход в аккаунт</h2>
		</div>
        {#if error}
			<p class="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg w-full text-center">{error}</p>
		{/if}


		<div class="mt-4 space-y-3">
        <input class="w-full rounded-xl border border-emerald-200 bg-emerald-50/30 p-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300" 
            type="text" 
            name="login"
            placeholder="Логин"
            bind:value={loginData.login}/>
        <input class="w-full rounded-xl border border-emerald-200 bg-emerald-50/30 p-3 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300" 
            type="password" 
            name="password" 
            placeholder="Пароль"
            bind:value={loginData.password}/>
		</div>
        <button class="mt-5 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 p-3 font-semibold text-white transition hover:from-emerald-600 hover:to-teal-600 disabled:cursor-not-allowed disabled:opacity-70" onclick={() =>{Login(loginData)}}
            disabled={loading}>
			{loading ? "Загрузка..." : "Войти"}
        </button>
        <p class="mt-4 text-center text-sm text-gray-500">
			Нет аккаунта?
			<a href={resolve("/signup")} class="font-medium text-teal-700 hover:underline"> Зарегистрироваться</a>
		</p>
    </div>
</div>
