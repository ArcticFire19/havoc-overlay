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


	function bluecolor3() {
		document.getElementById("blueTeamPicker").value =
			document.getElementById("blueTeamColor").value;
	}
	function orangecolor3() {
		document.getElementById("orangepicker2").value =
			document.getElementById("orng-color-2").value;
	}
	function bluecolortobox3() {
		document.getElementById("blueTeamColor").value =
			document.getElementById("blueTeamPicker").value;
	}
	function orangecolortobox3() {
		document.getElementById("orng-color-2").value =
			document.getElementById("orangepicker2").value;
	}


	function bluecolor4() {
		document.getElementById("bluePlayerPicker").value =
			document.getElementById("bluePlayerColor").value;
	}
	function orangecolor4() {
		document.getElementById("orangepicker2").value =
			document.getElementById("orng-color-2").value;
	}
	function bluecolortobox4() {
		document.getElementById("bluePlayerColor").value =
			document.getElementById("bluePlayerPicker").value;
	}
	function orangecolortobox4() {
		document.getElementById("orng-color-2").value =
			document.getElementById("orangepicker2").value;
	}


	function bluecolor5() {
		document.getElementById("blueFocsPicker").value =
			document.getElementById("blueFocsColor").value;
	}
	function orangecolor5() {
		document.getElementById("orangepicker2").value =
			document.getElementById("orng-color-2").value;
	}
	function bluecolortobox5() {
		document.getElementById("blueFocsColor").value =
			document.getElementById("blueFocsPicker").value;
	}
	function orangecolortobox5() {
		document.getElementById("orng-color-2").value =
			document.getElementById("orangepicker2").value;
	}
	function invertBG() {
		document.body.style.backgroundColor = document.body.style.backgroundColor == "rgb(24, 25, 26)" ? "white" : "rgb(24, 25, 26)"
		document.getElementById("bn-label").style.color = document.body.style.backgroundColor == "rgb(24, 25, 26)" ? "white" : "black"
		document.getElementById("sl-label").style.color = document.body.style.backgroundColor == "rgb(24, 25, 26)" ? "white" : "black"
		document.getElementById("on-label").style.color = document.body.style.backgroundColor == "rgb(24, 25, 26)" ? "white" : "black"
		document.getElementById("bw-label").style.color = document.body.style.backgroundColor == "rgb(24, 25, 26)" ? "white" : "black"
		document.getElementById("ow-label").style.color = document.body.style.backgroundColor == "rgb(24, 25, 26)" ? "white" : "black"
		document.getElementById("bc-label").style.color = document.body.style.backgroundColor == "rgb(24, 25, 26)" ? "white" : "black"
		document.getElementById("oc-label").style.color = document.body.style.backgroundColor == "rgb(24, 25, 26)" ? "white" : "black"
	}
</script>

<main>
	<button on:click="{invertBG}">Panel Dark Mode</button>
	<label id="sl-label" for="series-length">Choose a Series Length</label>

	<input list="series-length-list" name="series-length" id="series-length" />
	<datalist id="series-length-list">
		<option value="Best of 1">Best of 1</option>
		<option value="Best of 3">Best of 3</option>
		<option value="Best of 5">Best of 5</option>
		<option value="Best of 7">Best of 7</option>
	</datalist>
	<br /><br />
	<label id="bn-label" for="blue-name">Input blue name here</label>
	<input type="text" id="blue-name" name="blue-name" value="" />
	<label id="on-label" for="orng-name">Input orange name here</label>
	<input type="text" id="orng-name" name="orng-name" value="" />

	<br /><br />

	<div style="display: flex;">
		<div>
			<label id="bw-label" for="blueWins">Set wins for Blue (left)</label>
			<input
				type="number"
				id="blueWins"
				name="blueWins"
				min="0"
				max="4"
				value="0"
			/>
			<button style="width: 100px" class="bluebtn" on:click={() => blueUp()}>Blue Win</button>
		</div>
		<div style="padding-left: 20px;">
			<label id="ow-label" for="orngWins">Set wins for orange (right)</label>

			<input
				type="number"
				id="orngWins"
				name="orngWins"
				min="0"
				max="4"
				value="0"
			/>
			<button style="width: 100px" class="orngbtn" on:click={() => orngUp()}>Orange Win</button>
		</div>
	</div>
	<br /><br />
	<div id="colors" class="colors" style="display: flex;">
		<div>
			<label id="bc-label" for="blue-color">Input blue colors here</label>
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
			<br>
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
			<br>
			<label for="blueTeamColor">Blue Team Name Color</label>
			<input
				type="text"
				id="blueTeamColor"
				name="blueTeamColor"
				value="#ffffff"
				on:keyup={() => bluecolor3()}
			/>
			<input 
				type="color" 
				id="blueTeamPicker" 
				value="#ffffff" 
				on:change="{bluecolortobox3}"
			/>
			<br>
			<label for="bluePlayerColor">Blue PlayerName Color</label>
			<input
				type="text"
				id="bluePlayerColor"
				name="bluePlayerColor"
				value="#000000"
				on:keyup={() => bluecolor4()}
			/>
			<input 
				type="color" 
				id="bluePlayerPicker" 
				value="#000000" 
				on:change="{bluecolortobox4}"
			/>
			<br>
			<label for="blueFocsColor">Blue Focs Card Color</label>
			<input
				type="text"
				id="blueFocsColor"
				name="blueFocsColor"
				value="#ffffff"
				on:keyup={() => bluecolor5()}
			/>
			<input 
				type="color" 
				id="blueFocsPicker" 
				value="#ffffff" 
				on:change="{bluecolortobox5}"
			/>
		</div>
		<div style="padding-left: 20px;">
			<label id="oc-label" for="orng-color">Input orange colors here</label>
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
			<br>
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
	</div>

	<button id="update-btn" on:click={() => updateScreen()}>Update</button>
	<button id="reset-wins" on:click={() => resetWins()}>Reset Wins</button>
	<button id="reset-colors" on:click={() => resetColors()}
		>Reset Colors</button
	>
</main>

<style>
</style>
