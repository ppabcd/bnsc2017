let current = 1, previous = 1;

addActive(current);

// slider next
function next() {
    previous = current;
    current = (current == 1) ? 2 : 1;

    removeActive(previous);
    addActive(current);

}

function addActive(index) {
    $(".slider:nth-child(" + index + ")").classList.add("slider-active");
}

function removeActive(index) {
    $(".slider:nth-child(" + index + ")").classList.remove("slider-active");
}

// slider action
document.querySelectorAll("div.wrapper-navigation div").forEach((e) => {
	e.onclick = () => {
		next();
	}
});