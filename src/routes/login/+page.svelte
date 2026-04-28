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

<div class="flex flex-col items-center justify-center mx-auto my-20">
    <div class="flex flex-col items-center justify-center m-auto gap-5 px-5 py-10 rounded-xl  bg-gray-100">
		<h2 class="text-xl font-semibold text-gray-800 mb-2">Вход</h2>
        {#if error}
			<p class="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg w-full text-center">{error}</p>
		{/if}


        <input class="p-2 rounded-2xl  border-green-300 border-2" 
            type="text" 
            name="login"
            placeholder="Логин"
            bind:value={loginData.login}/>
        <input class="p-2 rounded-2xl  border-green-300 border-2" 
            type="password" 
            name="password" 
            placeholder="Пароль"
            bind:value={loginData.password}/>
        <button class="bg-green-300 p-2 rounded-xl w-20" onclick={() =>{Login(loginData)}}
            disabled={loading}>
			{loading ? "Загрузка..." : "Войти"}
        </button>
        <p class="text-sm text-gray-500 mt-2">
			Нет аккаунта?
			<a href={resolve("/signup")} class="text-blue-600 hover:underline font-medium">Зарегестрироваться</a>
		</p>
    </div>
</div>
