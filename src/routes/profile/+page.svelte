<script lang="ts">
	import type { User } from "$lib/models/user";


let testUser: User= {
    username: "Tester",
    email: "Testing@sosal.com",
    password: "1234",
    id: 1,
    xp: 100
    
}

</script>

<div class="flex justify-center">
    <div class=" px-10 w-full grid  m-2 grid-cols-2 p-2 bg-(--sec-col) rounded-2xl shadow-2xl md:w-2/3">
        <div class="">
            <h1 class=" text-2xl font-bold">{testUser.username}</h1>
            <h2 class="text-xl"><span class="font-semibold">Email:</span> {testUser.email}</h2>
            <h2 class="text-xl"><span class="font-semibold">Опыт:</span> {testUser.xp} xp.</h2>
        </div>
        <div class=" flex justify-end w-full ">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button>
                <i class="fa-solid fa-pen"></i>
            </button> 
        </div>
        <div class="flex justify-end mt-10 col-span-2">
            <button>Выйти</button>
        </div>
    </div>
</div>