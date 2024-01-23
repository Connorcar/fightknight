let playerTurnResolver;

var playerMaxHP = 30;
var playerCurrHP = 30;
var playerMaxFP = 10;
var playerCurrFP = 10;

var playerCurrBlockCharges = 2;
var playerMaxBlockCharges = 2;

var enemyCurrHP = 30;
var enemyMaxHP = 30;
var enemyNextMove = "Attack";

var playerIsBlocking = false;
var playerIsParrying = false;

var enemyIsBlocking = false;
var enemyIsParrying = false;

var playerAttackDamage = 6;
var enemyAttackDamage = 6;

var turn = 0;

var im_healthpotion_cost = 2;
var im_manapotion_cost = 0;
var im_buffdamage_cost = 3;
var im_buffhealth_cost = 3;

var attackButton = document.getElementById("AttackButton");
var parryButton = document.getElementById("ParryButton");
var blockButton = document.getElementById("BlockButton");
var healthPotionButton = document.getElementById("HealthPotionButton");
var manaPotionButton = document.getElementById("ManaPotionButton");
var buffDamageButton = document.getElementById("BuffDamageButton");
var buffHealthButton = document.getElementById("BuffHealthButton");

var playerHPtext = document.getElementById("PlayerHPtext");
var playerFPtext = document.getElementById("PlayerFPtext");
var enemyHPtext = document.getElementById("EnemyHPtext");
var enemyNextMoveText = document.getElementById("EnemyNextMoveText");

var combatLogText = document.getElementById("combat-log");

function InitializeListeners() {
    attackButton.addEventListener('click', function() {
        mv_Attack();
        UpdateText();
        playerTurnResolver();
    });
    parryButton.addEventListener('click', function() {
        mv_Parry();
        UpdateText();
        playerTurnResolver();
    });
    blockButton.addEventListener('click', function() {
        mv_Block();
        UpdateText();
        playerTurnResolver();
    });
    healthPotionButton.addEventListener('click', function() {
        im_HealthPotion();
        UpdateText();
        playerTurnResolver();
    });
    manaPotionButton.addEventListener('click', function() {
        im_ManaPotion();
        UpdateText();
        playerTurnResolver();
    });
    buffDamageButton.addEventListener('click', function() {
        im_BuffDamage();
        UpdateText();
        playerTurnResolver();
    });
    buffHealthButton.addEventListener('click', function() {
        im_BuffHealth();
        UpdateText();
        playerTurnResolver();
    });
}

async function PlayerTurn() {
    playerIsBlocking = false;
    playerIsParrying = false;

    if (playerCurrHP <= 0) {
        YouLose();
    }

    return new Promise((resolve) => {
        playerTurnResolver = resolve;
    });
}

async function EnemyTurn() {
    DisableButtons();
    enemyIsBlocking = false;
    enemyIsParrying = false;

    if (enemyCurrHP <= 0) {
        YouWin();  
    }

    if (enemyNextMove == "Attack") { en_Attack(); }
    else if (enemyNextMove == "Parry") { en_Parry(); }
    else if (enemyNextMove == "Block") { en_Block(); }

    UpdateText();
    EnemyActionPicker();
}

function EnemyActionPicker() {
    var num = Math.floor(Math.random()*4);
    if (num <= 1) { 
        enemyNextMove = "Attack";
    }
    else if (num == 2) {
        enemyNextMove = "Parry";
    }
    else {
        enemyNextMove = "Block";
    }
    UpdateText();
}

function mv_Attack() {
    if (enemyIsBlocking) {
        combatLogText.innerText = "You dealt 0 damage!";
        return;
    }
    else if (enemyIsParrying) {
        enemyCurrHP -= Math.floor(playerAttackDamage/2);
        playerCurrHP -= Math.floor(enemyAttackDamage/4);
        combatLogText.innerText = "You dealt " + Math.floor(playerAttackDamage/2) + " damage and took " 
        + Math.floor(enemyAttackDamage/4) + " damage!";
        return;
    }
    else {
        enemyCurrHP -= playerAttackDamage;
        combatLogText.innerText = "You dealt " + playerAttackDamage + " damage!";
    }
}

