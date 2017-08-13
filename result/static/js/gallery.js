let offsetTop = $("section.gallery").offsetTop;

// console.log(offsetTop);

document.addEventListener("scroll", (e) => {
	let gap = offsetTop - 300;

	let scrollTop = document.body.scrollTop;

	if(scrollTop > gap) {
		addJelloAnimation();
	}else {
		removeJelloAnimation();
	}
});

function addJelloAnimation() {
	document.querySelectorAll(".container-wrapper-image").forEach((e) => {
		e.classList.add("jello");
	});
}

function removeJelloAnimation() {
	document.querySelectorAll(".container-wrapper-image").forEach((e) => {
		e.classList.remove("jello");
	});
}
