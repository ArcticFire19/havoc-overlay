<script>
	import { createPanelConnection } from "./socketio";
	import { updateScreen } from "./socketio";
	import { onMount } from "svelte";
	import { reset } from "./socketio";
	onMount(() => {
		createPanelConnection();
	});
	function blueUp() {
		if (document.getElementById("blueWins").value != 4) {
			document.getElementById("blueWins").value =
				parseInt(document.getElementById("blueWins").value) + 1;
		}
	}
	function orngUp() {
		if (document.getElementById("orngWins").value != 4) {
			document.getElementById("orngWins").value =
				parseInt(document.getElementById("orngWins").value) + 1;
		}
	}
	function resetWins() {
		document.getElementById("orngWins").value = 0;
		document.getElementById("blueWins").value = 0;
	}
	function resetColors() {
		document.getElementById("orng-color").value = "#dc1d26";
		document.getElementById("orng-color-2").value = "#852a2a";
		document.getElementById("blue-color").value = "#12b1d5";
		document.getElementById("blue-color-2").value = "#255aa7";
		document.getElementById("orangepicker").value = "#dc1d26";
		document.getElementById("orangepicker2").value = "#852a2a";
		document.getElementById("bluepicker").value = "#12b1d6";
		document.getElementById("bluepicker2").value = "#255aa7";
	}
	function bluecolor() {
		document.getElementById("bluepicker").value =
			document.getElementById("blue-color").value;
	}
	function orangecolor() {
		document.getElementById("orangepicker").value =
			document.getElementById("orng-color").value;
	}
	function bluecolortobox() {
		document.getElementById("blue-color").value =
			document.getElementById("bluepicker").value;
	}
	function orangecolortobox() {
		document.getElementById("orng-color").value =
			document.getElementById("orangepicker").value;
	}
	function bluecolor2() {
		document.getElementById("bluepicker2").value =
			document.getElementById("blue-color-2").value;
	}
	function orangecolor2() {
		document.getElementById("orangepicker2").value =
			document.getElementById("orng-color-2").value;
	}
	function bluecolortobox2() {
		document.getElementById("blue-color-2").value =
			document.getElementById("bluepicker2").value;
	}
	function orangecolortobox2() {
		document.getElementById("orng-color-2").value =
			document.getElementById("orangepicker2").value;
	}
</script>

<main>
	<label for="series-length">Choose a Series Length</label>

	<select name="series-length" id="series-length">
		<option value="Best of 1">Best of 1</option>
		<option value="Best of 3">Best of 3</option>
		<option value="Best of 5">Best of 5</option>
		<option value="Best of 7">Best of 7</option>
	</select>
	<br /><br />
	<label for="blue-name">Input blue name here</label>
	<input type="text" id="blue-name" name="blue-name" value="" />
	<label for="orng-name">Input orange name here</label>
	<input type="text" id="orng-name" name="orng-name" value="" />

	<br /><br />

	<label for="blueWins">Set wins for Blue (left)</label>

	<input
		type="number"
		id="blueWins"
		name="blueWins"
		min="0"
		max="4"
		value="0"
	/>
	<button class="bluebtn" on:click={() => blueUp()}>Blue Win</button>
	<br /><br />

	<label for="orngWins">Set wins for orange (right)</label>

	<input
		type="number"
		id="orngWins"
		name="orngWins"
		min="0"
		max="4"
		value="0"
	/>
	<button class="orngbtn" on:click={() => orngUp()}>Orange Win</button>
	<br /><br />
	<div id="colors" class="colors">
		<label for="blue-color">Input blue colors here</label>
		<input
			type="text"
			id="blue-color"
			name="blue-color"
			value="#12b1d5"
			on:keyup={() => bluecolor()}
		/>
		<input
			type="color"
			id="bluepicker"
			value="#12b1d5"
			on:change={() => bluecolortobox()}
			style="width: 200; height: 200;"
		/>
		<input
			type="text"
			id="blue-color-2"
			name="blue-color-2"
			value="#255aa7"
			on:keyup={() => bluecolor2()}
		/>
		<input
			type="color"
			id="bluepicker2"
			value="#255aa7"
			on:change={() => bluecolortobox2()}
			style="width: 200; height: 200;"
		/>
		<label for="orng-color">Input orange colors here</label>
		<input
			type="text"
			id="orng-color"
			name="orng-color"
			value="#dc1d26"
			on:keyup={() => orangecolor()}
		/>
		<input
			type="color"
			id="orangepicker"
			value="#dc1d26"
			on:change={() => orangecolortobox()}
			style="width: 200; height: 200;"
		/>
		<input
			type="text"
			id="orng-color-2"
			name="orng-color-2"
			value="#852a2a"
			on:keyup={() => orangecolor2()}
		/>
		<input
			type="color"
			id="orangepicker2"
			value="#852a2a"
			on:change={() => orangecolortobox2()}
			style="width: 200; height: 200;"
		/>
	</div>

	<button id="update-btn" on:click={() => updateScreen()}>Update</button>
	<button id="reset-wins" on:click={() => resetWins()}>Reset Wins</button>
	<button id="reset-colors" on:click={() => resetColors()}
		>Reset Colors</button
	>
	<br />
	<br />
	<br />
	<br />
	<br />
	<label for="reset-overlay"
		>Instantly resets all font sizes and text contents. Use if there is a
		sizing error or if something would stop working</label
	>
	<button id="reset-overlay" on:click={() => reset()}>Reset Overlay</button>
</main>

<style>
</style>
