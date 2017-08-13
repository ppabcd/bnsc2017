let offsetTop = $("section.gallery").offsetTop;

// console.log(offsetTop);

document.addEventListener("scroll", (e) => {
	let gap = offsetTop - 300;

	let scrollTop = document.body.scrollTop;

	// console.log(gap, scrollTop);

	if(scrollTop > gap) {
		addJelloAnimation();		
	}else {
		removeJelloAnimation();
	}
});

function addJelloAnimation() {
	document.querySelectorAll(".container-wrapper-image").forEach((e) => {
		// console.log('give animation');
		e.classList.add("jello");
	});
}

function removeJelloAnimation() {
	document.querySelectorAll(".container-wrapper-image").forEach((e) => {
		// console.log('removing animation');
		e.classList.remove("jello");
	});
}