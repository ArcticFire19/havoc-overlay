<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { resize_to_fit } from "./resizeToFit.js";
    import { isReplay, stingerBool, isInGame, panelData, data, camData, camloaderstore } from "./socketio.js";
    onMount(() => {
        console.log("playercards loaded");
    });
    let bluePlayers = []
    let blueNums = []
    let orangePlayers = []
    let orangeNums = []
    let cams = []
    
    $: {
        cams = [$camData["blue1"],$camData["blue2"],$camData["blue3"],$camData["blue4"],$camData["orng1"],$camData["orng2"],$camData["orng3"],$camData["orng4"]]
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
            document.getElementById("outer-pc").style.display = 'flex'
        }

        console.log(bluePlayers, orangePlayers, blueNums)
        
        for(let x = 0;x<blueNums.length;x++){
            $camloaderstore[0][blueNums[x]] = 0
        }
        for(let x = 0;x<orangeNums.length;x++){
            $camloaderstore[1][orangeNums[x]] = 0
        }
    }
</script>

<main >
    <div id="outer-pc" style="display: flex">
        <script>
            function camloaded(num, team, camloader) {
                console.log(num, team, $camloader)
                camloader[team][num] = 1;
                camloaderstore.set(camloader)
                for(let x=0;x<4;x++){
                    console.log(camloader[0][x], camloader[1][x])
                    if(camloader[0][x] == 0){
                        break
                    }
                    else if(camloader[1][x] == 0){
                        break
                    }
                    if(x==3){
                        document.getElementById(`bplayer0-cam`).style.opacity = 1
                        document.getElementById(`bplayer1-cam`).style.opacity = 1
                        document.getElementById(`bplayer2-cam`).style.opacity = 1
                        
                        document.getElementById(`oplayer0-cam`).style.opacity = 1
                        document.getElementById(`oplayer1-cam`).style.opacity = 1
                        document.getElementById(`oplayer2-cam`).style.opacity = 1
                    }
                }
            }
        </script>
        <div style="display: grid">
            {#each blueNums as num}
                {#if cams[num] == ""}
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="326" height="29.36" viewBox="0 0 326 29.36" style="padding-bottom: 10px">
                        <defs>
                            <linearGradient id="linear-gradient" gradientUnits="objectBoundingBox">
                                <stop offset="0" stop-color="{$panelData.blueColor ? $panelData.blueColor : "#ffffff00"}"/>
                                <stop offset="1" stop-color="{$panelData.blueColor2 ? $panelData.blueColor2 : "#ffffff00"}"/>
                            </linearGradient>
                            <clipPath id="bg-clip">
                                <polygon points="295.94 28.36 2.43 28.36 30.05 1 323.56 1 295.94 28.36" style="fill: {$panelData.blueOverride != "" ? $panelData.blueOverride : "#000"};stroke: #000;stroke-miterlimit: 10;stroke-width: 2px"/>
                            </clipPath>
                        </defs>
                        <g id="playercard">
                            <polygon id="Background-pc" points="295.94 28.36 2.43 28.36 30.05 1 323.56 1 295.94 28.36" style="fill: #fff;stroke: #000;stroke-miterlimit: 10;stroke-width: 2px"/>
                            <polygon id="Gradient-pc" points="295.94 28.36 2.43 28.36 30.05 1 323.56 1 295.94 28.36" style="fill: url(#linear-gradient)"/>
                            <line id="line-pc" stroke-width="8px" stroke={$panelData.blueOverride != "" ? $panelData.blueOverride : "#fff"} x1="2" y1="28" x2="{bluePlayers[num].boost/100 * 300}" y2="28" clip-path="url(#bg-clip)"/>
                            <text id="playername" transform="translate(28.93 21.36)" style="fill: {$panelData.blueOverride != "" ? $panelData.blueOverride : "#000"};font-size: 18px;font-family: IntegralCF-Regular, Integral CF;letter-spacing: 0.03em">{bluePlayers[num].name}</text>
                            <text id="boost" transform="translate(258.69 21.36)" style="fill: {$panelData.blueOverride != "" ? $panelData.blueOverride : "#000"};font-size: 18px;font-family: IntegralCF-Regular, Integral CF;letter-spacing: 0.01em">{bluePlayers[num].boost}</text>
                        </g>
                    </svg>
                {:else}
                    <div id="playername" style="color: {$panelData.blueOverride != "" ? $panelData.blueOverride : "#fff"};font-size: 18px;font-family: IntegralCF-Regular, Integral CF;letter-spacing: 0.03em; position: absolute; padding-top: {155+(40*num)+(153*num)}px; padding-left: 10px">{bluePlayers[num].name}</div>
                    <iframe id="bplayer{num}-cam" allow="autoplay;microphone;camera;" onload="camloaded({num}, 0, {camloaderstore})" width="326px" height="183.4px" src="{cams[num]}&cleanoutput&transparent" title="playercam" style="padding-bottom: 10px; border: 0;opacity: 0"></iframe>
                {/if}
            {/each}
        </div>

        <div style="display: grid; left: 1595px; position: absolute">
            {#each orangeNums as num}
                {#if cams[num+4] == ""}
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="326" height="29.36" viewBox="0 0 326 29.36" style="padding-bottom: 10px;">
                        <defs>
                            <linearGradient id="linear-gradient-3" gradientUnits="objectBoundingBox">
                                <stop offset="0" stop-color="{$panelData.orngColor2 ? $panelData.orngColor2 : "#ffffff00"}"/>
                                <stop offset="1" stop-color="{$panelData.orngColor ? $panelData.orngColor : "#ffffff00"}"/>
                            </linearGradient>
                            <clipPath id="bg-clip-2">
                                <polygon points="30.06 28.36 323.56 28.36 295.94 1 2.43 1 30.06 28.36" style="fill: {$panelData.orngOverride != "" ? $panelData.orngOverride : "#000"};stroke: #000;stroke-miterlimit: 10;stroke-width: 2px"/>
                            </clipPath>
                        </defs>
                        <g id="playercard">
                            <polygon id="Background-pc" points="30.06 28.36 323.56 28.36 295.94 1 2.43 1 30.06 28.36" fill="url(#linear-gradient-3)" style="stroke: #000;stroke-miterlimit: 10;stroke-width: 2px"/>
                            <line id="line-pc" stroke-width="8px" stroke={$panelData.orngOverride != "" ? $panelData.orngOverride : "#fff"} x1="{(100-orangePlayers[num].boost)*3+26}" y1="28" x2="325" y2="28" clip-path="url(#bg-clip-2)"/>
                            <text id="playername" text-anchor="end" transform="translate(295.69 21.36)" style="fill: {$panelData.orngOverride != "" ? $panelData.orngOverride : "#000"}; font-size: 18px;font-family: IntegralCF-Regular, Integral CF;letter-spacing: 0.03em">{orangePlayers[num].name}</text>
                            <text id="boost" transform="translate(28.93 21.36)" style="fill: {$panelData.orngOverride != "" ? $panelData.orngOverride : "#000"}; font-size: 18px;font-family: IntegralCF-Regular, Integral CF;letter-spacing: 0.01em">{orangePlayers[num].boost}</text>
                        </g>
                    </svg>
                {:else}
                    <div id="playername" style="color: {$panelData.orngOverride != "" ? $panelData.orngOverride : "#fff"};font-size: 18px;font-family: IntegralCF-Regular, Integral CF;letter-spacing: 0.03em; position: absolute; text-align: right; width: 314px; top: {155+(40*num)+(153*num)}px;">{orangePlayers[num].name}</div>
                    <iframe id="oplayer{num}-cam" allow="autoplay;microphone;camera;" onload="camloaded({num}, 1, {camloaderstore})" width="326px" height="183.4px" src="{cams[num+4]}&cleanoutput&transparent" title="playercam" style="padding-bottom: 10px; border: 0;opacity: 0"></iframe>
                {/if}
            {/each}
        </div>
    </div>
</main>

<style>

</style>