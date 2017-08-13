<template>
    <div class="modal modal-game">
        <div class="container-modal container-game">
            <div class="wrapper-game col-xs-12 col-md-8 col-lg-8">
                <div class="wrapper-play" v-show="!playing || over">
                    <label v-if="over" class="score">
                        Your score: {{ game.tetris.score }}
                    </label>
                    <button class="btn-play" @click="startPlay">
                        <span v-if="over">retry</span>
                        <span v-else-if="!playing">play</span>
                    </button>
                </div>

                <canvas v-show="playing && !over" id="canvas" width="500" height="750"></canvas>
            </div>

            <div class="board-score col-xs-12 col-md-4 col-lg-4">
                <h3>High Score</h3>

                <div class="scores" v-if="highscores.length > 0">
                    <div class="score" v-for="(highscore, k) in highscores">
                        <label class="left">{{ (k+1) }}. {{ highscore.user.username }}</label>
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

    import * as game from '../../assets/js/Tetris';

    export default {
        props: ['opened'],
        data() {
            return {
                type: 'tetris',
                highscores: [],
                playing: false,
                over: false,
                game: game.gameTetris
            }
        },
        created() {
            this.getHighScore();
        },
        mounted() {
            let canvas = document.getElementById("canvas");

            game.gameTetris.setCanvas(canvas);
        },
        watch: {
            game: {
                handler: function(val, oldVal) {
                    if(val.lost) this.saveScore();
                    if(val.close) this.closeModal();
                },
                deep: true
            },
            opened: function(opened) {
                if(opened) this.getHighScore();
            }
        },
        methods: {
            getHighScore() {
                scoreService.getHighScore(this.type)
                    .then((response) => {
                        this.highscores = response.data.data.items;
                    });
            },
            closeModal() {
                this.game.clear();
                this.playing = false;
                this.over = false;
                this.game.close = false;

                this.$emit('closeModal');
            },
            startPlay() {
                this.playing = true;
                this.over = false;

                game.gameTetris.init();
            },
            saveScore() {
                let data = {
                    type: this.type,
                    score: this.game.tetris.score
                };

                scoreService.saveScore(data)
                    .then((response) => {
                        this.over = true;
                        this.getHighScore();
                    });
            }
        }
    }
</script>

<style>
    div.modal div.container-game {
        padding:0;
        display:flex;
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
        /*display:none;*/
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
