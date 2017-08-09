<template>
    <div id="page">
        <div id="sidebar">
            <div class="container-logo">
                <img src="./../assets/images/logo.png" alt="Logo sidebar">
            </div>

            <ul v-if="!loggedIn">
                <li class="register" @click="registerActive = true">
                    <i class="fa fa-user-plus fa-2x"></i>
                    <span>Register</span>
                </li>
                <li class="login" @click="loginActive = true">
                    <i class="fa fa-sign-in fa-2x"></i>
                    <span>Log In</span>
                </li>
            </ul>
            <label v-else>
                {{ username }}
            </label>
        </div>

        <!-- RESPONSIVE NAV BAR -->
        <div class="navbar">
            <div class="container">
                <div class="container-logo">
                    <img src="./../assets/images/logo.png" alt="logo navbar">
                </div>

                <div class="container-nav">
                    <div class="wrapper-button-nav">
                        <span></span>
                    </div>
                </div>
            </div>

            <div class="content-nav" data-state="close">
                <ul>
                    <li class="register">
                        <i class="fa fa-user-plus"></i>
                        <span>Register</span>
                    </li>
                    <li class="login">
                        <i class="fa fa-sign-in"></i>
                        <span>Log In</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- CONTENT -->
        <div id="content">
            <!-- BANNER -->
            <section class="banner">
                <div class="wrapper-slider">
                    <div class="slider">
                        <img src="./../assets/images/dragon-slider.png" alt="Slider dragon" class="image-slider">

                        <div class="text-slider">
                            <h2>Endless Runner</h2>
                            <p>
                                Play this endless runner game to be a true survival!
                            </p>
                            <button class="btn-ghost play-game">
                                Play
                            </button>
                        </div>

                        <div class="overlay"></div>
                    </div>

                    <div class="slider">
                        <img src="./../assets/images/image-6.jpg" alt="Slider tetris" class="image-slider">

                        <div class="text-slider">
                            <h2>Tetris</h2>
                            <p>
                                Beat other's highscore to be the best on Tetris
                            </p>
                            <button class="btn-ghost play-game">
                                Play
                            </button>
                        </div>

                        <div class="overlay"></div>
                    </div>
                </div>

                <div class="wrapper-navigation">
                    <div class="prev">
                        &#8249;
                    </div>

                    <div class="next">
                        &#8250;
                    </div>
                </div>
            </section>

            <section class="who section-content">
                <div class="container">
                    <div class="header-content">
                        <h2 class="judul">
                            who we are
                        </h2>
                        <i class="icon-header fa fa-gamepad"></i>
                    </div>

                    <div class="flex">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget ultrices justo. Vivamus nibh augue, blandit at nisi sed, rutrum convallis nibh. Fusce a rhoncus velit. Vivamus scelerisque ante eu neque lacinia, eget fringilla ante posuere nulla facilisi.
                        </p>
                    </div>
                </div>
            </section>

            <section class="join section-content">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                            <div class="container-text-join">
                                <h3 class="text-join">Join us</h3>
                                <p class="paragraph-join">
                                    Join us now to play the best HTML5 game
                                </p>
                            </div>
                        </div>

                        <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                            <div class="container-button-join">
                                <button class="btn-ghost join-us" @click="registerActive = true">
                                    join us
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="overlay-gradient"></div>
            </section>

            <!-- GALLERY -->
            <section class="gallery section-content">
                <div class="container">
                    <div class="header-content">
                        <h2 class="judul">
                            our gallery
                        </h2>
                        <i class="icon-header fa fa-gamepad"></i>
                    </div>

                    <div class="row">
                        <div class="col-xs-12 col-lg-4">
                            <div class="container-wrapper-image container-image-1">
                                <div class="flipper">
                                    <div class="front">
                                        <img src="./../assets/images/image-1.jpg" alt="Image gallery" class="image-gallery">

                                        <div class="text-front">
                                            Play now
                                        </div>
                                    </div>

                                    <div class="back">
                                        <div class="content">
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, aliquam aliquid distinctio dolorem ducimus et fugit impedit nihil.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container-wrapper-image container-image-2">
                                <div class="flipper">
                                    <div class="front">
                                        <img src="./../assets/images/dragon-slider.png" alt="Image gallery dragon" class="image-gallery">

                                        <div class="text-front">
                                            Endless runner
                                        </div>
                                    </div>

                                    <div class="back">
                                        <div class="content">
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, aliquam aliquid distinctio dolorem ducimus et fugit impedit nihil.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xs-12 col-lg-4">
                            <div class="container-wrapper-image container-image-3">
                                <div class="flipper">
                                    <div class="front">
                                        <img src="./../assets/images/image-2.jpeg" alt="Image gallery" class="image-gallery">

                                        <div class="text-front">
                                            Super Mario
                                        </div>
                                    </div>

                                    <div class="back">
                                        <div class="content">
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, aliquam aliquid distinctio dolorem ducimus et fugit impedit nihil.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container-wrapper-image container-image-4">
                                <div class="flipper">
                                    <div class="front">
                                        <img src="./../assets/images/image-5.jpg" alt="Image gallery video-games" class="image-gallery">

                                        <div class="text-front">
                                            Video Game
                                        </div>
                                    </div>

                                    <div class="back">
                                        <div class="content">
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, aliquam aliquid distinctio dolorem ducimus et fugit impedit nihil.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xs-12 col-lg-4">
                            <div class="container-wrapper-image container-image-5">
                                <div class="flipper">
                                    <div class="front">
                                        <img src="./../assets/images/image-3.jpeg" alt="Image gallery pokemon" class="image-gallery">

                                        <div class="text-front">
                                            Pokemon Go
                                        </div>
                                    </div>

                                    <div class="back">
                                        <div class="content">
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, aliquam aliquid distinctio dolorem ducimus et fugit impedit nihil.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container-wrapper-image container-image-6">
                                <div class="flipper">
                                    <div class="front">
                                        <img src="./../assets/images/image-6.jpg" alt="Image gallery tetris" class="image-gallery">

                                        <div class="text-front">
                                            Tetris
                                        </div>
                                    </div>

                                    <div class="back">
                                        <div class="content">
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, aliquam aliquid distinctio dolorem ducimus et fugit impedit nihil.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- FOOTER -->
            <footer class="section-content">
                <div class="container">
                    <div class="row">

                        <div class="container-logo">
                            <img src="./../assets/images/logo.png" alt="Logo footer">
                        </div>

                        <ul class="social">
                            <li>
                                <a href="https://twitter.com">
                                    <i class="fa fa-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://facebook.com">
                                    <i class="fa fa-facebook-official"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://plus.google.com">
                                    <i class="fa fa-google-plus"></i>
                                </a>
                            </li>
                        </ul>

                        <p class="copyright">
                            &copy; Copyright 2017. Designed by: Yoksan Herlie
                        </p>
                    </div>
                </div>

                <div class="overlay"></div>
            </footer>
        </div>

        <modal-register
            :class="{ active: registerActive }"
            @closeModal="registerActive = false"
            @registerSuccess="getUserData">
        </modal-register>

        <modal-login
            :class="{ active: loginActive }"
            @closeModal="loginActive = false"
            @loginSuccess="getUserData">
        </modal-login>

        <modal-game></modal-game>
    </div>
</template>

<script>
    import Register from './modal/Register.vue';
    import Login from './modal/Login.vue';
    import Game from './modal/Game.vue';

    import authService from '@/services/auth.service';

    export default {
        components: {
            'modal-register': Register,
            'modal-login': Login,
            'modal-game': Game
        },
        data() {
            return {
                registerActive: false,
                loginActive: false,
                loggedIn: false,
                username: ''
            }
        },
        created() {
            this.checkAuth();
        },
        methods: {
            checkAuth() {
                authService.validateToken()
                    .then((response) => {
                        if(response.status === 200) {
                            if(response.data.authenticated) {
                                this.loggedIn = true;

                                this.getUserData();
                            }
                        }
                    })
                    .catch((error) => {
                        console.error("NOT AUTHENTICATED!!!");
                    });
            },
            getUserData() {
                this.loggedIn = true;
                authService.profile()
                    .then((response) => {
                        this.username = response.data.data.user.username;
                    })
                    .catch((error) => {
                        console.error(error, "ERROR!!!");
                    });
            }
        }
    }
</script>
