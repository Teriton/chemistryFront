<script lang="ts">
	import { AuthMngr, type LoginDataRequst } from "$lib/auth-mngr.js";


    const authMngr = new AuthMngr("localhost:8080")

    let loginData: LoginDataRequst = {
        login: "",
        password: ""
    }

    function Login(data: LoginDataRequst){
        authMngr.login(data)
    }

</script>
<div>
        <input type="text" name="login" bind:value={loginData.login}/>
        <input type="password" name="password" bind:value={loginData.password}/>
        <button onclick={() =>{Login(loginData)}}>Login</button>
</div>
