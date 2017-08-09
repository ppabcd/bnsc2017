<template>
    <div class="modal modal-login">
        <div class="container-modal container-register">
            <div class="container-logo">
                <img src="./../../assets/images/logo_inverse.png" alt="logo inverse">
            </div>

            <div class="alert" v-if="error">
                {{ errorMsg }}

                <span @click="error = false">x</span>
            </div>

            <form class="form" @submit.prevent="login">
                <div class="form-group">
                    <label class="control-label">E-mail Address</label>
                    <input type="email" class="form-control" placeholder="Your e-mail" v-model="form.email">
                </div>

                <div class="form-group">
                    <label class="control-label">Password</label>
                    <input type="password" class="form-control" placeholder="Your password here" v-model="form.password">
                </div>

                <div class="form-group">
                    <label class="control-label">Captcha</label>
                    <canvas class="captcha" id="captcha-login"></canvas>
                    <input type="text" class="form-control" placeholder="Captcha" v-model="form.captcha.captcha">
                </div>

                <div class="form-group">
                    <button class="btn-submit">
                        Log In
                    </button>
                </div>
            </form>
        </div>

        <div class="close" @click="closeModal">Close</div>
    </div>
</template>

<script>
    import authService from '@/services/auth.service';

    import captchaService from '@/services/captcha.service';

    export default {
        data() {
            return {
                form: {
                    email: '',
                    password: '',
                    captcha: {
                        captcha: '',
                        data: ''
                    }
                },
                captchaData: { },
                error: false,
                errorMsg: ''
            }
        },
        created() {
            this.getCaptcha();
        },
        methods: {
            login() {
                authService.login(this.form)
                    .then((response) => {
                        if(response.data.data.token) {
                            localStorage.setItem("token", response.data.data.token);

                            this.reset();

                            this.$emit('loginSuccess');
                        }
                    })
                    .catch((error) => {
                        if(error.response.status === 400) {
                            this.errorMsg = error.response.data.data.message;
                        }else if(error.response.status === 401) {
                            this.errorMsg = "Invalid credentials";
                        }else {
                            this.errorMsg = "Validation error";
                        }

                        this.error = true;
                    });
            },
            reset() {
                this.form.email = '';
                this.form.password = '';
                this.form.captcha.captcha = '';
                this.form.captcha.data = '';
                this.captchaData = { };
                this.error = false;
                this.errorMsg = false;

                this.getCaptcha();
            },
            getCaptcha() {
                captchaService.getCaptcha()
                    .then((response) => {
                        this.captchaData = response.data.data.captcha;
                        this.form.captcha.data = this.captchaData.id;

                        this.drawCaptcha();
                    });
            },
            drawCaptcha() {
                let canvas = document.getElementById("captcha-login"),
                    ctx = canvas.getContext('2d');

                canvas.width = 504;
                canvas.height = 80;

                for(let i = 0; i < this.captchaData.captcha.length; i++) {
                    this._draw(ctx, {
                        v: this.captchaData.captcha[i],
                        x: i * 80 + 80,
                        y: canvas.height / 2 + 10,
                        opacity: Math.ceil(Math.random() * 10) / 10,
                        rotate: Math.floor(Math.random() * 90) - 45
                    });
                }
            },
            _draw(ctx, opt) {
                ctx.save();

                ctx.globalAlpha = opt.opacity;
                ctx.translate(opt.x + 10, opt.y + 10);
                ctx.rotate(opt.rotate * Math.PI / 180);
                ctx.translate(-10, -10);

                ctx.font = "40px Arial";

                ctx.fillText(opt.v, 0, 0);

                ctx.globalAlpha = 1;

                ctx.restore();
            },
            closeModal() {
                this.$emit('closeModal');
            }
        }
    }
</script>

<style>
    div.alert {
        background:rgba(255, 56, 99, .3);
        border:1px solid rgba(255, 56, 99, .3);
        color:#ff3860;
        padding:8px 12px;
        margin-bottom:10px;
    }

    div.alert span {
        float:right;
        cursor:pointer;
    }
</style>
