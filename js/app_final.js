let Questionnaire = [
    {
        "question": "In opera, what is the English translation of the term 'prima donna'?",
        "right": "First lady",
        "wrong1": "Young girl",
        "wrong2": "Best Woman",
        "wrong3": "Old diva",
    },
    {
        "question": "Which continent does the 'Urdu' language originate from?",
        "right": "Asia",
        "wrong1": "Europe",
        "wrong2": "South America",
        "wrong3": "Africa",
    },
    {
        "question": "What was president Richard M. Nixon's middle name?",
        "right": "Milhous",
        "wrong1": "Martin",
        "wrong2": "Michael",
        "wrong3": "Miguel",
    },
    {
        "question": "Which Charles Dickens novel opens with the line 'It was the best of times, it was the worst of times'?",
        "right": "A Tale of Two cities",
        "wrong1": "Great Expectations",
        "wrong2": "Barnaby Rudge",
        "wrong3": "Hard Times",
    },
    {
        "question": "In the United States, which mainland state extends furthest south?",
        "right": "Florida",
        "wrong1": "Texas",
        "wrong2": "Louisiana",
        "wrong3": "Alabama",
    },
    {
        "question": "In jewelry, how many karats is pure gold?",
        "right": "24",
        "wrong1": "22",
        "wrong2": "20",
        "wrong3": "35",
    },
    {
        "question": "In nature, cirrus, nimbus, and stratus are all forms of what?",
        "right": "Clouds",
        "wrong1": "Evolutionary Patterns",
        "wrong2": "Language Levels",
        "wrong3": "Grass",
    },
    {
        "question": "In sports, which baseball slugger was known as 'The Yankee Clipper'?",
        "right": "Joe DiMaggio",
        "wrong1": "Babe Ruth",
        "wrong2": "Lou Gehring",
        "wrong3": "Micky Mantie",
    },
    {
        "question": "What 'A' is both a heavy metal rock band and an infectious live stock disease?",
        "right": "Anthrax",
        "wrong1": "AC/DC",
        "wrong2": "Abasia",
        "wrong3": "Amnesia",
    },
    {
        "question": "In movies, for which film did Paul Newman win an Academy Award for Best Actor?",
        "right": "The Color of Money",
        "wrong1": "The Hustler",
        "wrong2": "Cook Hand Luke",
        "wrong3": "Cat on a Hot Tin Roof",
    },
    {
        "question": "What does the 'W' in George W. Bush stand for?",
        "right": "Walker",
        "wrong1": "William",
        "wrong2": "Waddle",
        "wrong3": "Wagner",
    },
    {
        "question": "The movies 'Get Shorty' and 'Out of Sight' were both based on novels by which writer?",
        "right": "Elmore Leonard",
        "wrong1": "Richard Yates",
        "wrong2": "Lionel Shriver",
        "wrong3": "David Nicholls",
    },
    {
        "question": "What dolls designed by artist Xavier Roberts were shoppers scrambling to buy in the 1983 Christmas season?",
        "right": "Cabbage Patch Kids",
        "wrong1": "American Girl Dolls",
        "wrong2": "Troll Dolls",
        "wrong3": "Barbies",
    },
    {
        "question": "What president of the National American Women's Suffrage Association appeared on U.S. a dollar coin?",
        "right": "Susan B.Anthony",
        "wrong1": "Elizabeth Cady Stanton",
        "wrong2": "Carrie Chapman Catt",
        "wrong3": "Anna Howard Shaw",
    },
    {
        "question": "Once the wealthiest man in the world, which American billionaire established an art museum in Malibu, California?",
        "right": "J. Paul Getty",
        "wrong1": "John D Rockefeller",
        "wrong2": "Larry Ellison",
        "wrong3": "John Jacob Astor",
    },
    {
        "question": "In geometry, how many total sides are there on a nonagon? ",
        "right": "9",
        "wrong1": "14",
        "wrong2": "10",
        "wrong3": "7",
    }
]

let Questionnaire1 = [ //Test purpose questionnaire
    {
        "question": "Question content is in here 0",
        "right": "this is right answer 0",
        "wrong1": "this is wrong aswer 1",
        "wrong2": "this is wrong aswer 2",
        "wrong3": "this is wrong aswer 3",
    },
    {
        "question": "Question content is in here 1",
        "right": "this is right answer 0",
        "wrong1": "this is wrong aswer 1",
        "wrong2": "this is wrong aswer 2",
        "wrong3": "this is wrong aswer 3",
    },
    {
        "question": "Question content is in here 2",
        "right": "this is right answer 0",
        "wrong1": "this is wrong aswer 1",
        "wrong2": "this is wrong aswer 2",
        "wrong3": "this is wrong aswer 3",
    }
]

