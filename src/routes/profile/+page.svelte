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
        user.creation_date = new Date(user.creation_date)
    });
    
    let user: User= {
        username: "Loading...",
        email: "",
        password: "",
        id: 0,
        xp: 0, 
        streak: 0,
        creation_date: new Date()
    };

    async function logout(){
        const jsonResponse = await authMngr.logout()
        if (jsonResponse.status == "ok") {
            $logedIn = false;
            goto(resolve("/"))

        }
    }

    function formatDate(date: Date): string {
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
</script>

<div class="flex justify-center">
    <div class=" px-10 w-full grid  m-2 p-2 bg-(--sec-col) rounded-2xl shadow-2xl md:w-2/3">
        <div class="grid grid-cols-1 gap-10">
            <div class="flex gap-5">
                <div class="w-20 h-20 bg-gray-400 rounded-full"></div>
                <div class="flex-raw">
                    <h1 class=" text-2xl font-bold">{user.username}</h1>
                    <h2 class="text-xl"><span class="font-semibold">Email:</span> {user.email}</h2>
                        <h2 class="text-xl"><span class="font-semibold">Создан:</span> создан {formatDate(user.creation_date)}</h2>
                </div>
            </div>
            <div class="grid grid-cols-3">
                <div class="grid grid-cols-1 border p-4 rounded-3xl mx-5 align-middle">
                    <h1 class="text-2xl">{user.xp}</h1>
                    <h2 class="">Очков опыта</h2>
                </div>
                <div class="grid grid-cols-1 border p-4 rounded-3xl mx-5 align-middle">
                    <h1 class="text-2xl">{user.streak}</h1>
                    <h2 class="">Вы учились дней подряд</h2>
                </div>
            </div>
        </div>
        <div class=" flex justify-end w-10">
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