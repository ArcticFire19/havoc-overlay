<script>
    import { stingerBool } from "./socketio.js";
    $: {
        if($stingerBool && document.getElementById("stinger")){
            document.getElementById("stinger").style.opacity = 1
            console.log($stingerBool)
            document.getElementById("stinger").play()
        }
    }
</script>
<main>
    <video width="1920" height="1080" autoplay muted preload="auto" id="stinger" style="opacity: 0; position:absolute">
        <source src="Instant_Replay_Stinger.webm" type="video/webm">
        <track kind="captions">
    </video>
</main>