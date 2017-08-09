<template>
    <div class="modal modal-login">
        <div class="container-modal container-register">
            <div class="container-logo">
                <img src="./../../assets/images/logo_inverse.png" alt="logo inverse">
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
                    <canvas class="captcha"></canvas>
                    <input type="text" class="form-control" placeholder="Captcha">
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

    export default {
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                authService.login(this.form)
                    .then((response) => {
                        if(response.data.data.token) {
                            localStorage.setItem("token", response.data.data.token);

                            this.$emit('loginSuccess');
                        }
                    });
            },
            closeModal() {
                this.$emit('closeModal');
            }
        }
    }
</script>

<style></style>