function en_Attack() {
    if (playerIsBlocking) {
        combatLogText.innerText = "You took 0 damage!";
        return;
    }
    else if (playerIsParrying) {
        playerCurrHP -= Math.floor(enemyAttackDamage/2);
        enemyCurrHP -= Math.floor(playerAttackDamage/4);
        combatLogText.innerText = "You took " + Math.floor(enemyAttackDamage/2) + " damage and dealt " 
        + Math.floor(playerAttackDamage/4) + " damage!";
        return;
    }
    else {
        playerCurrHP -= enemyAttackDamage;
        combatLogText.innerText = "You took " + enemyAttackDamage + " damage!";
    }
}

function mv_Parry() {
    playerIsParrying = true;
    combatLogText.innerText = "You are prepared to parry next attack.";
}

function en_Parry() {
    enemyIsParrying = true;
    combatLogText.innerText = "Enemy is prepared to parry next attack.";
}

function mv_Block() {
    if (playerCurrBlockCharges > 0) {
        playerIsBlocking = true;
        playerCurrBlockCharges -= 1;
    }
    combatLogText.innerText = "You are prepared to block next attack.";
}

function en_Block() {
    enemyIsBlocking = true;
    combatLogText.innerText = "Enemy is prepared to block next attack.";
}

function im_HealthPotion() {
    if (playerCurrFP >= im_healthpotion_cost) {
        playerCurrFP -= im_healthpotion_cost;

        playerCurrHP += Math.floor(playerMaxHP*0.3);
        if (playerCurrHP > playerMaxHP) {
            playerCurrHP = playerMaxHP;
        }
    }
}

function im_ManaPotion() {
    playerCurrFP += 5;
    if (playerCurrFP > playerMaxFP) {
        playerCurrFP = playerMaxFP;
    }
}

function im_BuffDamage() {
    if (playerCurrFP >= im_buffdamage_cost) {
        playerCurrFP -= im_buffdamage_cost;

        playerAttackDamage += Math.floor(playerAttackDamage*0.2);
    }
}

function im_BuffHealth() {
    if (playerCurrFP >= im_buffhealth_cost) {
        playerCurrFP -= im_buffhealth_cost;

        playerMaxHP += Math.floor(playerMaxHP*0.1);
        playerCurrHP += Math.floor(playerMaxHP*0.1);

        if (playerCurrHP > playerMaxHP) {
            playerCurrHP = playerMaxHP;
        }
    }
}

function UpdateText() {
    playerHPtext.innerText = "HP: " + playerCurrHP + "/" + playerMaxHP;
    playerFPtext.innerText = "FP: " + playerCurrFP + "/" + playerMaxFP;
    enemyHPtext.innerText = "HP: " + enemyCurrHP + "/" + enemyMaxHP;
    enemyNextMoveText.innerText = "Next Move: " + enemyNextMove;
    blockButton.innerText = "BLOCK (" + playerCurrBlockCharges + "/" + playerMaxBlockCharges + ")";
}

function EnableButtons() {
    attackButton.disabled = false;
    parryButton.disabled = false;
    if (playerCurrBlockCharges > 0) { blockButton.disabled = false; }
    if (playerCurrFP > im_healthpotion_cost) { healthPotionButton.disabled = false; }
    manaPotionButton.disabled = false;
    if (playerCurrFP > im_buffdamage_cost) { buffDamageButton.disabled = false; }
    if (playerCurrFP > im_buffhealth_cost) { buffHealthButton.disabled = false; }
    
}

function DisableButtons() {
    attackButton.disabled = true;
    parryButton.disabled = true;
    blockButton.disabled = true;
    healthPotionButton.disabled = true;
    manaPotionButton.disabled = true;
    buffDamageButton.disabled = true;
    buffHealthButton.disabled = true;
}

function YouWin() {
    combatLogText.innerText = "YOU WIN!";
}

function YouLose() {
    combatLogText.innerText = "YOU LOSE!";
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}





async function main() {
    turn = 0;
    InitializeListeners();
    EnemyActionPicker();

    while (true) {
        // do combat
        if (turn % 2 === 0) {
            console.log("player turn");
            EnableButtons();
            await PlayerTurn();
            DisableButtons();
            await delay(1000);
        }
        else {
            console.log("enemy turn");
            EnemyTurn();
            await delay(1000);
        }
        turn += 1;

        if (enemyCurrHP <= 0) {
            YouWin();
            return;
        }
        if (playerCurrHP <= 0) {
            YouLose();
            return;
        }
    }
}

main();