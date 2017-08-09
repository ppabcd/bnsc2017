<template>
    <div class="modal modal-login">
        <div class="container-modal container-register">
            <div class="container-logo">
                <img src="./../../assets/images/logo_inverse.png" alt="logo inverse">
            </div>

            <form class="form">
                <div class="form-group">
                    <label class="control-label">E-mail Address</label>
                    <input type="email" class="form-control" placeholder="Your e-mail">
                </div>

                <div class="form-group">
                    <label class="control-label">Password</label>
                    <input type="password" class="form-control" placeholder="Your password here">
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

        <div class="close">Close</div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style></style>
