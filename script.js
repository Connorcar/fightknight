var playerMaxHP;
var playerCurrHP;
var playerMaxFP;
var playerCurrFP;

var playerBlockCharges;

var enemyCurrHP;
var enemyMaxHP;
var enemyNextMove;

var playerIsBlocking;
var playerIsParrying;

var enemyIsBlocking;
var enemyIsParrying;

var playerAttackDamage;
var enemyAttackDamage;

var turn;

var im_healthpotion_cost;
var im_manapotion_cost;
var im_buffdamage_cost;
var im_buffhealth_cost;

function PlayerTurn() {
    playerIsBlocking = false;
    playerIsParrying = false;

    if (playerCurrHP <= 0) {
        YouLose();
    }
}

function EnemyTurn() {
    enemyIsBlocking = false;
    enemyIsParrying = false;

    if (enemyCurrHP <= 0) {
        YouWin();  
    }
}

function mv_Attack() {
    if (enemyIsBlocking) {
        return;
    }
    else if (enemyIsParrying) {
        enemyCurrHP -= Math.floor(playerAttackDamage/2);
        playerCurrHP -= Math.floor(enemyAttackDamage/4);
        return;
    }
    enemyCurrHP -= playerAttackDamage;
}

function en_Attack() {
    if (playerIsBlocking) {
        return;
    }
    else if (playerIsParrying) {
        playerCurrHP -= Math.floor(enemyAttackDamage/2);
        enemyCurrHP -= Math.floor(playerAttackDamage/4);
        return;
    }
    playerCurrHP -= enemyAttackDamage;
}

function mv_Parry() {
    playerIsParrying = true;
}

function en_Parry() {
    enemyIsParrying = true;
}

function mv_Block() {
    if (playerBlockCharges > 0) {
        playerIsBlocking = true;
        playerBlockCharges -= 1;
    }
}

function en_Block() {
    enemyIsBlocking = true;
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

}

function EnableButtons() {

}

function DisableButtons() {

}

function YouWin() {

}

function YouLose() {

}





function main() {
    turn = 0;
    while (enemyCurrHP > 0) {
        // do combat
        if (turn % 2 === 0) {
            // player turn
        }
    }
}

main();