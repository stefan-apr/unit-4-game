$(document).ready(function() {
    var allChars = [
        new character("Ryu", "ryu", 120, 8, 10, 120),
        new character("Chun Li", "chun-li", 100, 12, 5, 100),
        new character("Hugo", "hugo", 180, 4, 20, 180),
        new character("M. Bison", "bison", 150, 6, 25, 150),
        new character("Ken", "ken", 120, 8, 10, 120),
        new character("Rose", "rose", 100, 12, 5, 100),
        new character("Alex", "alex", 180, 4, 20, 180),
        new character("Seth", "seth", 150, 6, 25, 150),
        new character("Gouken", "gouken", 120, 8, 10, 120),
        new character("Ibuki", "ibuki", 100, 12, 5, 100),
        new character("Zangief", "zangief", 180, 4, 20, 180),
        new character("Akuma", "akuma", 150, 6, 25, 150),
        new character("Sakura", "sakura", 120, 8, 10, 120),
        new character("Dan", "dan", 100, 12, 5, 100),
        new character("T. Hawk", "t-hawk", 180, 4, 20, 180),
        new character("Oni", "oni", 150, 6, 25, 150)
    ];

    var allStages = [
        new stage("Training Stage", "training"),
        new stage("Kanzuki Estate", "estate"),
        new stage("Suzaku Castle", "castle"),
        new stage("Dojo", "dojo"),
        new stage("English Manor", "manor"),
        new stage("Metro City Bay Area", "bay"),
        new stage("King's Court", "court"),
        new stage("Ring of Power", "power"),
        new stage("Shadaloo Base", "base"),
        new stage("Temple Hideout", "hideout"),
        new stage("The Pitstop 109", "pitstop"),
        new stage("The Halfpipe", "halfpipe"),
        new stage("Old Temple", "temple"),
        new stage("Cosmic Elevator", "elevator")
    ];

    var charSlots = [0, 1, 2, 3];

    // Defines the player's character
    var chosenCharacter = null;
    // Defines the enemy character to fight
    var enemyCharacter = null;
    // Defines the first stage to be loaded
    var currentStage = allStages[0];
    // Counts the number of attack turns taken
    var turnsTaken = 0;
    // Counts the number of enemies defeated
    var enemiesDefeated = 0;
    // Keeps track of whether or not character swaps are allowed
    var enableSwapping = true;
    // Determines whether or not a game is in progress
    var canAttack = false;
    // Determines whether the swap button was just clicked
    var swap = false;
    // Flag determining whether an enemy can be selected
    var changeEnemies = false;
    // Number of enemies remaining to fight
    var enemiesLeft = 3;
    // Which enemies are available to fight
    var enemiesInList = [];

    reset();

    // Defines a character object.
    function character(name, ID, health, attackPow, counterPow, maxHealth) {
        this.name = name;
        this.ID = ID;
        this.health = health;
        this.attackPow = attackPow;
        this.counterPow = counterPow;
        this.maxHealth = maxHealth;
    }

    // Defines a stage object. These are used to generate the background.
    function stage(name, ID) {
        this.name = name;
        this.ID = ID;
    }

    // Resets the game to its original state
    function reset() {
        for(var i = 0; i < allChars.length; i++) {
            allChars[i].health = allChars[i].maxHealth;
        }
        if(chosenCharacter !== null) {
            chosenCharacter.attackPow = (chosenCharacter.attackPow / (turnsTaken + 1));
        }
        console.log("images/" + currentStage.ID + ".jpg");
        $("#fight-area").css("background-image", "images/training.jpg");
        $("#fight-area").css("background-size", "contain");
        $("#fight-area").css("background-repeat", "no-repeat");
        $("#fight-area").css("width", "100%");
        $("#fight-area").css("height", "1000px");

        turnsTaken = 0;
        enemiesDefeated = 0;
        chosenCharacter = null;
        enemyCharacter = null;
        canAttack = false;
        enableSwapping = true;
        changeEnemies = false;
        enemiesLeft = 3;
        enemiesInList = [];
        charSlots = [0, 1, 2, 3];
        for(var i = 0; i < 4; i++) {
            console.log($("#character-" + (i + 1) + "-image").attr("src", "images/" + allChars[i].ID + ".png"));
            $("#character-" + (i + 1) + "-image").attr("src", "images/" + allChars[i].ID + ".png");
        }
    }

    // Logic that handles attacking
    $("#attack-button").click(function() {
        console.log("Clicked attack");
        if(canAttack) {
            enemyCharacter.health -= chosenCharacter.attackPow;
            chosenCharacter.health -= enemyCharacter.counterPow;
            if(chosenCharacter.health <= 0) {
                turnsTaken++;
                gameOver(false);
                return;
            }
            if(enemyCharacter.health <= 0) {
                enemiesDefeated++;
                if(enemiesDefeated == 3) {
                    turnsTaken++;
                    gameOver(true);
                    return;
                } else {
                    changeEnemies = true;
                    canAttack = false;
                }
            }
            turnsTaken++;
            chosenCharacter.attackPow += (chosenCharacter.attackPow / (turnsTaken + 1));
        }
    });

    $("#cycle-button").click(function() {
        console.log("Clicked cycle");
        if(enableSwapping) {
            swap = true;
        }
    });

    $("#starting-list-1").click(function() {
        handlePlayerClick(1);
    });
    $("#starting-list-2").click(function() {
        handlePlayerClick(2);
    });
    $("#starting-list-3").click(function() {
        handlePlayerClick(3);
    });
    $("#starting-list-4").click(function() {
        handlePlayerClick(4);
    });

    $("#enemy-list-1").click(function() {
        handleEnemyClick(1);
    });
    $("#enemy-list-2").click(function() {
        handleEnemyClick(2);
    });
    $("#enemy-list-3").click(function() {
        handleEnemyClick(3);
    });
    $("#enemy-list-4").click(function() {
        handleEnemyClick(4);
    });

    function handlePlayerClick(position) {
        console.log("Clicked character " + position);
        if(canAttack === false) {
            if(swap) {
                var currentSlot = charSlots[position - 1];
                if(currentSlot < 12) {
                    charSlots[position - 1] = currentSlot + 4;
                } else {
                    charSlots[position - 1] = position - 1;
                }
                console.log($("#character-" + position + "-image").attr("src", "images/" + allChars[charSlots[position - 1]].ID + ".png"));
                $("#character-" + position + "-image").attr("src", "images/" + allChars[charSlots[position - 1]].ID + ".png");
                $("#character-" + position + "-name").text(allChars[charSlots[position - 1]].name);
                swap = false;
            }  else {
                chosenCharacter = allChars[charSlots[position - 1]];
                hideStartingList();
                populateEnemies(position);
            }
        }
    }

    function handleEnemyClick(position) {
        console.log("Clicked enemy " + position);
        if(changeEnemies) {
            enemyCharacter = allChars[charSlots[(position - 1)]];
            console.log(enemyCharacter);
            $("#current-enemy").css("display", "block");
            $("#enemy-name").text(enemyCharacter.name);
            $("#enemy-image").attr("src", "images/" + enemyCharacter.ID + ".png");
            $("#enemy-health").text(enemyCharacter.health);
            canAttack = true;
            $("#enemy-list-" + position).css("display", "none");
            var index = enemiesInList.indexOf(position - 1);
            if (index !== -1) {
                enemiesInList.splice(index, position);
                enemiesLeft--;
            }
            console.log(enemiesInList);
            console.log(enemiesLeft);
            var lastInList = enemiesInList.pop();

            for(var i = 0; i < 4; i++) {
                $("#enemy-list-" + (i + 1)).css("margin-right", "0%");
            }
            
            $("#enemy-list-" + (lastInList + 1)).css("margin-right", "" + (enemiesLeft * 25) + "%");
            enemiesInList.push(lastInList);
        }
    }

    function hideStartingList() {
        $("#init").css("display", "none");
    }

    function populateEnemies(chosen) {
        $("#remainder").css("display", "block");
        for(var i = 0; i < 4; i++) {
            $("#enemy-" + (i + 1) + "-name").text(allChars[charSlots[i]].name);
            $("#enemy-" + (i + 1) + "-image").attr("src", "images/" + allChars[charSlots[i]].ID + ".png");
            $("#enemy-" + (i + 1) + "-health").text(allChars[charSlots[i]].health);
            if(i !== chosen - 1) {
                enemiesInList.push(i);
            }
        }
        $("#current-enemy").css("display", "none");
        $("#your-name").text(chosenCharacter.name);
        $("#your-image").attr("src", "images/" + chosenCharacter.ID + ".png");
        $("#your-health").text(chosenCharacter.health);
        $("#enemy-list-" + chosen).css("display", "none");
        if(chosen == 4) {
            $("#enemy-list-" + 3).css("margin-right", "25%"); 
        }
        console.log(enemiesInList);
        changeEnemies = true;
        canAttack = false;
    }

    // WIP
    function gameOver(winner) {
        if(winner) {
            console.log("You won");
        } else {
            console.log("You lost");
        }
    }


});