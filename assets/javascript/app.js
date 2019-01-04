$(document).ready(function() {
    var qAndA = [
        {   question: "The adult human skeleton is made of up how many bones?",
            answers: ["128", "206", "215", "300"],
            correct: 1,
            picture: "assets/images/skeleton.jpeg"
        },
        {   question: "What is the name for the pigment found in your skin and hair that gives them color?",
            answers: ['Melanin', 'Cytosine', 'Adrenaline', 'Pigmentin'],
            correct: 0,
            picture: "assets/images/melanin.png"
        },
        {   question: "Able to be seen from outer space, what is Earth’s largest living structure?",
            answers: ['Mount Everest', 'Antartica', 'Great Wall of China', 'The Great Barrier Reef'],
            correct: 3,
            picture: "assets/images/reef.jpg"
        },
        

        ];

    var indexArr = 0;
    var totalQuestions = 3;
    var wins = 0;
    var looses = 0;
    var notAnswer = 0;
    var intervalId;
    var clockRunning = false;
    var time = 10;

    function reset() {
        time = 10;
        $('#timer').text( "Time Remaining: 10 seconds");
    }

    function start() {
        if(!clockRunning) {
            intervalId = setInterval(count, 1000);
            clockRunning = true;
        }
    }

    function stop() {
        clearInterval(intervalId);
        clockRunning = false;
    }

    function count() {
        time--;
        $('#timer').text( "Time Remaining: " + time + " seconds");
        if (time == 0) {
            stop();
            outOfTime(indexArr); 
            setTimeout(function() {
                userNotAnswer(indexArr);
            }, 2000); 
        }
    }
    
    
    function displayTrivia (index) {      
            var screenQuestion = qAndA[index].question;
            $('#question').text(screenQuestion);
        
            var screenAnswers = qAndA[index].answers;
        
            for(var i=0; i<screenAnswers.length; i++) {
                var answList = $('<h4>');
                answList.attr('value', i).text(screenAnswers[i]);
                $('#answers').append(answList);
            }

            $('#answers h4').on('click', function() {            
                var userChoice = parseInt($(this).attr('value'));
        
                if(userChoice === qAndA[index].correct){
                stop();
                correctAnswer(indexArr); 
                setTimeout(function() {
                    userWin(indexArr);
                }, 2000);
                
                } else {
                stop();
                wrongAnswer(indexArr);
                setTimeout(function() {
                    userLooses(indexArr);
                }, 2000);
                }
             
            })

    }

    function correctAnswer(index) {
        $('#timer').empty();
        $('#question').text("That's Correct!");
        $('#answers').empty(); 
        $('#answers').prepend('<img src= "' + qAndA[index].picture + '" width="350" />');
       
    }

    function outOfTime (index) {
        $('#timer').empty();
        $('#question').text("You're Out Of Time!");
        $('#answers').empty(); 
        var rightAnswer = qAndA[index].correct;
        $('#answers').text("The Correct Answer was: " + qAndA[index].answers[rightAnswer]);
        $('#answers').append('<img src= "' + qAndA[index].picture + '"  width="350"/>');
    }

    function wrongAnswer(index) {
        $('#timer').empty();
        $('#question').text("That's Incorrect!");
        $('#answers').empty(); 
        var rightAnswer = qAndA[index].correct;
        $('#answers').text("The Correct Answer was: " + qAndA[index].answers[rightAnswer]);
        $('#answers').append('<img src= "' + qAndA[index].picture + '" width="350"/>');
    }

    function userWin () {        
        totalQuestions--;
        wins++;
        reset();
        start();        
        indexArr++;
        $('#answers').empty();
        if(totalQuestions===0) {
            finalStats();
        } else {
            displayTrivia(indexArr);
        }   
        

    }

    function userNotAnswer() {
        totalQuestions--;
        notAnswer++;
        reset();
        start();        
        indexArr++;
        $('#answers').empty();        
        if(totalQuestions===0) {
            finalStats();
        } else {
            displayTrivia(indexArr);
        }  
    }

    function userLooses() {
        totalQuestions--;
        looses++;
        reset();
        start(); 
        indexArr++;
        $('#answers').empty();        
        if(totalQuestions===0) {
            finalStats();
        } else {
            displayTrivia(indexArr);
        }  
    }

    function finalStats() {
        stop();
        $('#timer').empty();
        $('#question').text("All Done. Here's how you did!");        
        $('#answers').html("<h4>" + "Correct Answers: " + wins + "</h4>");
        $('#answers').append("<h4>" + "Incorrect Answers: " + looses + "</h4>");
        $('#answers').append("<h4>" + "Unanswered: " + notAnswer + "</h4>");
        $('.restart-btn').show();
        indexArr = 0;
        wins = 0;
        looses = 0;
        notAnswer = 0; 
    }

    $('.restart-btn').hide();

    $('.start-btn').on('click', function() {
        $(this).hide();
        start();
        displayTrivia(indexArr);
    
        
    })

   

    $(".restart-btn").on('click', function() {
        $(this).hide();
        $('#question').empty();
        $('#answers').empty();
        start();
        displayTrivia(indexArr);
    
    })
    

    

}); 


