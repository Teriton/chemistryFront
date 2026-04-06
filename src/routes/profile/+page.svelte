<script lang="ts">
	import { goto } from "$app/navigation";
	import { AuthMngr } from "$lib/auth-mngr";
	import { logedIn } from "$lib/logedIn";
	import type { User } from "$lib/models/user";
	import { UserMngr } from "$lib/user-mngr";
	import { resolve } from '$app/paths';
	import { onMount } from "svelte";

    const authMngr = new AuthMngr("localhost:8080")
    const userMngr = new UserMngr("localhost:8080")

    onMount(async ()=>{
        user = await userMngr.getUser();
    });
    
    let user: User= {
        username: "Loading...",
        email: "",
        password: "",
        id: 0,
        xp: 0, 
    };

    async function logout(){
        const jsonResponse = await authMngr.logout()
        if (jsonResponse.status == "ok") {
            $logedIn = false;
            goto(resolve("/"))

        }
    }

</script>

<div class="flex justify-center">
    <div class=" px-10 w-full grid  m-2 grid-cols-2 p-2 bg-(--sec-col) rounded-2xl shadow-2xl md:w-2/3">
        <div class="">
            <h1 class=" text-2xl font-bold">{user.username}</h1>
            <h2 class="text-xl"><span class="font-semibold">Email:</span> {user.email}</h2>
            <h2 class="text-xl"><span class="font-semibold">Опыт:</span> {user.xp} xp.</h2>
        </div>
        <div class=" flex justify-end w-full ">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button>
                <i class="fa-solid fa-pen"></i>
            </button> 
        </div>
        <div class="flex justify-end mt-10 col-span-2">
            <button onclick={logout}>Выйти</button>
        </div>
    </div>
</div>