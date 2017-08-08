
// sidebar action
document.querySelectorAll("div#sidebar ul li").forEach((e) => {
    e.onmouseover = () => {
        $("#sidebar").style.width = "300px";
    };

    e.onmouseout = () => {
        $("#sidebar").style.width = "80px";
    };
});