$("div.wrapper-button-nav").onclick = () => {
	let state = $(".content-nav").getAttribute("data-state");

	if(state == "close") {
		$("div.wrapper-button-nav").classList.add("active");
		$(".content-nav").classList.add("active");
		$(".content-nav").setAttribute("data-state", "open");
	}else {
		$("div.wrapper-button-nav").classList.remove("active");
		$(".content-nav").classList.remove("active");
		$(".content-nav").setAttribute("data-state", "close")
	}
}