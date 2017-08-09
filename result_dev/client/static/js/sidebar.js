
// sidebar action
document.querySelectorAll("div#sidebar ul li, div.container-user").forEach((e) => {
    e.onmouseover = () => {
        $("#sidebar").style.width = "300px";
    };

    e.onmouseout = () => {
        $("#sidebar").style.width = "80px";
    };
});
