$(document).ready(function() {
    var qAndA = [
        {   question: "The adult human skeleton is made of up how many bones?",
            answers: ["128", "206", "215", "300"],
            correct: 1,
            picture: "../images/skeleton.jpeg"
        },
        {   question: "What is the name for the pigment found in your skin and hair that gives them color?",
            answers: ['Melanin', 'Cytosine', 'Adrenaline', 'Pigmentin'],
            correct: 0,
            picture: "../images/melanin.png"
        },
        {   question: "Able to be seen from outer space, what is Earth’s largest living structure?",
            answers: ['Mount Everest', 'Antartica', 'Great Wall of China', 'The Great Barrier Reef'],
            correct: 3,
            picture: "assets/images/reef.jpg"
        },
        

        ];

    var counter = 30;
    var indexArr = 0;
    var wins = 0;
    var looses = 0;
    var notAnswer = 0;

    function timerShown () {
        $('#timer').text( "Time Remaining: 30 seconds");
        
        var interval = setInterval(function() {
            counter--;
            $('#timer').text( "Time Remaining: " + counter + " seconds");
            
            if (counter == 0) {
                $('#timer').text( "Out of time!");
                clearInterval(interval);
            }
        }, 1000);
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
            alert(userChoice);

            if(userChoice === qAndA[index].correct){
                console.log('win');
                userWin();
            } else {
                console.log('loose');
            }
            
        });

    }

    function userWin () {
        wins++;
        counter = 30;
        timerShown();
        indexArr++;
        $('#answers').empty();        
        displayTrivia(indexArr);

    }

    $('.start-btn').on('click', function() {
        $(this).hide();
        timerShown();        
        displayTrivia(indexArr);

       
       
    });

    
}); 


