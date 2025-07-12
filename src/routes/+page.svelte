<script>
    import {fade} from "svelte/transition";

    let gavinFoxStatus = $state("Dumb")
</script>

<main class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center p-8">
    <div class="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Status Demo</h1>

        <div class="mb-8" in:fade>
            {#if gavinFoxStatus === "Gay" || gavinFoxStatus === "Dumb"}
                <p transition:fade class="text-4xl font-semibold text-indigo-600 absolute mt-[-30px] right-0 left-0">
                    Gavin is {gavinFoxStatus}
                </p>
            {:else}
                <p transition:fade class="text-4xl font-semibold text-indigo-600 absolute mt-[-30px] right-0 left-0">
                    Gavin is a {gavinFoxStatus}
                </p>
            {/if}
        </div>

        <div class="space-y-2">
            <label for="status" class="block text-sm font-medium text-gray-700">
                Select Status:
            </label>
            <select
                    name="status"
                    id="status"
                    class="w-full text-lg py-3 px-4 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors duration-200 bg-white"
                    bind:value={gavinFoxStatus}
            >
                <option value="Dumb" selected>Dumb</option>
                <option value="Retard">Retard</option>
                <option value="Gay">Gay</option>
                <option value="Awesome" disabled>Awesome</option>
            </select>
        </div>

        <div class="mt-6 text-xs text-gray-500">
            GNU Public License - Version 3.0 Gavin Fox Selector
        </div>
    </div>
</main>