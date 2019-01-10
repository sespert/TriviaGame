$(document).ready(function() {

//Object with the set of questions, answers, correct answer and picture associated to that question
    var qAndA = [
        {   question: "The adult human skeleton is made of up how many bones?",
            answers: ["128", "206", "215", "300"],
            correct: 1,
            picture: "assets/images/skeleton.gif"
        },
        {   question: "What is the name for the pigment found in your skin and hair that gives them color?",
            answers: ['Melanin', 'Cytosine', 'Adrenaline', 'Pigmentin'],
            correct: 0,
            picture: "assets/images/melanin.png"
        },
        {   question: "Able to be seen from outer space, what is Earth’s largest living structure?",
            answers: ['Mount Everest', 'Antartica', 'Great Wall of China', 'The Great Barrier Reef'],
            correct: 3,
            picture: "assets/images/coral.gif"
        },
        {
            question: "What is the name for the upper arm bone found in humans?",
            answers: ["Humerus", "Femur", "Radius", "Ulna"],
            correct: 0,
            picture: "assets/images/humerus.jpg"
        
        },
        {
            question: "The world’s fastest growing plant is a species of what?",
            answers: ["Grass", "Common Ivy", "Bamboo", "Ipomoea"],
            correct: 2,
            picture: "assets/images/bamboo.gif"
        
        },
        {
            question: "In 1796 Edward Jenner developed the vaccination for what disease?",
            answers: ["Polio", "Measles", "Flu", "Smallpox"],
            correct: 3,
            picture: "assets/images/smallpox.png"
        
        },
        {
            question: "Which scientist is considered the father of modern genetics?",
            answers: ["Charles Darwin", "Gregor Mendel", "Louis Pasteur", "Francis Watson"],
            correct: 1,
            picture: "assets/images/mendel.gif"
        
        },
        {
            question: "What is the most common blood type in humans?",
            answers: ["0+", "A+", "0-", "AB"],
            correct: 0,
            picture: "assets/images/blood.jpg"
        
        },
        ];

//Global variables that hold the index of the object to select questions and answers, counter with question
//number, counters for wins, looses and unanwsered questions, and the timer variables.
    var indexArr = 0;
    var totalQuestions = 8;
    var wins = 0;
    var looses = 0;
    var notAnswer = 0;
    var intervalId;
    var clockRunning = false;
    var time = 30;

//Functions for the timer:
//Starting the timer
    function start() {
        if(!clockRunning) {
            intervalId = setInterval(count, 1000);
            clockRunning = true;
        }
    }
//Stopping the timer
    function stop() {
        clearInterval(intervalId);
        clockRunning = false;
    }
//Making the timer count back
    function count() {
        $('#timer').html("<h2>Time Remaining: " + time + " seconds</h2>");
        time--;
    //Function that executes when user doesn't answer question within the time given    
        if (time == 0) {
            stop();
            outOfTime(indexArr); 
            setTimeout(function() {
                userNotAnswer(indexArr);
            }, 3000); 
        }
    }    

 //Function that displays the question and the answers to select for that question   
    function displayTrivia (index) {      
            var screenQuestion = qAndA[index].question;
            $('#question').html("<h2>" + screenQuestion + "</h2>");
        
            var screenAnswers = qAndA[index].answers;
        
            for(var i=0; i<screenAnswers.length; i++) {
                var answList = $('<h2>');
                answList.attr('value', i).text(screenAnswers[i]);
                $('#answers').append(answList);
            }

            $('#answers h2').mouseover(function() {
                $(this).css('background-color', '#7FFFD4');
            }).mouseout(function(){
                $(this).css('background-color', 'transparent');
            });
        //When user clicks on an answer, executes this and check wether is the correct option or not
            $('#answers h2').on('click', function() {            
                var userChoice = parseInt($(this).attr('value'));
        
                if(userChoice === qAndA[index].correct){
                stop();
                correctAnswer(indexArr); 
                setTimeout(function() {
                    userWin(indexArr);
                }, 3000);
                
                } else {
                stop();
                wrongAnswer(indexArr);
                setTimeout(function() {
                    userLooses(indexArr);
                }, 3000);
                }
             
            })

    }

//Functions for each of the outcomes of the user interaction:
//Answer is correct
    function correctAnswer(index) {
        $('#timer').empty();
        $('#question').html("<h2>You're Correct!</h2>");
        $('#answers').empty(); 
        $('#answers').prepend('<img src= "' + qAndA[index].picture + '" width="350" />');
       
    }
//Uer didn't choose answer on time
    function outOfTime (index) {
        $('#timer').empty();
        $('#question').html("<h2>Oh No!! You're Out Of Time!</h2>");
        $('#answers').empty(); 
        var rightAnswer = qAndA[index].correct;
        $('#answers').html("<h2>The Correct Answer was: " + qAndA[index].answers[rightAnswer] +"</h2>");
        $('#answers').append('<img src= "' + qAndA[index].picture + '"  width="350"/>');
    }
//Answer is wrong
    function wrongAnswer(index) {
        $('#timer').empty();
        $('#question').html("<h2>That's Not The Answer!</h2>");
        $('#answers').empty(); 
        var rightAnswer = qAndA[index].correct;
        $('#answers').html("<h2>The Correct Answer was: " + qAndA[index].answers[rightAnswer] + "</h2>");
        $('#answers').append('<img src= "' + qAndA[index].picture + '" width="350"/>');
    }

//Functions that execute when user chooses an answer
//If correct:
    function userWin () {        
        totalQuestions--;
        wins++;
        time=30;        
        start();        
        indexArr++;
        $('#answers').empty();
        if(totalQuestions===0) {
            finalStats();
        } else {
            displayTrivia(indexArr);
        }   
    }
//If not answered
    function userNotAnswer() {
        totalQuestions--;
        notAnswer++;
        time=30; 
        start();        
        indexArr++;
        $('#answers').empty();        
        if(totalQuestions===0) {
            finalStats();
        } else {
            displayTrivia(indexArr);
        }  
    }
//If wrong
    function userLooses() {
        totalQuestions--;
        looses++;
        time=30; 
        start(); 
        indexArr++;
        $('#answers').empty();        
        if(totalQuestions===0) {
            finalStats();
        } else {
            displayTrivia(indexArr);
        }  
    }

//Displays final statistics when game is over
    function finalStats() {
        stop();
        $('#timer').empty();
        $('#question').html("<h2>" + "Game Over! Here's how you did..." + "</h2>");        
        $('#answers').html("<h4>" + "Correct Answers: " + wins + "</h4>");
        $('#answers').append("<h4>" + "Incorrect Answers: " + looses + "</h4>");
        $('#answers').append("<h4>" + "Unanswered: " + notAnswer + "</h4>");
        $('#answers').append("<h3>Your final score is " + ((wins/8) *100) + "%");
        $('.restart-btn').show();
        indexArr = 0;
        wins = 0;
        looses = 0;
        notAnswer = 0; 
    }


//After loading page, the reset button is hidden...
    $('.restart-btn').hide();
//... the user has to click on the start button to begin game, by displaying timer and questions
    $('.start-btn').on('click', function() {
        $(this).hide();
        start();
        displayTrivia(indexArr);    
    })   
//After all questions were shown, the restart button appears in case user wants to play again
    $(".restart-btn").on('click', function() {
        $(this).hide();
        $('#question').empty();
        $('#answers').empty();
        start();
        displayTrivia(indexArr);    
    })
}); 


