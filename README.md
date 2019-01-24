# Street_Fighter_RPG

This application is an RPG-style game themed around the Street Fighter series of videogames.
It is developed in Javascript with JQuery.

The user engages with the game by first choosing a character to play as. If the user desires, they can use the swap function to change which 
characters are available in the lineup. The characters that swap in are identical in terms of stats to the character they swapped from, so this
function is purely cosmetic in nature. (With the notable exception of Dan, who is very weak by design).

After the player has swapped to their heart's content, clicking on a character will initialize the game with the player in control of the chosen character.

After a character is chosen, the remaining characters become the player's enemies and are listed below. The player can choose any of them
to fight, but may not necessarily be able to defeat the one they chose right away.

As the player fights a character, their attack power increases. This makes it easier to take down future characters, as that attack
power is maintained after the battle ends.

//!!!TO-DO!!!\\
If a character delivers enough damage in a single turn, their opponent will be stunned. A dizzy character will not attack for one turn.
A character can only be stunned once. Dan is the only player character that can be stunned by enemies.

The goal of the game is to defeat all of the enemy characters; thus, the strategy comes from picking easier characters to fight first, and 
saving the more difficult opponents for last when your character has sufficiently powered up to defeat them.

If your character's health is reduced to 0, the game ends in a loss. If the health of all enemies is reduced to 0, the game ends in a win.

Each enemy character is fought on a randomly selected stage from the Street Fighter games. The initial stage will always be the Training Stage.

At any time, the user can use the reset button to reset the game. If a player character has been selected, this will count as a loss.

//!!!TO-DO!!!\\
The player's total wins and their favorite character are stored locally. After a game is over, these will be displayed and can be reset.


© Stefan Apreutesei
January 23, 2019

I am in no way affiliated with the Street Fighter franchise or its publisher, Capcom. Characters, stages, and other imagery used on the site belong to Capcom Co., Ltd.