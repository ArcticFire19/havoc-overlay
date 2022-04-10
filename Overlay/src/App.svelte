<script>
	import { onMount } from "svelte";
	import { createSocketConnection } from "./socketio.js";
	import Scorebug from "./scorebug.svelte";
	import Focscard from "./focscard.svelte";
	import Replaycard from "./replaycard.svelte"
	import Playercards from "./playercards.svelte"
	import Stinger from "./stinger.svelte";
	onMount(() => {
		createSocketConnection();
	});
</script>

<!-- export let <prop name> to use with props in main.js. add to script-->
<main>
	<Stinger />
	<Scorebug />
	<Focscard />
	<Replaycard />
	<Playercards />
</main>

<style>
</style>
