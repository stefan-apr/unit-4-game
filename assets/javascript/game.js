$(document).ready(function() {
    // Holds all playable and enemy characters
    var allChars = [
        new character("Ryu", "ryu", 120, 12, 10, 60),
        new character("Chun Li", "chun-li", 100, 14, 7, 40),
        new character("Hugo", "hugo", 180, 7, 15, 90),
        new character("M. Bison", "bison", 150, 10, 20, 70),
        new character("Ken", "ken", 120, 12, 10, 60),
        new character("Rose", "rose", 100, 14, 7, 40),
        new character("Alex", "alex", 180, 7, 15, 90),
        new character("Seth", "seth", 150, 10, 20, 70),
        new character("Gouken", "gouken", 120, 12, 10, 60),
        new character("Ibuki", "ibuki", 100, 14, 7, 40),
        new character("Zangief", "zangief", 180, 7, 15, 90),
        new character("Akuma", "akuma", 150, 10, 20, 70),
        new character("Sakura", "sakura", 120, 12, 10, 60),
        new character("Dan", "dan", 100, 12, 7, 20),
        new character("T. Hawk", "t-hawk", 180, 7, 15, 90),
        new character("Oni", "oni", 150, 10, 20, 70)
    ];
    // Holds all stages that can be randomly chosen to fight on
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

    // Defines the position in "allChars" held by each character slot
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
    function character(name, ID, health, attackPow, counterPow, stun) {
        this.name = name;
        this.ID = ID;
        this.health = health;
        this.attackPow = attackPow;
        this.counterPow = counterPow;
        this.maxHealth = health;
        this.stun = stun;
        this.stunned = false;
        this.canBeStunned = true;
        this.initialAttack = attackPow;
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
            allChars[i].stunned = false;
            allChars[i].canBeStunned = true;
        }
        if(chosenCharacter !== null) {
            chosenCharacter.attackPow = chosenCharacter.initialAttack;
        }
        currentStage = allStages[0];
        $("#stage-img").attr("src", "images/" + currentStage.ID + ".jpg");
        $("#stage-name").text("Current Stage: Training Stage");
        turnsTaken = 0;
        enemiesDefeated = 0;
        chosenCharacter = null;
        enemyCharacter = null;
        canAttack = false;
        enableSwapping = true;
        changeEnemies = false;
        swap = false;
        enemiesLeft = 3;
        enemiesInList = [];
        charSlots = [0, 1, 2, 3];
        for(var i = 0; i < 4; i++) {
            $("#character-" + (i + 1) + "-image").attr("src", "images/" + allChars[i].ID + ".png");
            $("#starting-list-" + (i + 1)).css("display", "block");
        }
        $("#remainder").css("display", "none");
        $("#init").css("display", "block");
        $(".update-text").css("color", "black");
        $(".update-text").css("font-weight", "normal");
        $(".update-text").text("");
    }

    // Logic that handles attacking
    $("#attack-button").click(function() {
        if(canAttack) {
            if(!enemyCharacter.stunned) {
                chosenCharacter.health -= enemyCharacter.counterPow;
                if(enemyCharacter.counterPow >= chosenCharacter.stun && chosenCharacter.canBeStunned) {
                    chosenCharacter.stunned = true;
                    $("#their-hit").text("You were hit by " + enemyCharacter.name + " for " + enemyCharacter.counterPow + " damage! They've stunned you!");
                    // TODO: Add a stun graphic on player character here
                } else {
                    $("#their-hit").text("You were hit by " + enemyCharacter.name + " for " + enemyCharacter.counterPow + " damage!");
                }
            } else {
                $("#their-hit").text("Your enemy is stunned! They couldn't attack!");
                enemyCharacter.stunned = false;
                enemyCharacter.canBeStunned = false;
                // TODO: Remove stun graphic on enemy character
            }
            if(!chosenCharacter.stunned) {
                // TODO: Remove stun graphic on player character

                enemyCharacter.health -= chosenCharacter.attackPow;
                if(chosenCharacter.attackPow >= enemyCharacter.stun && enemyCharacter.canBeStunned) {
                    enemyCharacter.stunned = true;
                    $("#your-hit").text("You hit " + enemyCharacter.name + " for " + chosenCharacter.attackPow + " damage! You've stunned them!");
                    // TODO: Add a stun graphic on enemy character here
                } else {
                    $("#your-hit").text("You hit " + enemyCharacter.name + " for " + chosenCharacter.attackPow + " damage!");
                }
            } else {
                $("#your-hit").text("You're stunned! You couldn't attack!");
                chosenCharacter.stunned = false;
                chosenCharacter.canBeStunned = false;
            }
            if(chosenCharacter.health > 0) {
                $("#your-health").text(chosenCharacter.health);
            } else {
                $("#your-health").text(0);
            }
            if(enemyCharacter.health > 0) {
                $("#enemy-health").text(enemyCharacter.health);
            } else {
                $("#enemy-health").text(0);
            }

            // You lose
            if(chosenCharacter.health <= 0) {
                turnsTaken++;
                gameOver(false);
                return;
            }
            // You defeat the enemy
            if(enemyCharacter.health <= 0) {
                enemiesDefeated++;
                if(enemiesDefeated == 3) {
                    turnsTaken++;
                    gameOver(true);
                    return;
                } else {
                    changeEnemies = true;
                    canAttack = false;
                    $("#extra-text").css("color", "black");
                    $("#extra-text").css("font-weight", "normal");
                    $("#extra-text").text(enemyCharacter.name + " has been defeated! Choose your next opponent!");
                }
            }
            turnsTaken++;
            if(!chosenCharacter.stunned) {
                chosenCharacter.attackPow += chosenCharacter.initialAttack;
            }
        }
    });

    // Other document buttons
    $("#cycle-button").click(function() {
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

    $("#reset").click(function() {
        reset();
    });

    // Logic that handles the player picking a character to play as
    function handlePlayerClick(position) {
        if(canAttack === false) {
            if(swap) {
                var currentSlot = charSlots[position - 1];
                if(currentSlot < 12) {
                    charSlots[position - 1] = currentSlot + 4;
                } else {
                    charSlots[position - 1] = position - 1;
                }
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

    // Logic that handles the player picking an enemy character to fight
    function handleEnemyClick(position) {
        if(changeEnemies) {
            currentStage = allStages[Math.floor(Math.random() * allStages.length)];
            $("#stage-img").attr("src", "images/" + currentStage.ID + ".jpg");
            $("#stage-name").text("Current Stage: " + currentStage.name);
            enemyCharacter = allChars[charSlots[(position - 1)]];
            console.log(chosenCharacter);
            console.log(enemyCharacter);
            $("#current-enemy").css("display", "block");
            $("#enemy-name").text(enemyCharacter.name);
            $("#enemy-image").attr("src", "images/" + enemyCharacter.ID + ".png");
            $("#enemy-health").text(enemyCharacter.health);
            $("#enemy-list-" + position).css("display", "none");
            var index = enemiesInList.indexOf(position - 1);
            if (index !== -1) {
                enemiesInList.splice(index, 1);
                enemiesLeft--;
            }
            var lastInList = enemiesInList.pop();

            // Resets the margins for each character slot
            for(var i = 0; i < 4; i++) {
                $("#enemy-list-" + (i + 1)).css("margin-right", "0%");
            }
            
            // Extends the margin of the last character in the enemies list by a factor of how many characters remain
            // Keeps the layout consistent as characters move around
            $("#enemy-list-" + (lastInList + 1)).css("margin-right", "" + ((4 - enemiesLeft) * 25) + "%");
            enemiesInList.push(lastInList);
            changeEnemies = false;
            canAttack = true;
        }
    }

    // Removes the original list of characters which the player picked from
    function hideStartingList() {
        $("#init").css("display", "none");
    }

    // Populates the list of enemies the player can choose to fight
    function populateEnemies(chosen) {
        $("#remainder").css("display", "block");
        for(var i = 0; i < 4; i++) {
            $("#enemy-list-" + (i + 1)).css("display", "block");
            $("#enemy-list-" + (i + 1)).css("margin-right", "0%");            
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
        } else {
            $("#enemy-list-" + 4).css("margin-right", "25%");
        }
        changeEnemies = true;
        canAttack = false;
    }

    // Logic that handles Game Over state
    function gameOver(winner) {
        canAttack = false;
        enableSwapping = false;
        if(winner) {
            $("#extra-text").css("color", "darkgreen");
            $("#extra-text").css("font-weight", "bolder");
            $("#extra-text").text("You've won! Congratulations! Press the reset button to reset the game.");
        } else {
            $("#extra-text").css("color", "darkred");
            $("#extra-text").css("font-weight", "bolder");
            $("#extra-text").text("You've lost! Press the reset button to reset the game.");
        }
    }
});