<script lang="ts">
	import { AuthMngr } from "$lib/auth-mngr";
	import type { AddUser } from "$lib/models/user";

    const authMngr = new AuthMngr("localhost:8080")

    let newUser: AddUser = $state({
        username: "",
        password: "",
        email: ""
    })

    function Signup(newUser: AddUser) {
        authMngr.signup(newUser);
    }

</script>
<div>
        <input type="text" name="username" bind:value={newUser.username}/>
        <input type="email" name="username" bind:value={newUser.email}/>
        <input type="password" name="password" bind:value={newUser.password}/>
        <button onclick={() =>{Signup(newUser)}}>Signup</button>
</div>

