<template>
    <div class="container-loading">
        <div class="pacman"></div>
        <div class="dot"></div>

        <label class="text-loading">Loading ...</label>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    div.container-loading {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0, 0, 0, .9);
        z-index:99;
    }

    .pacman:before, .pacman:after {
        content: '';
        position: absolute;
        background: #FFC107;
        width: 100px;
        height: 50px;
        left: 50%;
        top: 50%;
        margin-left: -125px;
        margin-top: -70px;
        border-radius: 50px 50px 0 0;
        animation: up 0.4s infinite;
    }

    .pacman:after {
        margin-top: -20px;
        border-radius: 0 0 50px 50px;
        animation: down 0.4s infinite;
    }

    .dot {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 10px;
        height: 10px;
        margin-top: -25px;
        margin-left: -40px;
        border-radius: 50%;
        background: #ccc;
        z-index: -1;
        box-shadow: 30px 0 0 #ccc, 60px 0 0 #ccc, 90px 0 0 #ccc, 120px 0 0 #ccc, 150px 0 0 #ccc;
        animation: r-to-l 0.4s infinite;
    }

    label.text-loading {
        color:white;
        letter-spacing:5px;
        font-size:20px;
        font-weight:600;

        position:absolute;
        top:65%;
        left:50%;
        margin-left:-60px;
        margin-top:-10px;
    }

    /* --------------------- ANIMATION ----------------------- */
    @keyframes up {
        0%, 100% {
            transform: rotate(0);
        }
        50% {
            transform: rotate(-30deg);
        }
    }
    @keyframes down {
        0%, 100% {
            transform: rotate(0);
        }
        50% {
            transform: rotate(30deg);
        }
    }
    @keyframes r-to-l {
        100% {
            margin-left: -60px;
        }
    }
</style>
