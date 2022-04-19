<script>
    import { onMount } from "svelte";
    import {data, stingerBool} from "./socketio.js";
    import { panelData } from "./socketio.js";
    import { resize_to_fit } from "./resizeToFit.js";
    import { isReplay } from "./socketio.js";
    import { isInGame } from "./socketio.js";
    onMount(() => {
        console.log("focused card loaded");
    });
    $: {
        if($data?.targetData?.name != ""){
          try{
            document.getElementById("focused-name").style.fontSize = "38px";
          }catch{}
          resize_to_fit(document.getElementById("focused-name"), 200)
        }
        if ($data && $panelData) {
            document.getElementById("outer-focs").style.opacity = $data.gameData
                .hasTarget
                ? "1"
                : "0";
        }
        if(document.getElementById("outer-focs") && ($stingerBool || $isReplay)){
            document.getElementById("outer-focs").style.display = 'none'
        } else if(document.getElementById("outer-focs")){
            document.getElementById("outer-focs").style.display = 'block'
        }
        if($data?.targetData?.team == 0){
			document.getElementById("focs-boost").style.fill = $panelData.blueOverride != "" ? $panelData.blueOverride : "#fff"
			document.getElementById("goals-icon").style.fill = $panelData.blueOverride != "" ? $panelData.blueOverride : "#000"
			document.getElementById("saves-icon").style.fill = $panelData.blueOverride != "" ? $panelData.blueOverride : "#000"
			document.getElementById("assists-icon").style.fill = $panelData.blueOverride != "" ? $panelData.blueOverride : "#000"
			document.getElementById("shots-icon").style.fill = $panelData.blueOverride != "" ? $panelData.blueOverride : "#000"
			document.getElementById("score-text").style.fill = $panelData.blueOverride != "" ? $panelData.blueOverride : "#000"
			document.getElementById("focused-name").style.fill = $panelData.blueOverride != "" ? $panelData.blueOverride : "#fff"
			document.getElementById("goals").style.fill = $panelData.blueOverride != "" ? $panelData.blueOverride : "#000"
			document.getElementById("assists").style.fill = $panelData.blueOverride != "" ? $panelData.blueOverride : "#000"
			document.getElementById("saves").style.fill = $panelData.blueOverride != "" ? $panelData.blueOverride : "#000"
			document.getElementById("shots").style.fill = $panelData.blueOverride != "" ? $panelData.blueOverride : "#000"
			document.getElementById("score").style.fill = $panelData.blueOverride != "" ? $panelData.blueOverride : "#000"
        }
        if($data?.targetData?.team == 1){
			document.getElementById("focs-boost").style.fill = $panelData.orngOverride != "" ? $panelData.orngOverride : "#fff"
			document.getElementById("goals-icon").style.fill = $panelData.orngOverride != "" ? $panelData.orngOverride : "#000"
			document.getElementById("saves-icon").style.fill = $panelData.orngOverride != "" ? $panelData.orngOverride : "#000"
			document.getElementById("assists-icon").style.fill = $panelData.orngOverride != "" ? $panelData.orngOverride : "#000"
			document.getElementById("shots-icon").style.fill = $panelData.orngOverride != "" ? $panelData.orngOverride : "#000"
			document.getElementById("score-text").style.fill = $panelData.orngOverride != "" ? $panelData.orngOverride : "#000"
			document.getElementById("focused-name").style.fill = $panelData.orngOverride != "" ? $panelData.orngOverride : "#fff"
			document.getElementById("goals").style.fill = $panelData.orngOverride != "" ? $panelData.orngOverride : "#000"
			document.getElementById("assists").style.fill = $panelData.orngOverride != "" ? $panelData.orngOverride : "#000"
			document.getElementById("saves").style.fill = $panelData.orngOverride != "" ? $panelData.orngOverride : "#000"
			document.getElementById("shots").style.fill = $panelData.orngOverride != "" ? $panelData.orngOverride : "#000"
			document.getElementById("score").style.fill = $panelData.orngOverride != "" ? $panelData.orngOverride : "#000"
        }
    }
    
</script>

