// modal actions
$("#sidebar ul li.register").onclick = () => {
    $(".modal.modal-register").classList.add("active");
};

$("button.join-us").onclick = () => {
    $(".modal.modal-register").classList.add("active");
};

$("#sidebar ul li.login").onclick = () => {
    $(".modal.modal-login").classList.add("active");
};

document.querySelectorAll(".play-game").forEach((e) => {
	e.onclick = () => {
	    $(".modal.modal-game").classList.add("active");
	};
});

document.querySelectorAll("div.close").forEach((e) => {
    e.onclick = () => {
        $(".modal.active").classList.remove("active");
    };
});
