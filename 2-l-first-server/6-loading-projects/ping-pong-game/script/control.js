    // fetching elements
    const ball = document.getElementById("ball");  //fetching the ball from html page.
    let player1 = document.getElementById("player1");  // top bar
    let player2 = document.getElementById("player2");   // bottom bar
    let message = document.getElementById("message");  // this object wiil be used to show the message on the screen.
    
    let screenData = [document.body.scrollWidth,document.body.scrollHeight]; // here extracting the info of the screen to setup the view
    let playerWidth = 200;          // this decide the width of the player can be used to set level by incresing and decresing the value.
    //computing the range of motion for ball and player bars.
    let playerRightLimit = screenData[0]-playerWidth-1;
    let playerLeftLimit = 1;
    let ballDia = 50;// ball diamieter in pixles.
    const ballLimits = [screenData[1]-ballDia-1,screenData[0]-ballDia-1,1,1];
    
    let id;  // become the id of the interval and will be used to terminate the game.
    let playerStep=50;  // it is the movement done by player in one key press
    let ballStep=20;  // it is the movement done by ball for each frame.
    let direction = true // currently this is showing that ball is moving up and other value will show downword direction.
    let slope = -1; // this will decide the angle at which this ball will move.
    let score = 0; // usd to calculate the score of the current running game.
    let isGameRunning = false; // store the current condition of the game.
    
    
    //this object has all inforamtion for the current frame of the game and will be updated as game forwards.
    let gf = { 
        ballX:ballLimits[1]/2,
        ballY:ballLimits[2],
        playerPos:playerRightLimit/2,
        update:function(ballX,ballY,playerPos){  //to update all the gf properties at single call
            this.ballX = ballX;
            this.ballY = ballY;
            this.playerPos = playerPos;
        },
        setView:function(){  // this will update the user screen view.
            player1.style.left = (this.playerPos)+"px";
            player2.style.left = (this.playerPos)+"px";
            ball.style.left = this.ballX+"px";
            ball.style.bottom = this.ballY+"px"
        }
    };
    
    function initailState(){ // initial state of the game.
        if(direction){
            gf.update(ballLimits[1]/2,ballLimits[2]+21,playerRightLimit/2);
        }else gf.update(ballLimits[1]/2,ballLimits[0]-21,playerRightLimit/2);
        gf.setView(); 
    }

    function checkBoundry(){
        // it will check whether ball touching the boundry and make related calls.
        if(gf.ballX+ballStep/2>ballLimits[1] || gf.ballX-ballStep/2<ballLimits[3]){
            slope *= -1;
        } 
        if(gf.ballY+20>ballLimits[0]){
            if(gf.ballX>=gf.playerPos-ballDia/2 && gf.ballX<=gf.playerPos+playerWidth-ballDia/2){
                console.log("play is safe",score);
                score+=50;
                slope*= -1;
                direction = false;  
            }else terminateSession();
        }
        if(gf.ballY-20<ballLimits[2]){
            if(gf.ballX>=gf.playerPos-ballDia/2 && gf.ballX<=gf.playerPos+playerWidth-ballDia/2){
                console.log("play is safe",score);
                score+=50;
                slope*=-1;
                direction = true;
            }else terminateSession();
            
        }
    }
    function setBall(){
        // this function will find the next move of the ball and update into the frame.
        var k = ballStep/(Math.sqrt(slope*slope+1));
        if((slope>0&&direction)||(slope<0 && !direction)){
            gf.ballX = gf.ballX+k;
            gf.ballY = gf.ballY+k*slope;
        }else if((slope<0&&direction)||(slope>0 && !direction)){
            gf.ballX = gf.ballX-k;
            gf.ballY = gf.ballY-k*slope;
            // console.log(gf.ballX,gf.ballY,k)
        }
    }

    function movePlayer(playerStep){
        // move the player bar left or right.
        var check = gf.playerPos;
        // console.log("movePlayer", gf.playerPos,playerStep);
        if(gf.playerPos+playerStep>=playerLeftLimit && gf.playerPos+playerStep<playerRightLimit){
            gf.playerPos +=playerStep;
        }
        else if(gf.playerPos+playerStep<=playerRightLimit) gf.playerPos = playerLeftLimit;
        else if(gf.playerPos) gf.playerPos = playerRightLimit;
        if(gf.playerPos!=check) gf.setView();
    }

    // this is handling all the key press in the whole process
    window.addEventListener("keydown",handleKeypress);
    function handleKeypress(e){
        // var pressvalue = e.keyCode;
        if(e.keyCode == 39) movePlayer(playerStep); // bar move right by right arrow
        else if(e.keyCode == 37) movePlayer(-1*playerStep); // bar move left by left arrow
        else if(e.keyCode == 13 && !isGameRunning){  // game will start 
            isGameRunning = true;
            message.classList.add("hide-message"); // hide the message from the game.
            console.log("this is start")
            id = setInterval(() => {
                checkBoundry();
                setBall();
                gf.setView();
            }, 50);
        }
        else if(e.keyCode == 27 && isGameRunning){
            console.log("this is end")
            terminateSession();
        }
    }
    function terminateSession(){
        
        isGameRunning = false;
        clearInterval(id);
        initailState();
        if(!localStorage.hasOwnProperty("highScore")){
            localStorage.setItem("highScore",score);
        }else{
            if(parseInt(localStorage.getItem("highScore"))>=score){
                message.innerHTML = "Hey try again <br> your score - "+score+" <br>High score - "+localStorage.getItem("highScore");
            }else{
                message.innerHTML = "Hey! Hey!  you set the new <br>High score to -- "+score;
                localStorage.highScore = score;
            }
        }
        showMessage(true);
        score = 0;
    }
    initailState();
    showMessage();
    function showMessage(mes){
        message.classList.remove("hide-message");
        if(mes){
            message.innerHTML += "<br> Press Enter to play more"
        }else{
            if(!localStorage.hasOwnProperty("highScore")){
                message.innerHTML = "You are the first player <br>Press 'ENTER' to start game";
            }
            else{
                message.innerHTML = "highest score is "+ localStorage.highScore+ "<br> Press enter to start game"
            }
        }

    }


    
