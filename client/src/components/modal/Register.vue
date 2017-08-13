<template>
    <div class="modal modal-register">
        <div :class="['container-modal', 'container-register', { 'error': error }]">
            <div class="container-logo">
                <img src="./../../assets/images/logo_inverse.png" alt="logo inverse">
            </div>

            <div class="alert" v-if="error">
                {{ errorMsg }}

                <span @click="error = false">x</span>
            </div>

            <form class="form" @submit.prevent="register">
                <div class="form-group">
                    <label class="control-label">Name</label>
                    <input type="text" class="form-control" placeholder="Your name here" v-model="form.name">
                </div>

                <div class="form-group">
                    <label class="control-label">Username</label>
                    <input type="text" class="form-control" placeholder="Your username here" v-model="form.username">
                </div>

                <div class="form-group">
                    <label class="control-label">E-mail Address</label>
                    <input type="email" class="form-control" placeholder="Your e-mail here" v-model="form.email">
                </div>

                <div class="form-group">
                    <label class="control-label">Password</label>
                    <input type="password" class="form-control" placeholder="Your password here" v-model="form.password">
                </div>

                <div class="form-group">
                    <label class="control-label">Profile Picture</label>
                    <input type="file" class="form-control" @change="onFileChange">
                </div>

                <div class="form-group">
                    <label class="control-label">Date of Birth</label>
                    <input type="date" class="form-control" v-model="form.date_of_birth">
                </div>

                <div class="form-group">
                    <label class="control-label">Phone Number</label>
                    <input type="text" class="form-control" placeholder="Your phone number here" v-model="form.phone_number">
                </div>

                <div class="form-group">
                    <label class="control-label">Captcha</label>
                    <canvas class="captcha" id="canvas-captcha">Browser don't support canvas</canvas>
                    <input type="text" class="form-control" placeholder="Captcha" v-model="form.captcha.captcha">
                </div>

                <div class="form-group">
                    <button class="btn-submit">
                        Register
                    </button>
                </div>
            </form>

            <loading v-if="loading"></loading>
        </div>

        <div class="close" @click="closeModal">Close</div>
    </div>
</template>

<script>
    import registerService from '@/services/register.service';
    import captchaService from '@/services/captcha.service';
    import Loading from './../Loading.vue';

    export default {
        components: {
            Loading
        },
        data() {
            return {
                form: {
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                    date_of_birth: '',
                    phone_number: '',
                    captcha: {
                        captcha: '',
                        data: ''
                    },
                    profile_picture: ''
                },
                captchaData: '',
                error: false,
                errorMsg: '',
                loading: false
            }
        },
        created() {
            this.getCaptcha();
        },
        mounted() {
            window.addEventListener("keydown", (e) => {
                if(e.keyCode == 27) {
                    this.closeModal();
                }
            });
        },
        methods: {
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;

                if(!files.length) return;

                this.createImage(files[0]);
            },
            createImage(file) {
                let reader = new FileReader();
                let vm = this;
                reader.onload = (e) => {
                    vm.form.profile_picture = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            register() {
                this.loading = true;
                this.error = false;
                registerService.register(this.form)
                    .then((response) => {
                        if(response.data.data.token) {
                            localStorage.setItem("token", response.data.data.token);

                            this.reset();

                            this.loading = false;

                            this.$emit('registerSuccess');
                        }
                    })
                    .catch((error) => {
                        if(error.response.status === 400) {
                            this.errorMsg = error.response.data.data.message;
                        }else {
                            this.errorMsg = "Validation error";
                        }

                        this.error = true;

                        this.loading = false;
                    });
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
                let canvas = document.getElementById("canvas-captcha"),
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
            reset() {
                this.form.name = '';
                this.form.username = '';
                this.form.email = '';
                this.form.password = '';
                this.form.captcha.captcha = '';
                this.form.captcha.data = '';
                this.form.phone_number = '';
                this.form.date_of_birth = '';
                this.form.profile_picture = '';
                this.captchaData = { };
                this.error = false;
                this.errorMsg = false;

                this.getCaptcha();
            },
            closeModal() {
                this.reset();
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
