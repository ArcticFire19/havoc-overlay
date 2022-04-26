import socketIOClient from 'socket.io-client';

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
	if(update.event === "game:initialized" || update.event === "game:podium_start"){
		console.log(update);
		updateScreen()
	}
	})
}
export const updateScreen = () => {
	let data = {
		data:{
			event:"ctrl_update",
			contents:{
				seriesLength:document.getElementById("series-length").value,
				blueScore:document.getElementById("blueWins").value,
				orngScore:document.getElementById("orngWins").value,
				orngColor:document.getElementById("orng-color").value,
				blueColor:document.getElementById("blue-color").value,
				orngColor2:document.getElementById("orng-color-2").value,
				blueColor2:document.getElementById("blue-color-2").value,
				orngName:document.getElementById("orng-name").value,
				blueName:document.getElementById("blue-name").value,
				orngOverride:document.getElementById("orngOverride").value,
				blueOverride:document.getElementById("blueOverride").value,
			},
		},
	};
	//data = JSON.parse(data);
	console.log(data);
	socket.emit("payload", data);
}

export const reset = () => {
  let data = {
    data:{
      event:"reset-queue"
    }
  }
  console.log("reset")
  socket.emit("payload", data);
}

export const toggleCam = (...cameras) => {
	let output = []
	for (let x = 0; x < 8; x++){
		if(cameras[x] != null){
			if(cameras[x].value != ""){
				output.push([cameras[x].id, cameras[x].value]);
			}
		}
	}
	let data = {
		data:{
			event: "camera_toggle",
			contents:{
				cameras:output
			}
		}
	}
	console.log(data.data.event, "\n", data.data.contents.cameras);
	socket.emit("payload", data);
}