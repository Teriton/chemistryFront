<script lang="ts">
	import { AuthMngr, type LoginDataRequst } from "$lib/auth-mngr.js";
	import { logedIn } from "$lib/logedIn";


    const authMngr = new AuthMngr("localhost:8080")

    let loginData: LoginDataRequst = {
        login: "",
        password: ""
    }

    function Login(data: LoginDataRequst){
        $logedIn = true;
        authMngr.login(data)
    }

</script>

<div class="flex flex-col items-center justify-center mx-auto my-20">
    <div class="flex flex-col items-center justify-center m-auto gap-5 px-5 py-10 rounded-xl  bg-gray-100">
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
        <button class="bg-green-300 p-2 rounded-xl w-20" onclick={() =>{Login(loginData)}}>Войти</button>

    </div>
</div>
