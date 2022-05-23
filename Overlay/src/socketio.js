import socketIOClient from 'socket.io-client';
import {
    writable
} from 'svelte/store';
export const data = writable(null);
let defaultPanelData = {
    series: "Best of",
    round: "Winners Round 1",
    orngColor: "#dc1d26",
    blueColor: "#12b1d5",
    orngColor2: "#852a2a",
    blueColor2: "#255aa7",
    orngName: "Orange",
    blueName: "Blue",
    orngOverride: "",
    blueOverride: "",
}
let defaultCams = {
    blue1: "",
    blue2: "",
    blue3: "",
    blue4: "",
    orng1: "",
    orng2: "",
    orng3: "",
    orng4: "",
}
export const isReplay = writable(false);
export const isInGame = writable(false);
export const stingerBool = writable(false);
export const camloaderstore = writable([[-1,-1,-1,-1],[-1,-1,-1,-1]]);
export let goalData = writable(null);
export const panelData = writable(defaultPanelData);
export const camData = writable(defaultCams);
export var reset = false;

export const createSocketConnection = () => {
    let isHudVisible = true;
    // instantiate socketIOClient connection to localhost
    const socket = socketIOClient('localhost:6969', {
        withCredentials: true,
    });

    socket.on('connect', () => {
        // emit join message to socket with client ID
        socket.emit('join', 'FRONTEND');
        /* emit watchGame message to socket, required for backend server to
        create and destroy stream on per client ID basis */
        socket.emit('watchGame');
    });

    socket.on('payload', (payload) => {
        //panel data
        if (payload.data.event === "ctrl_update") {
            let series = payload.data.contents.seriesLength;
            let blueScore = payload.data.contents.blueScore;
            let orngScore = payload.data.contents.orngScore;
            let orngColor = payload.data.contents.orngColor;
            let blueColor = payload.data.contents.blueColor;
            let orngColor2 = payload.data.contents.orngColor2;
            let blueColor2 = payload.data.contents.blueColor2;
            let orngName = payload.data.contents.orngName;
            let blueName = payload.data.contents.blueName;
            let orngOverride = payload.data.contents.orngOverride;
            let blueOverride = payload.data.contents.blueOverride;

            let panelSendData = {
                series: series,
                blueScore: blueScore,
                orngScore: orngScore,
                orngColor: orngColor,
                blueColor: blueColor,
                orngColor2: orngColor2,
                blueColor2: blueColor2,
                orngName: orngName,
                blueName: blueName,
                orngOverride: orngOverride,
                blueOverride: blueOverride,
            }

            console.log(panelSendData)

            panelData.set(panelSendData)
        }
        if (payload.data.event === "reset-queue") {
            reset = true;
        }
        if (payload.data.event === "swap-cards") {
            console.log(pcOpacity)
            pcOpacity = (pcOpacity == 1) ? 0 : 1;
            console.log(pcOpacity)
            let data = {
                data: {
                    event: "player-card-state",
                    contents: {
                        currentOpacity: pcOpacity,
                    },
                }
            }
            socket.emit("payload", data);
        }
        if(payload.data.event === "camera_toggle"){
            let cams = {
                blue1: "",
                blue2: "",
                blue3: "",
                blue4: "",
                orng1: "",
                orng2: "",
                orng3: "",
                orng4: "",
            }
            console.log("cam toggle")
            for(let x in payload.data.contents.cameras){
                cams[payload.data.contents.cameras[x][0].slice(0,-4)] = payload.data.contents.cameras[x][1]
            }
            console.log(cams)
            camData.set(cams);
        }
    });

    function rconSend(command) {
        socket.emit('RCON', {
            data: {
                command: command,
            },
        });
    }

    // on socket message 'update', run logic on that data
    socket.on('update', (update) => {
        // run socket logic here, e.g:
        if (update.event === 'game:update_state') {

            // do stuff with update


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

            let targetData;
            if (update.data.game.target) {
                let target = update.data.game.target;

                targetData = dataCheck(target);

                function dataCheck(target) {
                    for (var x = 0; x <= 3; x++) {
                        let z =
                            bluePlayers[x].id == target //If blue player x is target z = blue player x's data
                            ?
                            bluePlayers[x] :
                            orangePlayers[x].id == target //If orange player x is target z = orange player x's data
                            ?
                            orangePlayers[x] :
                            null; //else z is null
                        if (z != null) {
                            return z; // if z is not null return z
                        }
                    }
                }
            }



            let playerData = {
                orangeTeam: orangePlayers,
                blueTeam: bluePlayers
            };
            let sendData = {
                playerData: playerData,
                teamData: update.data.game.teams,
                gameData: update.data.game,
                fullData: update.data,
                targetData: targetData
            };
            isInGame.set(true)
            // console.log(sendData)
            data.set(sendData)
            //etc
            setTimeout(() => {
                reset = false;
            })
        }
        if (update.event === 'game:match_ended') {
            isHudVisible = true;
            isInGame.set(false)
        }

        if (update.event === 'game:post_countdown_begin') {
            //console.log("Hud Visibility = " + isHudVisible)
            isReplay.set(false);

            rconSend('rcon_refresh_allowed');
            rconSend('replay_gui hud 1');
            rconSend('replay_gui matchinfo 1');
            isInGame.set(true)
            setTimeout(() => {
                //console.log("Hud Visibility = " + isHudVisible)
                rconSend('replay_gui hud 0');
                rconSend('replay_gui matchinfo 0');
                isHudVisible = false;
                console.log("Hud Visibility = " + isHudVisible)
            }, 500);
            setTimeout(() => {
                goalData.set(null)
            }, 1000)
        }
        if (update.event === 'game:replay_start') {
            isReplay.set(true);
        }
        if (update.event === 'game:goal_scored') {
            setTimeout(() => {
                stingerBool.set(true)
                setTimeout(() => {
                    stingerBool.set(false)
                }, 3000)
            }, 2500)
        }
        if (update.event === 'game:goal_scored') {
            let scorer = update.data.scorer.name;
            let assister = update.data.assister.name;
            let teamnum = update.data.scorer.teamnum;
            let speed = `${Math.round(update.data.goalspeed)} KPH`

            if (scorer.length > 16) {
                let shorten = scorer.split("").slice(0, 15)
                shorten.push("...")

                scorer = shorten.join('')
            }

            if (assister.length > 16) {
                let shorten = assister.split("").slice(0, 15)
                shorten.push("...")

                assister = shorten.join('')
            }

            let sendData = {
                scorer: scorer,
                assister: assister,
                team: teamnum,
                speed: speed
            }
            console.log(`goal_scored` + sendData)
            goalData.set(sendData)
        }
    });
}