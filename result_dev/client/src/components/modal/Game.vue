<template>
    <div class="modal modal-game">
        <div class="container-modal container-game">
            <div class="wrapper-game col-xs-12 col-md-8 col-lg-8">
                <div class="wrapper-play">
                    <button class="btn-play">
                        play
                    </button>
                </div>

                <canvas id="dragon" width="800" height="400"></canvas>
            </div>

            <div class="board-score col-xs-12 col-md-4 col-lg-4">
                <h3>High Score</h3>

                <div class="scores" v-if="highscores.length > 0">
                    <div class="score" v-for="highscore in highscores">
                        <label class="left">1. {{ highscore.user.username }}</label>
                        <label class="right">{{ highscore.score }}</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="close" @click="closeModal">Close</div>
    </div>
</template>

<script>
    import scoreService from '@/services/score.service';

    export default {
        props: ['type'],
        data() {
            return {
                highscores: []
            }
        },
        created() {
            this.getHighScore(this.type);
        },
        methods: {
            getHighScore(type) {
                scoreService.getHighScore(type)
                    .then((response) => {
                        this.highscores = response.data.data.items;
                    });
            },
            closeModal() {
                this.$emit('closeModal');
            }
        }
    }
</script>

<style>
    div.modal div.container-game {
        padding:0;
        display:flex;
        width:1100px;
        min-height:500px;
    }

    div.modal div.container-game div.wrapper-game {
        height:inherit;
        background:white;
        display:flex;
        justify-content:center;
        align-items:center;
    }

    div.modal div.container-game div.wrapper-game button.btn-play {
        background:#6520bf;
        border:none;
        color:white;
        text-transform:uppercase;
        font-weight:bold;
        padding:10px 16px;
        font-size:18px;
        cursor:pointer;
        transition:all .3s;
    }

    div.modal div.container-game div.wrapper-game button.btn-play:hover {
        background:#481B91;
    }

    div.modal div.container-game div.wrapper-game button.btn-play:active {
        background:#2C1458;
    }

    div.modal div.container-game div.wrapper-game canvas {
        background:#ccc;
        display:none;
    }

    div.modal div.container-game div.board-score {
        padding-top:20px;
        padding-bottom:20px;
    }

    div.modal div.container-game div.board-score h3 {
        text-align:center;
        margin-bottom:20px;
        margin-top:0;
    }

    div.modal div.container-game div.board-score div.scores div.score {
        font-size:18px;
        padding:14px;
    }

    div.modal div.container-game div.board-score div.scores div.score:nth-child(even) {
        background:#ccc;
    }

    div.modal div.container-game div.board-score div.scores div.score label.right {
        float:right;
    }
</style>
