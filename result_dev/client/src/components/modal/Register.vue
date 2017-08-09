<template>
    <div class="modal modal-register">
        <div class="container-modal container-register">
            <div class="container-logo">
                <img src="./../../assets/images/logo_inverse.png" alt="logo inverse">
            </div>

            <div class="alert">
                Register to fail. Please try again
            </div>

            <form class="form">
                <div class="form-group">
                    <label class="control-label">Name</label>
                    <input type="text" class="form-control" placeholder="Your name here">
                </div>

                <div class="form-group">
                    <label class="control-label">Username</label>
                    <input type="text" class="form-control" placeholder="Your username here">
                </div>

                <div class="form-group">
                    <label class="control-label">E-mail Address</label>
                    <input type="email" class="form-control" placeholder="Your e-mail here">
                </div>

                <div class="form-group">
                    <label class="control-label">Password</label>
                    <input type="password" class="form-control" placeholder="Your password here">
                </div>

                <div class="form-group">
                    <label class="control-label">Date of Birth</label>
                    <input type="date" class="form-control">
                </div>

                <div class="form-group">
                    <label class="control-label">Phone Number</label>
                    <input type="text" class="form-control" placeholder="Your phone number here">
                </div>

                <div class="form-group">
                    <label class="control-label">Captcha</label>
                    <canvas class="captcha">Browser don't support canvas</canvas>
                    <input type="text" class="form-control" placeholder="Captcha">
                </div>

                <div class="form-group">
                    <button class="btn-submit">
                        Register
                    </button>
                </div>
            </form>
        </div>

        <div class="close">Close</div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>

</style>