<main>
    <div
    id="outer-focs"
    class="outer-focs"
    style="opacity: {!$isInGame || $isReplay
      ? 0
      : $data.gameData.hasTarget
      ? 1
      : 0}; transition: opacity .5s; bottom: 100px"
    >
    <svg xmlns="http://www.w3.org/2000/svg" transform="translate(-9 , 960)" xmlns:xlink="http://www.w3.org/1999/xlink" width="498" height="72" viewBox="0 0 498 74">
        <defs>
          <linearGradient id="focs-bg-gradient" data-name="New Gradient Swatch 2" y1="55.74" x2="585.85" y2="55.74" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="{$data?.targetData?.team == 0 ? $panelData.blueColor : $data?.targetData?.team == 1 ? $panelData.orngColor : "#ffffff00"}"/>
            <stop offset="1" stop-color="{$data?.targetData?.team == 0 ? $panelData.blueColor2 : $data?.targetData?.team == 1 ? $panelData.orngColor2 : "#ffffff00"}"/>
          </linearGradient>
          <linearGradient id="focs-boost-gradient" x1="2" y1="99.65" x2="582.26" y2="99.65" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fff"/>
            <stop offset="0.29" stop-color="#f6f6f6"/>
            <stop offset="0.5" stop-color="#ededed"/>
            <stop offset="0.74" stop-color="#f0f0f0"/>
            <stop offset="0.95" stop-color="#fbfbfb"/>
            <stop offset="1" stop-color="#fff"/>
          </linearGradient>
          <clipPath id="focs-boost-clip" gradientUnits="userSpaceOnUse">
            <rect id="boost-rect"  x="16" y="59" width="{$data?.targetData?.boost
                ? Math.trunc(
                      $data?.targetData?.boost * 0.01 * 445
                  ).toString()
                : "50"}"
                height="20"/>
          </clipPath>
        </defs>
        <g id="Layer_2" data-name="Layer 2">
            <g id="focused-card">
                <polygon id="focs-bg" points="52.59 4.95 0 76.36 453.87 76.36 506.54 5.05 52.59 4.95" style="fill: #fff"/>
                <polygon id="focs-bg-2" data-name="focs-bg" points="61.45 4.95 8.72 76.35 453.88 76.36 506.54 5.05 61.45 4.95" style="fill: url(#focs-bg-gradient)"/>
                <polygon id="focs-boost" points="26.88 59.28 17.95 71.37 451.98 71.48 460.99 59.28 26.88 59.28" clip-path="url(#focs-boost-clip)" style="fill: url(#focs-boost-gradient)"/>
                <path id="goals-icon" d="M343,28l-5.7-5.5,2.25-1.9-2.22-1.95,2.58-3.72-4.56.41,1.85-7.07-5.1,5-1.95-2.71-1.95,2.68-4.88-4.47L325,15.38l-3,.27,1.08,3-7.23,2,7,2-1.76,3.28,3.77.05L322,34.56l6.18-6.75,1.95,6.68,1.95-6.7,3.39,2-.19-4Zm-14.09-5.34h2.26a.45.45,0,0,1,.37.19l.35.47a.46.46,0,0,1,.06.41l-.65,2a.45.45,0,0,1-.44.31h-1.64a.45.45,0,0,1-.44-.31l-.65-2a.46.46,0,0,1,.06-.41l.35-.47a.45.45,0,0,1,.37-.19Zm-.89-2.7a.35.35,0,0,1,.12-.39l1.7-1.23a.36.36,0,0,1,.4,0l1.7,1.23a.35.35,0,0,1,.12.39l-.65,2a.33.33,0,0,1-.32.24H329a.32.32,0,0,1-.32-.24Zm3.84,2.66a.46.46,0,0,1-.07-.41l.69-2.11a.42.42,0,0,1,.29-.29l.54-.18a.48.48,0,0,1,.42.06l1.67,1.22a.48.48,0,0,1,.17.52l-.5,1.53a.46.46,0,0,1-.44.32h-2.06a.47.47,0,0,1-.37-.19Zm3.88,1.4a.13.13,0,0,1-.18,0,.18.18,0,0,1-.05-.07l-.15-.48a.09.09,0,0,1,0-.07l.73-2.25a.09.09,0,0,1,0-.06l.41-.3a.13.13,0,0,1,.18,0,.19.19,0,0,1,0,.08,6.64,6.64,0,0,1-1,3.08Zm-.35-7.25a.47.47,0,0,1,.39.22,6.59,6.59,0,0,1,.95,2.91.46.46,0,0,1-.19.41l-.35.26a.45.45,0,0,1-.54,0l-1.56-1.13a.44.44,0,0,1-.16-.51l.59-1.84a.48.48,0,0,1,.44-.32Zm-2.83-2.5a6.89,6.89,0,0,1,2.62,1.91.13.13,0,0,1,0,.18.11.11,0,0,1-.08,0h-.5a.11.11,0,0,1-.07,0L332.62,15a.13.13,0,0,1-.05-.06l-.16-.48a.14.14,0,0,1,.09-.16Zm.05,1.23,1.3.94a.48.48,0,0,1,.17.52l-.65,2a.42.42,0,0,1-.29.29l-.54.18a.46.46,0,0,1-.41-.07l-1.8-1.3a.45.45,0,0,1-.19-.37v-.57a.47.47,0,0,1,.19-.38l1.68-1.21A.45.45,0,0,1,332.63,15.48Zm-4.57-.85.14-.42a.47.47,0,0,1,.33-.31,6.87,6.87,0,0,1,3.06,0,.47.47,0,0,1,.33.31l.14.41a.48.48,0,0,1-.17.52l-1.56,1.13a.45.45,0,0,1-.54,0l-1.56-1.13a.48.48,0,0,1-.17-.52Zm1.58,2.06a.47.47,0,0,1,.19.38v.57a.45.45,0,0,1-.19.37l-1.79,1.31a.46.46,0,0,1-.41.06l-.55-.18a.42.42,0,0,1-.29-.29l-.64-2a.47.47,0,0,1,.16-.52l1.31-.94a.45.45,0,0,1,.54,0Zm-4.72-.53a6.76,6.76,0,0,1,2.62-1.9.12.12,0,0,1,.16.06.1.1,0,0,1,0,.09l-.16.48a.09.09,0,0,1,0,.06l-1.92,1.4-.07,0H325a.12.12,0,0,1-.13-.12s0-.06,0-.09Zm-1.55,3.72a6.7,6.7,0,0,1,.94-2.91.5.5,0,0,1,.4-.22h.43a.48.48,0,0,1,.44.32l.6,1.83a.48.48,0,0,1-.17.52l-1.56,1.13a.45.45,0,0,1-.54,0l-.36-.25A.46.46,0,0,1,323.37,19.88Zm1.37,3.62-.15.47a.12.12,0,0,1-.16.08s-.05,0-.07-.05a6.64,6.64,0,0,1-1-3.08.12.12,0,0,1,.11-.13.1.1,0,0,1,.09,0l.41.3a.09.09,0,0,1,0,.06l.73,2.25A.11.11,0,0,1,324.74,23.5Zm-.21-2.09a.47.47,0,0,1,.16-.52l1.68-1.22a.46.46,0,0,1,.41-.06l.54.18a.46.46,0,0,1,.3.29l.68,2.11a.46.46,0,0,1-.06.41l-.34.47a.48.48,0,0,1-.37.19h-2.07a.47.47,0,0,1-.44-.32Zm3.72,4.9-.35.25a.43.43,0,0,1-.45.05,6.69,6.69,0,0,1-2.47-1.8.44.44,0,0,1-.09-.44L325,24a.47.47,0,0,1,.44-.32h1.93a.45.45,0,0,1,.43.32l.6,1.83a.46.46,0,0,1-.17.52Zm3.43.66a6.62,6.62,0,0,1-3.25,0,.12.12,0,0,1-.09-.15.18.18,0,0,1,.05-.07l.41-.3.07,0h2.37l.07,0,.41.3a.12.12,0,0,1,0,.17s0,0-.07,0Zm3.46-2.16a6.77,6.77,0,0,1-2.47,1.8.48.48,0,0,1-.45-.05l-.35-.26a.46.46,0,0,1-.17-.51l.59-1.83a.47.47,0,0,1,.44-.32h1.93a.45.45,0,0,1,.43.32l.14.41A.47.47,0,0,1,335.14,24.81Z"/>
                <path id="saves-icon" d="M413.44,8.25c-5,0-9,1.25-9,2.79s4,2.8,9,2.8,9-1.25,9-2.8S418.42,8.25,413.44,8.25Zm0,5c-3.87,0-7-1-7-2.17s3.14-2.17,7-2.17,7,1,7,2.17S417.31,13.21,413.44,13.21Zm-2.9,11,.93,2.86a.48.48,0,0,0,.47.35h3a.48.48,0,0,0,.47-.35l.93-2.86a.48.48,0,0,0-.18-.55l-2.43-1.77a.51.51,0,0,0-.58,0l-2.43,1.77A.48.48,0,0,0,410.54,24.2ZM407,20l.85,2.63a.66.66,0,0,1-.24.74L405.38,25a.65.65,0,0,1-.77,0l-.51-.37a.63.63,0,0,1-.27-.58,9.6,9.6,0,0,1,1.36-4.19.66.66,0,0,1,.56-.31h.63A.68.68,0,0,1,407,20Zm3.33,8.62.49-.67a.65.65,0,0,0,.09-.59l-1-3a.65.65,0,0,0-.42-.42l-.79-.26a.66.66,0,0,0-.59.1l-2.4,1.74a.66.66,0,0,0-.24.74l.71,2.2a.66.66,0,0,0,.63.45h3a.65.65,0,0,0,.54-.26Zm4.89,3.82.93-2.85a.67.67,0,0,0-.09-.6l-.49-.67a.67.67,0,0,0-.54-.27h-3.2a.65.65,0,0,0-.53.27l-.49.67a.68.68,0,0,0-.1.6l.93,2.85a.66.66,0,0,0,.63.45h2.33A.65.65,0,0,0,415.23,32.46ZM413.71,20v.82a.68.68,0,0,0,.27.54l2.57,1.87a.65.65,0,0,0,.59.09l.79-.25a.67.67,0,0,0,.42-.43l.92-2.83a.65.65,0,0,0-.24-.73l-1.87-1.36a.66.66,0,0,0-.78,0L414,19.49A.68.68,0,0,0,413.71,20Zm9.35,4a9.74,9.74,0,0,0-1.37-4.19.66.66,0,0,0-.56-.31h-.62a.67.67,0,0,0-.63.46L419,22.65a.68.68,0,0,0,.24.74L421.5,25a.66.66,0,0,0,.78,0l.5-.36A.69.69,0,0,0,423.06,24.06Zm-2.39,4.39.72-2.2a.66.66,0,0,0-.24-.74l-2.41-1.75a.65.65,0,0,0-.59-.09l-.78.25a.69.69,0,0,0-.43.42l-1,3a.65.65,0,0,0,.09.59l.49.67a.65.65,0,0,0,.53.27h3A.65.65,0,0,0,420.67,28.45Zm-13.11-8.61.91,2.83a.7.7,0,0,0,.43.43l.78.25a.65.65,0,0,0,.59-.09l2.58-1.87a.68.68,0,0,0,.27-.54V20a.68.68,0,0,0-.27-.54l-2.41-1.74a.65.65,0,0,0-.77,0l-1.88,1.35A.66.66,0,0,0,407.56,19.84Zm12.49,9.65h-2.77a.67.67,0,0,0-.63.46l-.85,2.63a.66.66,0,0,0,.24.74l.5.37a.67.67,0,0,0,.64.07,9.63,9.63,0,0,0,3.56-2.59.65.65,0,0,0,.13-.63l-.2-.59A.65.65,0,0,0,420.05,29.49Zm-9.71,4.2.51-.37a.66.66,0,0,0,.24-.74L410.23,30a.66.66,0,0,0-.63-.45h-2.76a.66.66,0,0,0-.63.45l-.19.59a.66.66,0,0,0,.12.63,9.74,9.74,0,0,0,3.56,2.59A.67.67,0,0,0,410.34,33.69Zm5.77-17.76a.65.65,0,0,0-.47-.44,9.62,9.62,0,0,0-4.4,0,.65.65,0,0,0-.47.44l-.19.59a.66.66,0,0,0,.23.74l2.24,1.63a.66.66,0,0,0,.78,0l2.24-1.63a.65.65,0,0,0,.24-.73Zm6.67,9.47-.59.43a.15.15,0,0,0-.06.09l-1.05,3.23a.21.21,0,0,0,0,.11l.22.69a.19.19,0,0,0,.23.12.18.18,0,0,0,.09-.08,9.61,9.61,0,0,0,1.45-4.43.19.19,0,0,0-.29-.16ZM415.84,34l-.59-.43a.2.2,0,0,0-.11,0h-3.4a.19.19,0,0,0-.1,0l-.59.43a.18.18,0,0,0,0,.25.18.18,0,0,0,.1.07,9.67,9.67,0,0,0,4.66,0,.19.19,0,0,0,.14-.22A.18.18,0,0,0,415.84,34Zm-10-4.81-1.05-3.23a.22.22,0,0,0-.07-.09l-.58-.43a.18.18,0,0,0-.25,0,.16.16,0,0,0,0,.13A9.59,9.59,0,0,0,405.26,30a.18.18,0,0,0,.25.05.16.16,0,0,0,.07-.09l.22-.69A.14.14,0,0,0,405.81,29.15Zm11-13,.23.7a.16.16,0,0,0,.06.08l2.75,2a.2.2,0,0,0,.11,0h.72a.18.18,0,0,0,.18-.18.21.21,0,0,0,0-.11,9.67,9.67,0,0,0-3.77-2.74.17.17,0,0,0-.23.1.17.17,0,0,0,0,.12ZM407,18.94l2.75-2a.27.27,0,0,0,.07-.08l.22-.7a.17.17,0,0,0-.12-.22h-.11a9.69,9.69,0,0,0-3.77,2.74.2.2,0,0,0,0,.26.28.28,0,0,0,.12,0h.72A.18.18,0,0,0,407,18.94Z"/>
                <path id="assists-icon" d="M379.88,31.25a.15.15,0,0,1-.23-.18,8.06,8.06,0,0,0,.42-.95,4.37,4.37,0,0,1,1.08-1.72,14.41,14.41,0,0,1,3.52-2.54.87.87,0,0,0,.38-.65,1,1,0,0,0-.21-.69.91.91,0,0,0-1.35-.2l-2.55,1.89a.48.48,0,0,1-.51.09.6.6,0,0,1-.35-.53c0-.14-.06-.43,2.07-6.17,1.05-2.81,2.11-5.58,2.12-5.61a.76.76,0,0,0-.46-1,.88.88,0,0,0-.6,0,.85.85,0,0,0-.45.48L380,20.77a.73.73,0,0,1-1,.4.74.74,0,0,1-.47-1l3.74-9.74a.81.81,0,0,0-1.51-.58l-3.2,8.31a.35.35,0,0,1-.46.21.34.34,0,0,1-.21-.21l-.43-1.13a.3.3,0,0,1,0-.26l2.27-5.93a.8.8,0,1,0-1.5-.58l-1.33,3.49a.37.37,0,0,1-.47.21.36.36,0,0,1-.21-.21l-.21-.53a.39.39,0,0,1,0-.26l1.17-3.11a1.88,1.88,0,0,1,1.77-1.24,2,2,0,0,1,1.66.86l.06.1,0-.12a1.87,1.87,0,0,1,1.76-1.24,2,2,0,0,1,1.66.86,1.9,1.9,0,0,1,.19,1.76l-.39,1a1.8,1.8,0,0,1,.6-.1,2,2,0,0,1,1.65.86,1.87,1.87,0,0,1,.19,1.77c-1.41,3.67-2.92,7.72-3.66,9.88l1.15-.86a2,2,0,0,1,1.25-.43,2.15,2.15,0,0,1,2,1.49,2,2,0,0,1-.74,2.3l-.06,0-.07,0a15.66,15.66,0,0,0-4.59,3.73Zm-18.69-4.2c5.71,2.91,5.86,7.51,11.51,7.51,4.17,0,7.63-4.36,6.67-7.32l-5.93-15.59a1.12,1.12,0,0,0-2.1.8l2.37,6.17a.5.5,0,1,1-.93.36l-3.31-8.63a1.13,1.13,0,1,0-2.1.81l3.31,8.62a.54.54,0,0,1-1,.38L365.75,9.92a1.12,1.12,0,0,0-2.1.8L367.59,21c.24.62-.79,1-1,.39l-3-7.73a1.13,1.13,0,1,0-2.1.81s4.48,11.65,4.39,12.25c-.05.35-.25.45-.47.29l-2.68-2A1.29,1.29,0,0,0,361.19,27.05Z"/>
                <path id="shots-icon" d="M442.78,12.82c-2.31-.8-2-4.57-2-4.57s1.57,3.38,4,3.61c1.49.14,2.36,2.63,1.91,5.33C446.35,16.22,444.74,13.5,442.78,12.82ZM445,22.11c-.45,1.58.43,5.1,4,6.62a4.62,4.62,0,0,1-.92-1.76C448,26.25,446,26.09,445,22.11Zm6.54-8c.42,2.84,2.47,3.67,3.37,3.67-1.6-.57-.78-.63-2.07-4.06-1.55-4.08-5.18-3.07-5.18-3.07a4.11,4.11,0,0,1,3.88,3.46Zm14,12.3a8.17,8.17,0,0,1-16.22,1.36c-.63-1.05-1.49-1.45-1.9-2.69-.9-2.75-.59-3.57-2.48-4.11s-2.12-3.83-2.12-3.83,1.15,2.52,3.5,2.86c1,.15,1.68,2.08,2.36,2.72s2.18-.86,1.23-1.36c-1.43-.75-2.39-1.39-2.59-3.35-.15-1.43.39-2.88-.13-4.3a5,5,0,0,0-2.59-3s4.43.26,4.5,4.71c.05,3.52,2.74,4.78,3.59,4.3.44-.26-.14-1-1.47-1.93-1.14-.77-1.13-4.36-1.13-4.36s2,5.48,5.65,5c3.15-.46-.62-1.92-.62-1.92a3.18,3.18,0,0,1,2.41.05c1.46.56,1.32,1.31,1.63,1.9A8.17,8.17,0,0,1,465.5,26.39Zm-2.94-3.93a.51.51,0,0,0-.47.34l-.63,1.95a.47.47,0,0,0,.18.55l1.66,1.21a.5.5,0,0,0,.57,0l.38-.27a.54.54,0,0,0,.2-.44,7.23,7.23,0,0,0-1-3.1.49.49,0,0,0-.42-.24ZM454.72,26a.47.47,0,0,0-.31-.32l-.58-.18a.47.47,0,0,0-.44.07l-1.78,1.29a.48.48,0,0,0-.18.55L452,29a.48.48,0,0,0,.46.34h2.21a.46.46,0,0,0,.39-.2l.36-.49a.49.49,0,0,0,.07-.44Zm.45-.1.69,2.13a.36.36,0,0,0,.34.25h2.23a.37.37,0,0,0,.35-.25l.69-2.13a.37.37,0,0,0-.13-.41l-1.81-1.31a.38.38,0,0,0-.43,0l-1.8,1.31a.37.37,0,0,0-.13.41Zm.12,4L456,32a.49.49,0,0,0,.47.34h1.74a.49.49,0,0,0,.47-.34l.69-2.13a.47.47,0,0,0-.07-.43l-.36-.51a.49.49,0,0,0-.4-.2h-2.39a.49.49,0,0,0-.4.2l-.37.5a.49.49,0,0,0-.07.44Zm4.32-.71a.52.52,0,0,0,.4.2h2.2a.5.5,0,0,0,.47-.34l.53-1.63a.49.49,0,0,0-.18-.55l-1.78-1.3a.53.53,0,0,0-.44-.07l-.58.19a.51.51,0,0,0-.32.32l-.73,2.24a.53.53,0,0,0,.07.44Zm.22-9.27.16.51a.18.18,0,0,0,.05.07l2,1.48.08,0h.53a.13.13,0,0,0,.13-.13.16.16,0,0,0,0-.09,7.22,7.22,0,0,0-2.79-2,.14.14,0,0,0-.17.08.14.14,0,0,0,0,.09Zm-.35,1.18-1.79,1.3a.49.49,0,0,0-.2.39v.61a.5.5,0,0,0,.2.39l1.91,1.39a.49.49,0,0,0,.44.07l.58-.19a.48.48,0,0,0,.31-.31l.69-2.1a.5.5,0,0,0-.18-.55l-1.39-1a.48.48,0,0,0-.57,0Zm-4.11-.36,1.66,1.2a.48.48,0,0,0,.58,0l1.65-1.2a.48.48,0,0,0,.18-.55l-.14-.45a.49.49,0,0,0-.35-.32,7.18,7.18,0,0,0-3.26,0,.47.47,0,0,0-.35.32l-.15.45a.51.51,0,0,0,.18.55Zm-.83.36-1.39,1a.49.49,0,0,0-.18.55l.68,2.1a.51.51,0,0,0,.32.32l.58.18a.49.49,0,0,0,.44-.06l1.91-1.39a.5.5,0,0,0,.2-.39v-.62a.49.49,0,0,0-.2-.39l-1.79-1.3a.47.47,0,0,0-.57,0ZM452,22h.54l.07,0,2-1.48a.18.18,0,0,0,0-.07l.17-.51a.14.14,0,0,0-.09-.17h-.09a7.22,7.22,0,0,0-2.79,2,.14.14,0,0,0,0,.19A.16.16,0,0,0,452,22Zm-1.56,4.24.38.28a.5.5,0,0,0,.57,0L453,25.3a.48.48,0,0,0,.17-.55l-.63-1.95a.51.51,0,0,0-.47-.34h-.46a.49.49,0,0,0-.42.24,7.09,7.09,0,0,0-1,3.1A.48.48,0,0,0,450.39,26.23Zm1.27,3.31-.78-2.39a.12.12,0,0,0-.05-.07l-.43-.31a.13.13,0,0,0-.19,0,.08.08,0,0,0,0,.08,7,7,0,0,0,1.07,3.28.13.13,0,0,0,.18,0,.18.18,0,0,0,.05-.07l.17-.51a.11.11,0,0,0,0-.08Zm3.91,2.52-.63-2a.49.49,0,0,0-.46-.34h-2.06a.48.48,0,0,0-.46.34l-.14.44a.47.47,0,0,0,.09.47,7.22,7.22,0,0,0,2.63,1.91.49.49,0,0,0,.48,0l.38-.27a.49.49,0,0,0,.17-.55Zm3.52,1-.43-.32a.08.08,0,0,0-.08,0h-2.52a.08.08,0,0,0-.08,0l-.43.32a.12.12,0,0,0,0,.18s0,0,.07,0a7,7,0,0,0,3.46,0,.13.13,0,0,0,.1-.16.13.13,0,0,0-.06-.07Zm3.73-2.55-.13-.44a.5.5,0,0,0-.48-.34h-2a.5.5,0,0,0-.47.34l-.63,2a.49.49,0,0,0,.17.55l.38.27a.51.51,0,0,0,.48.06A7.25,7.25,0,0,0,462.73,31a.49.49,0,0,0,.09-.48Zm.57-.39a7.07,7.07,0,0,0,1.06-3.28.13.13,0,0,0-.12-.14.15.15,0,0,0-.09,0l-.43.32s0,0-.05.06l-.78,2.4a.11.11,0,0,0,0,.08l.17.51a.13.13,0,0,0,.16.09.16.16,0,0,0,.08-.06Z"/>
                <text id="score-text" transform="translate(265.66 24.91)" style="font-size: 10px;font-family: IntegralCF-Regular, Integral CF">Score</text>
                <text id="focused-name" transform="translate(56.46 43.84)" style="font-size: 26.3px;fill: #fff;font-family: IntegralCF-Regular, Integral CF">{$data?.targetData?.name ?? ""}</text>
                <text id="goals" transform="translate(328.56 50.94)" dominant-baseline="middle" text-anchor="middle" style="font-size: 17.5px;font-family: Arial-Black, Arial;font-weight: 800">{$data?.targetData?.goals ?? "test"}</text>
                <text id="assists" transform="translate(372.57 50.94)" dominant-baseline="middle" text-anchor="middle" style="font-size: 17.5px;font-family: Arial-Black, Arial;font-weight: 800">{$data?.targetData?.assists ?? ""}</text>
                <text id="saves" transform="translate(412.59 50.94)" dominant-baseline="middle" text-anchor="middle" style="font-size: 17.5px;font-family: Arial-Black, Arial;font-weight: 800">{$data?.targetData?.saves ?? ""}</text>
                <text id="shots" transform="translate(454.29 50.94)" dominant-baseline="middle" text-anchor="middle" style="font-size: 17.5px;font-family: Arial-Black, Arial;font-weight: 800">{$data?.targetData?.shots ?? ""}</text>
                <text id="score" data-name="score" transform="translate(282.5 50.94)" dominant-baseline="middle" text-anchor="middle" style="font-size: 17.5px;font-family: Arial-Black, Arial;font-weight: 800">{$data?.targetData?.score ?? ""}</text>
            </g>
        </g>
      </svg>
      
    </div>
</main>

<style>
</style>
