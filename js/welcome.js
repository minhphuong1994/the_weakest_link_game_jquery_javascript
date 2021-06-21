
$(".start").click(function () {
    let name = prompt("Input your name: ")
    let age = prompt("Input your age: ")

    let obj = { "name": name, "age": age }
    if (name != "" && name != null && age != "" && age != null) {
        $(this).attr("href", "./round1.html")
        localStorage.setItem("PLAYER", JSON.stringify(obj))
    }
    else {
        alert("You MUST give Name and Age to play this game!!");
    }
    
})