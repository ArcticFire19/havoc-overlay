<script>
	import { createPanelConnection } from "./socketio";
	import { updateScreen } from "./socketio";
	import { onMount } from "svelte";
	import { reset, toggleCam, playersList } from "./socketio";
	onMount(() => {
		createPanelConnection();
		invertBG();
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

		document.getElementById("orngOverride").value = "";
		document.getElementById("blueOverride").value = "";
		document.getElementById("orngOverridePicker").value = "";
		document.getElementById("blueOverridePicker").value = "";
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
		document.getElementById("blueOverridePicker").value =
			document.getElementById("blueOverride").value;
	}
	function orangecolor3() {
		document.getElementById("orngOverridePicker").value =
			document.getElementById("orngOverride").value;
	}
	function bluecolortobox3() {
		document.getElementById("blueOverride").value =
			document.getElementById("blueOverridePicker").value;
	}
	function orangecolortobox3() {
		document.getElementById("orngOverride").value =
			document.getElementById("orngOverridePicker").value;
	}

	function invertBG() {
		document.body.style.backgroundColor =
			document.body.style.backgroundColor == "rgb(24, 25, 26)"
				? "white"
				: "rgb(24, 25, 26)";
		document.getElementById("bn-label").style.color =
			document.body.style.backgroundColor == "rgb(24, 25, 26)"
				? "white"
				: "black";
		document.getElementById("sl-label").style.color =
			document.body.style.backgroundColor == "rgb(24, 25, 26)"
				? "white"
				: "black";
		document.getElementById("on-label").style.color =
			document.body.style.backgroundColor == "rgb(24, 25, 26)"
				? "white"
				: "black";
		document.getElementById("bw-label").style.color =
			document.body.style.backgroundColor == "rgb(24, 25, 26)"
				? "white"
				: "black";
		document.getElementById("ow-label").style.color =
			document.body.style.backgroundColor == "rgb(24, 25, 26)"
				? "white"
				: "black";
		document.getElementById("bc-label").style.color =
			document.body.style.backgroundColor == "rgb(24, 25, 26)"
				? "white"
				: "black";
		document.getElementById("oc-label").style.color =
			document.body.style.backgroundColor == "rgb(24, 25, 26)"
				? "white"
				: "black";
		document.getElementById("bv-label").style.color =
			document.body.style.backgroundColor == "rgb(24, 25, 26)"
				? "white"
				: "black";
		document.getElementById("blue-url-label").style.color =
			document.body.style.backgroundColor == "rgb(24, 25, 26)"
				? "white"
				: "black";
		document.getElementById("ov-label").style.color =
			document.body.style.backgroundColor == "rgb(24, 25, 26)"
				? "white"
				: "black";
		document.getElementById("orng-url-label").style.color =
			document.body.style.backgroundColor == "rgb(24, 25, 26)"
				? "white"
				: "black";
		document.getElementById("blue-names").style.color =
			document.body.style.backgroundColor == "rgb(24, 25, 26)"
				? "white"
				: "black";
		document.getElementById("orng-names").style.color =
			document.body.style.backgroundColor == "rgb(24, 25, 26)"
				? "white"
				: "black";

		document.getElementById("orng-names").style.borderLeft =
			document.body.style.backgroundColor == "rgb(24, 25, 26)"
				? "2px solid white"
				: "2px solid black";
	}

	let getSelectedCameras = () => {
		toggleCam(
			document.getElementById("orng-cb-1").checked
				? document.getElementById("orng1-url")
				: null,
			document.getElementById("orng-cb-2").checked
				? document.getElementById("orng2-url")
				: null,
			document.getElementById("orng-cb-3").checked
				? document.getElementById("orng3-url")
				: null,
			document.getElementById("orng-cb-4").checked
				? document.getElementById("orng4-url")
				: null,
			document.getElementById("blue-cb-1").checked
				? document.getElementById("blue1-url")
				: null,
			document.getElementById("blue-cb-2").checked
				? document.getElementById("blue2-url")
				: null,
			document.getElementById("blue-cb-3").checked
				? document.getElementById("blue3-url")
				: null,
			document.getElementById("blue-cb-4").checked
				? document.getElementById("blue4-url")
				: null
		);
	};

	let orngToggle = () => {
		if (
			document.getElementById("orng-cb-1").checked &&
			document.getElementById("orng-cb-2").checked &&
			document.getElementById("orng-cb-3").checked &&
			document.getElementById("orng-cb-4").checked
		) {
			document.getElementById("orng-cb-1").checked = false;
			document.getElementById("orng-cb-2").checked = false;
			document.getElementById("orng-cb-3").checked = false;
			document.getElementById("orng-cb-4").checked = false;
		} else {
			document.getElementById("orng-cb-1").checked = true;
			document.getElementById("orng-cb-2").checked = true;
			document.getElementById("orng-cb-3").checked = true;
			document.getElementById("orng-cb-4").checked = true;
		}
	};

	let blueToggle = () => {
		if (
			document.getElementById("blue-cb-1").checked &&
			document.getElementById("blue-cb-2").checked &&
			document.getElementById("blue-cb-3").checked &&
			document.getElementById("blue-cb-4").checked
		) {
			document.getElementById("blue-cb-1").checked = false;
			document.getElementById("blue-cb-2").checked = false;
			document.getElementById("blue-cb-3").checked = false;
			document.getElementById("blue-cb-4").checked = false;
		} else {
			document.getElementById("blue-cb-1").checked = true;
			document.getElementById("blue-cb-2").checked = true;
			document.getElementById("blue-cb-3").checked = true;
			document.getElementById("blue-cb-4").checked = true;
		}
	};
</script>

<main>
	<img src="favicon.png" alt="" width="200" style="padding-left: 80px;" />
	<br />
	<button on:click={invertBG}>Panel Dark Mode</button>
	<div style="display: flex;">
		<div>
			<label id="sl-label" for="series-length"
				>Choose a Series Length</label
			>

			<input
				list="series-length-list"
				name="series-length"
				id="series-length"
			/>
			<datalist id="series-length-list">
				<option value="Best of 1">Best of 1</option>
				<option value="Best of 3">Best of 3</option>
				<option value="Best of 5">Best of 5</option>
				<option value="Best of 7">Best of 7</option>
			</datalist>
			<br /><br />
			<div style="display: flex;">
				<div>
					<label id="bn-label" for="blue-name"
						>Input blue name here</label
					>
					<input
						type="text"
						id="blue-name"
						name="blue-name"
						value=""
					/>
				</div>
				<div style="padding-left: 20px">
					<label id="on-label" for="orng-name"
						>Input orange name here</label
					>
					<input
						type="text"
						id="orng-name"
						name="orng-name"
						value=""
					/>
				</div>
			</div>
			<br /><br />

			<div style="display: flex;">
				<div>
					<label id="bw-label" for="blueWins"
						>Set wins for Blue (left)</label
					>
					<input
						type="number"
						id="blueWins"
						name="blueWins"
						min="0"
						max="4"
						value="0"
						style="width: 90px;"
					/>
					<button
						style="width: 100px"
						class="bluebtn"
						on:click={() => blueUp()}>Blue Win</button
					>
				</div>
				<div style="padding-left: 20px;">
					<label id="ow-label" for="orngWins"
						>Set wins for orange (right)</label
					>

					<input
						type="number"
						id="orngWins"
						name="orngWins"
						min="0"
						max="4"
						value="0"
						style="width: 90px;"
					/>
					<button
						style="width: 100px"
						class="orngbtn"
						on:click={() => orngUp()}>Orange Win</button
					>
				</div>
			</div>
			<br /><br />
			<div id="colors" class="colors" style="display: flex;">
				<div>
					<label id="bc-label" for="blue-color"
						>Input blue colors here</label
					>
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
					<br />
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
					<br />
					<label id="bv-label" for="blueOverride"
						>Blue Color Override</label
					>
					<input
						type="text"
						id="blueOverride"
						name="blueOverride"
						value=""
						on:keyup={() => bluecolor3()}
					/>
					<input
						type="color"
						id="blueOverridePicker"
						value=""
						on:change={bluecolortobox3}
					/>
				</div>
				<div style="padding-left: 20px;">
					<label id="oc-label" for="orng-color"
						>Input orange colors here</label
					>
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
					<br />
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
					<br />
					<label id="ov-label" for="orngOverride"
						>Orange Color Override</label
					>
					<input
						type="text"
						id="orngOverride"
						name="orngOverride"
						value=""
						on:keyup={() => orangecolor3()}
					/>
					<input
						type="color"
						id="orngOverridePicker"
						value=""
						on:change={orangecolortobox3}
					/>
				</div>
			</div>
		</div>
		<div style="padding-left: 20px; display: flex;">
			<div id="blue-names" style="color: white;">
				Blue Player Names
				<div id="blue-name1" style="font-size: 30px;">
					{$playersList["blue1"]}
				</div>
				<div id="blue-name2" style="font-size: 30px; padding-top: 7px">
					{$playersList["blue2"]}
				</div>
				<div id="blue-name3" style="font-size: 30px; padding-top: 7px">
					{$playersList["blue3"]}
				</div>
				<div id="blue-name4" style="font-size: 30px; padding-top: 7px">
					{$playersList["blue4"]}
				</div>
			</div>
			<div id="blue-urls" style="padding-left: 15px;">
				<div id="blue-url-label" style="color: white;">
					Blue Webcam Urls
				</div>
				<input
					type="url"
					name=""
					id="blue1-url"
					style="height: 40px;"
				/>
				<br />
				<input
					type="url"
					name=""
					id="blue2-url"
					style="height: 40px;"
				/>
				<br />
				<input
					type="url"
					name=""
					id="blue3-url"
					style="height: 40px;"
				/>
				<br />
				<input
					type="url"
					name=""
					id="blue4-url"
					style="height: 40px;"
				/>
				<br />
				<button
					id="blue-toggle-all-urls"
					style="height: 40px"
					on:click={blueToggle}>Toggle All Blue Players</button
				>
				<br />
				<br />
				<button on:click={getSelectedCameras}>Update Cams</button>
			</div>
			<div id="blue-url-btns" style="padding-left: 15px;">
				<br />
				<input
					type="checkbox"
					name=""
					id="blue-cb-1"
					class="url-cb"
					style="margin-bottom: 30px; margin-top: 15px"
				/>
				<br />
				<input
					type="checkbox"
					name=""
					id="blue-cb-2"
					class="url-cb"
					style="margin-bottom: 30px;"
				/>
				<br />
				<input
					type="checkbox"
					name=""
					id="blue-cb-3"
					class="url-cb"
					style="margin-bottom: 30px;"
				/>
				<br />
				<input
					type="checkbox"
					name=""
					id="blue-cb-4"
					class="url-cb"
					style="margin-bottom: 30px;"
				/>
			</div>
			<div
				id="orng-names"
				style="color: white; margin-left: 10px; padding-left: 10px; border-left: 2px solid white; height: 255px"
			>
				Orange Player Names
				<div id="orng-name1" style="font-size: 30px;">
					{$playersList["orng1"]}
				</div>
				<div id="orng-name2" style="font-size: 30px; padding-top: 7px">
					{$playersList["orng2"]}
				</div>
				<div id="orng-name3" style="font-size: 30px; padding-top: 7px">
					{$playersList["orng3"]}
				</div>
				<div id="orng-name4" style="font-size: 30px; padding-top: 7px">
					{$playersList["orng4"]}
				</div>
			</div>
			<div id="orng-urls" style="padding-left: 30px;">
				<div id="orng-url-label" style="color: white;">
					Orange Webcam Urls
				</div>
				<input
					type="url"
					name=""
					id="orng1-url"
					style="height: 40px;"
				/>
				<br />
				<input
					type="url"
					name=""
					id="orng2-url"
					style="height: 40px;"
				/>
				<br />
				<input
					type="url"
					name=""
					id="orng3-url"
					style="height: 40px;"
				/>
				<br />
				<input
					type="url"
					name=""
					id="orng4-url"
					style="height: 40px;"
				/>
				<br />
				<button
					id="orng-toggle-all-urls"
					style="height: 40px"
					on:click={orngToggle}>Toggle All Orange Players</button
				>
			</div>
			<div id="orng-url-btns" style="padding-left: 15px;">
				<br />
				<input
					type="checkbox"
					name=""
					id="orng-cb-1"
					style="margin-bottom: 30px; margin-top: 15px;"
				/>
				<br />
				<input
					type="checkbox"
					name=""
					id="orng-cb-2"
					style="margin-bottom: 30px"
				/>
				<br />
				<input
					type="checkbox"
					name=""
					id="orng-cb-3"
					style="margin-bottom: 30px"
				/>
				<br />
				<input
					type="checkbox"
					name=""
					id="orng-cb-4"
					style="margin-bottom: 30px"
				/>
			</div>
		</div>
	</div>

	<button id="update-btn" on:click={() => updateScreen()}>Update</button>

	<button id="reset-wins" on:click={() => resetWins()}>Reset Wins</button>

	<button id="reset-colors" on:click={() => resetColors()}
		>Reset Colors</button
	>
</main>
