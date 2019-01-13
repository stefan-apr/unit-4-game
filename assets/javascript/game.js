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
        new character("T Hawk", "t-hawk", 180, 4, 20, 180),
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
        console.log("Clicked option 1");
        if(canAttack === false) {
            if(swap) {
                var currentSlot = charSlots[0];
                if(currentSlot < 12) {
                    charSlots[0] = currentSlot + 4;
                } else {
                    charSlots[0] = 0;
                }
                console.log($("#character-" + 1 + "-image").attr("src", "images/" + allChars[charSlots[0]].ID + ".png"));
                $("#character-" + 1 + "-image").attr("src", "images/" + allChars[charSlots[0]].ID + ".png");
                $("#character-" + 1 + "-name").text(allChars[charSlots[0]].name);
                swap = false;
            }  else {
                chosenCharacter = allChars[charSlots[0]];
                hideStartingList();
                populateEnemies(1);
            }
        }
    });

    $("#starting-list-2").click(function() {
        console.log("Clicked option 2");
        if(canAttack === false) {
            if(swap) {
                var currentSlot = charSlots[1];
                if(currentSlot < 12) {
                    charSlots[1] = currentSlot + 4;
                } else {
                    charSlots[1] = 1;
                }
                console.log($("#character-" + 2 + "-image").attr("src", "images/" + allChars[charSlots[1]].ID + ".png"));
                $("#character-" + 2 + "-image").attr("src", "images/" + allChars[charSlots[1]].ID + ".png");
                $("#character-" + 2 + "-name").text(allChars[charSlots[1]].name);
                swap = false;
            }  else {
                chosenCharacter = allChars[charSlots[1]];
                hideStartingList();
                populateEnemies(2);
            }
        }
    });

    $("#starting-list-3").click(function() {
        console.log("Clicked option 3");
        if(canAttack === false) {
            if(swap) {
                var currentSlot = charSlots[2];
                if(currentSlot < 12) {
                    charSlots[2] = currentSlot + 4;
                } else {
                    charSlots[2] = 2;
                }
                console.log($("#character-" + 3 + "-image").attr("src", "images/" + allChars[charSlots[2]].ID + ".png"));
                $("#character-" + 3 + "-image").attr("src", "images/" + allChars[charSlots[2]].ID + ".png");
                $("#character-" + 3 + "-name").text(allChars[charSlots[2]].name);
                swap = false;
            }  else {
                chosenCharacter = allChars[charSlots[2]];
                hideStartingList();
                populateEnemies(3);
            }
        }
    });

    $("#starting-list-4").click(function() {
        console.log("Clicked option 4");
        if(canAttack === false) {
            if(swap) {
                var currentSlot = charSlots[3];
                if(currentSlot < 12) {
                    charSlots[3] = currentSlot + 4;
                } else {
                    charSlots[3] = 3;
                }
                console.log($("#character-" + 4 + "-image").attr("src", "images/" + allChars[charSlots[3]].ID + ".png"));
                $("#character-" + 4 + "-image").attr("src", "images/" + allChars[charSlots[3]].ID + ".png");
                $("#character-" + 4 + "-name").text(allChars[charSlots[3]].name);
                swap = false;
            }  else {
                chosenCharacter = allChars[charSlots[3]];
                hideStartingList();
                populateEnemies(4);
            }
        }
    });

    function hideStartingList() {
        $("#init").css("display", "none");
    }

    function populateEnemies(chosen) {
        $("#remainder").css("display", "block");
        for(var i = 0; i < 4; i++) {
            $("#enemy-" + (i + 1) + "-name").text(allChars[charSlots[i]].name);
            $("#enemy-" + (i + 1) + "-image").attr("src", "images/" + allChars[charSlots[i]].ID + ".png");

        }
        $("#current-enemy").css("display", "none");
        $("#your-name").text(chosenCharacter.name);
        $("#your-image").attr("src", "images/" + chosenCharacter.ID + ".png");
        $("#enemy-list-" + chosen).css("display", "none");
        if(chosen == 4) {
            $("#enemy-list-" + 3).css("margin-right", "25%"); 
        }
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