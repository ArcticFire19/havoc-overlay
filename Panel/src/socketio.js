import socketIOClient from 'socket.io-client';
import { writable } from "svelte/store"

let defaultPlayers = {
	blue1: "",
	blue2: "",
	blue3: "",
	blue4: "",
	orng1: "",
	orng2: "",
	orng3: "",
	orng4: "",
}
export let playersList = writable(defaultPlayers)

let socket;
export const createPanelConnection = () => {
	socket = socketIOClient('localhost:6969', {
		withCredentials: true,
	});
	socket.on("connect", () => {
		socket.emit("Control Panel Connected");
		socket.emit('watchGame');
	});
	socket.on('update', (update) => {
		console.log(update);
		if (update.event === "game:initialized" || update.event === "game:podium_start") {
			console.log(update);
			updateScreen()
		}
		if(update.event === 'game:update_state'){
			let players = update.data.players;
            let orangePlayers = [];
            let bluePlayers = [];

            Object.keys(players).map(id => {
                if (players[id].team === 1) {
                    orangePlayers.push(players[id]);
                } else if (players[id].team === 0) {
                    bluePlayers.push(players[id]);
                }
            })
            for (var x in orangePlayers) {
                if (orangePlayers[x].name.length > 16) {
                    let shorten = orangePlayers[x].name.split("").slice(0, 15)
                    shorten.push("...")

                    orangePlayers[x].name = shorten.join('')
                }
            }
            for (var x in bluePlayers) {
                if (bluePlayers[x].name.length > 16) {
                    let shorten = bluePlayers[x].name.split("").slice(0, 15)
                    shorten.push("...")

                    bluePlayers[x].name = shorten.join('')
                }
            }

            let playerSort = (a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase());

            bluePlayers.sort(playerSort)
            orangePlayers.sort(playerSort)

			let output = {
				blue1: "",
				blue2: "",
				blue3: "",
				blue4: "",
				orng1: "",
				orng2: "",
				orng3: "",
				orng4: "",
			}

			for(let x in bluePlayers){
				output[`blue${parseInt(x)+1}`] = bluePlayers[x].name
			}
			for(let y in orangePlayers){
				output[`orng${parseInt(y)+1}`] = orangePlayers[y].name
			}
			playersList.set(output)
		}
	})
}
export const updateScreen = () => {
	let data = {
		data: {
			event: "ctrl_update",
			contents: {
				seriesLength: document.getElementById("series-length").value,
				blueScore: document.getElementById("blueWins").value,
				orngScore: document.getElementById("orngWins").value,
				orngColor: document.getElementById("orng-color").value,
				blueColor: document.getElementById("blue-color").value,
				orngColor2: document.getElementById("orng-color-2").value,
				blueColor2: document.getElementById("blue-color-2").value,
				orngName: document.getElementById("orng-name").value,
				blueName: document.getElementById("blue-name").value,
				orngOverride: document.getElementById("orngOverride").value,
				blueOverride: document.getElementById("blueOverride").value,
			},
		},
	};
	//data = JSON.parse(data);
	console.log(data);
	socket.emit("payload", data);
}

export const reset = () => {
	let data = {
		data: {
			event: "reset-queue"
		}
	}
	console.log("reset")
	socket.emit("payload", data);
}

export const toggleCam = (...cameras) => {
	console.log(cameras);
	let output = []
	for (let x = 0; x < 8; x++) {
		if (cameras[x] != null) {
			if (cameras[x].value != "") {
				output.push([cameras[x].id, cameras[x].value]);
			}
		}
	}
	let data = {
		data: {
			event: "camera_toggle",
			contents: {
				cameras: output
			}
		}
	}
	console.log(data.data.event, "\n", data.data.contents.cameras);
	socket.emit("payload", data);
}