<script>
    import { onMount } from "svelte";
    import { data } from "./socketio.js";
    import { panelData } from "./socketio.js";
    import { resize_to_fit } from "./resizeToFit.js";
    import { isReplay, stingerBool } from "./socketio.js";
    import { isInGame } from "./socketio.js";
    onMount(() => {
        console.log("playercards loaded");
    });
    let bluePlayers = []
    let blueNums = []
    let orangePlayers = []
    let orangeNums = []
    $: {
        bluePlayers = []
        blueNums = []
        orangePlayers = []
        orangeNums = []
        for(let x = 0; x < 5; x++){
            if($data?.playerData?.blueTeam[x] != undefined){
                bluePlayers.push($data?.playerData?.blueTeam[x]); 
                blueNums.push(x)
            }
        }

        for(let x = 0; x < 5; x++){
            if($data?.playerData?.orangeTeam[x] != undefined){
                orangePlayers.push($data?.playerData?.orangeTeam[x]); 
                orangeNums.push(x)
            }
        }

        if(document.getElementById("outer-pc") && ($stingerBool || $isReplay)){
            document.getElementById("outer-pc").style.display = 'none'
        } else if(document.getElementById("outer-pc")){
            document.getElementById("outer-pc").style.display = 'block'
        }

        console.log(bluePlayers, orangePlayers)
        
    }
</script>

<main >
    <div id="outer-pc">
        <div style="display: grid">
            {#each blueNums as num}
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="326" height="29.36" viewBox="0 0 326 29.36" style="padding-bottom: 10px">
                    <defs>
                        <linearGradient id="linear-gradient" gradientUnits="objectBoundingBox">
                            <stop offset="0" stop-color="{$panelData.blueColor ? $panelData.blueColor : "#ffffff00"}"/>
                            <stop offset="1" stop-color="{$panelData.blueColor2 ? $panelData.blueColor2 : "#ffffff00"}"/>
                        </linearGradient>
                        <clipPath id="bg-clip">
                            <polygon points="295.94 28.36 2.43 28.36 30.05 1 323.56 1 295.94 28.36" style="fill: #fff;stroke: #000;stroke-miterlimit: 10;stroke-width: 2px"/>
                        </clipPath>
                    </defs>
                    <g id="playercard">
                        <polygon id="Background-pc" points="295.94 28.36 2.43 28.36 30.05 1 323.56 1 295.94 28.36" style="fill: #fff;stroke: #000;stroke-miterlimit: 10;stroke-width: 2px"/>
                        <polygon id="Gradient-pc" points="295.94 28.36 2.43 28.36 30.05 1 323.56 1 295.94 28.36" style="fill: url(#linear-gradient)"/>
                        <line id="line-pc" stroke-width="8px" stroke="#ffffff" x1="2" y1="28" x2="{bluePlayers[num].boost/100 * 300}" y2="28" clip-path="url(#bg-clip)"/>
                        <text id="playername" transform="translate(28.93 21.36)" style="font-size: 18px;font-family: IntegralCF-Regular, Integral CF;letter-spacing: 0.03em">{bluePlayers[num].name}</text>
                        <text id="boost" transform="translate(258.69 21.36)" style="font-size: 18px;font-family: IntegralCF-Regular, Integral CF;letter-spacing: 0.01em">{bluePlayers[num].boost}</text>
                    </g>
                </svg>
            {/each}
        </div>

        <div style="display: grid">
            {#each orangeNums as num}
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="326" height="29.36" viewBox="0 0 326 29.36" style="padding-bottom: 10px; position: relative; left: 1594px; top: -110px">
                    <defs>
                        <linearGradient id="linear-gradient-3" gradientUnits="objectBoundingBox">
                            <stop offset="0" stop-color="{$panelData.orngColor ? $panelData.orngColor : "#ffffff00"}"/>
                            <stop offset="1" stop-color="{$panelData.orngColor2 ? $panelData.orngColor2 : "#ffffff00"}"/>
                        </linearGradient>
                        <clipPath id="bg-clip-2">
                            <polygon points="295.94 28.36 2.43 28.36 30.05 1 323.56 1 295.94 28.36" style="fill: #fff;stroke: #000;stroke-miterlimit: 10;stroke-width: 2px"/>
                        </clipPath>
                    </defs>
                    <g id="playercard">
                        <polygon id="Background-pc" points="295.94 28.36 2.43 28.36 30.05 1 323.56 1 295.94 28.36" fill="url(#linear-gradient-3)" style="stroke: #000;stroke-miterlimit: 10;stroke-width: 2px"/>
                        <line id="line-pc" stroke-width="8px" stroke="#ffffff" x1="2" y1="28" x2="{orangePlayers[num].boost/100 * 300}" y2="28" clip-path="url(#bg-clip-2)"/>
                        <text id="playername" transform="translate(28.93 21.36)" style="font-size: 18px;font-family: IntegralCF-Regular, Integral CF;letter-spacing: 0.03em">{orangePlayers[num].name}</text>
                        <text id="boost" transform="translate(258.69 21.36)" style="font-size: 18px;font-family: IntegralCF-Regular, Integral CF;letter-spacing: 0.01em">{orangePlayers[num].boost}</text>
                    </g>
                </svg>
            {/each}
        </div>
    </div>
</main>

<style>

</style>