let UsedQuestions = []

let bank = 0

let questionNumber = 1 //To identyfy number of question the player answered
let currentQuestion
let rightAnswerCounter = 0
let counter = 60 //amount of count down seconds
let timer
let securityCheck = 0
let player
let countDownElement = $("#countdown")

if (localStorage.hasOwnProperty("PLAYER")) {    
    player = JSON.parse(localStorage.getItem("PLAYER"))
    bank = player.banked
    if (player.hasOwnProperty("result") == false) {
        securityCheck = 1
    }
    else {
        alert("Cheating FOUND, restarting the game");
        localStorage.removeItem("PLAYER")
    }     
}
else {
    alert("You MUST play previous round to be able to play this round");
}

$(document).ready(function () {
    if (securityCheck==1) {
        timer = setInterval(countdown, 1000)
        $("div.inner h3").text("Welcome: " + player.name)
        currentQuestion = pickQuestion()
        console.log("Picked: " + currentQuestion)
        displayQuestion(currentQuestion)
        $("#bankPot").text("You are having $" + bank + " in the bank")
    }
    else { //Prevent player from surpassing the round1
        $("#answers .button").addClass("disabled");
        window.location.href = "./round1.html"
    }
   
})

//Click event listener on answers
$("#answers .button").click(function (e) {
    let choice
    let targeted = e.currentTarget
    if (targeted.classList.contains("button") && targeted.classList.contains("disabled") == false) {//If player clicked on the answers
        //console.log("Clicked on the button")
        choice = $(this).children(".answer").text()
        console.log("Player chose: " + choice)
        if (Questionnaire[currentQuestion].right === choice && counter > 0) {//when player's answer is correct and within the time frame
            console.log("You are right!")
            rightAnswerCounter += 1
            alert("Congratulation!\nYou have " + rightAnswerCounter+" correct answer(s)")
            if (rightAnswerCounter >= 5) { //If user answered 5 correct answers
                alert("You Are The Winner!!\nYOU WON THE PRIZE OF $" + bank)  
                clearInterval(timer)
                giveResult("WINNER")
            }

            //Change question after answered
            console.log("User keeping: $" + bank + " in bank pot")
            currentQuestion = pickQuestion()
            console.log("Picked: " + currentQuestion)
            displayQuestion(currentQuestion)
        }
        else { //when the answer is incorrect
            console.log("Losed!")
            alert("Wrong answer!!\nYOU LOSED THE GAME!!\nBYE!!!")
            bank = 0 
            player.banked = bank
            clearInterval(timer)
            giveResult("LOSER")
        }

        
    }

})


const giveResult = (result) => {
    $("#answers .button").addClass("disabled");
    player.result = result
    localStorage.setItem("PLAYER", JSON.stringify(player))
    window.location.href = "./result.html"
}


const displayQuestion = (pickedQuestion) => {
    $("#question").text(questionNumber + ": " + Questionnaire[pickedQuestion].question)
    let arrAnswers = [
        Questionnaire[pickedQuestion].right,
        Questionnaire[pickedQuestion].wrong1,
        Questionnaire[pickedQuestion].wrong2,
        Questionnaire[pickedQuestion].wrong3
    ]

    arrAnswers = shuffleAnswers(arrAnswers) //shuffle the answerS before pushing to interface
    //console.log(arrAnswers)
    let interfaces = $(".answer")
    interfaces[0].innerText = arrAnswers[0]
    interfaces[1].innerText = arrAnswers[1]
    interfaces[2].innerText = arrAnswers[2]
    interfaces[3].innerText = arrAnswers[3]

    UsedQuestions.push(pickedQuestion)
    questionNumber += 1
    console.log("Next question: " + questionNumber)

}

const shuffleAnswers = (arr) => {
    let j
    let temp
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * i)
        temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
    return arr
}


//Counting down time
const countdown = () => {
    countDownElement.text(counter)
    console.log(counter)

    if (counter == 0) { //stop repeating again when counter reach 0
        localStorage.removeItem("BANKED")
        localStorage.removeItem("PLAYER")
        setTimeout(function () {            
            clearInterval(timer)
            alert("Time is OVER!!\nYou Are The Weakest Link!!")
            giveResult("LOSER")
        }, 10)        
    }
    counter -= 1
}

//Picking random question in questionaire except the used one
const pickQuestion = () => {
    let rand = Math.floor(Math.random() * Questionnaire.length)

    return isUsed(rand) ? pickQuestion() : rand
}

//Checking if the question is used or not
const isUsed = (rand) => {
    for (var i = 0; i < UsedQuestions.length; i++) {
        if (parseInt(UsedQuestions[i]) == rand) {
            return true
        }
    }
    return false
}