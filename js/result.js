let player
let securityCheck = 0

if (localStorage.hasOwnProperty("PLAYER")) {
    player = JSON.parse(localStorage.getItem("PLAYER"))   
    securityCheck = 1
}
else {
    alert("You MUST play the game to go to this page");  
}

$(document).ready(function () {
    if (securityCheck == 1) {
        if (player.result == "WINNER") {
            $("main h1").text(player.name+"!! you are the WINNER")
            $("#result").css("background-image", "url(img/win.png)")
        }
        if (player.result == "LOSER") {
            $("main h1").text(player.name + "!! you LOSED")
            $("#result").css("background-image", "url(img/lose.png)")
        }   
        localStorage.removeItem("PLAYER") //delete storage to reset game
    }
    else { //Prevent player from surpassing the game play       
        window.location.href = "./Welcomepage.html"
    }

})
