<template>
    <div class="modal modal-register">
        <div class="container-modal container-register">
            <div class="container-logo">
                <img src="./../../assets/images/logo_inverse.png" alt="logo inverse">
            </div>

            <div class="alert">
                Register to fail. Please try again
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
                    <canvas class="captcha">Browser don't support canvas</canvas>
                    <input type="text" class="form-control" placeholder="Captcha" v-model="form.captcha">
                </div>

                <div class="form-group">
                    <button class="btn-submit">
                        Register
                    </button>
                </div>
            </form>
        </div>

        <div class="close" @click="closeModal">Close</div>
    </div>
</template>

<script>
    import registerService from '@/services/register.service';

    export default {
        data() {
            return {
                form: {
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                    date_of_birth: '',
                    phone_number: '',
                    captcha: '',
                    profile_picture: ''
                }
            }
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
                registerService.register(this.form)
                    .then((response) => {
                        if(response.data.data.token) {
                            localStorage.setItem("token", response.data.data.token);

                            this.$emit('registerSuccess');
                        }
                    });
            },
            closeModal() {
                this.$emit('closeModal');
            }
        }
    }
</script>

<style>

</style>
