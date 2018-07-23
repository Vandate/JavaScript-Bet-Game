var playMoney = 0;
var betNumber;
var actualNumber;
var betMoney;

function Start() {
    document.getElementById('bet_number').disabled = true;
    document.getElementById('bet_amount').disabled = true;
    document.getElementById('start_button').disabled = true;
    document.getElementById('stop_button').disabled = true;
    document.getElementById('play_again_button').disabled = true;
    document.getElementById('reset_button').style.visibility = 'hidden';
    console.log(document.getElementById('money').value);
    off();
}

function SetBalance() {
    var money = parseInt(document.getElementById('money').value);
    BalanceCheck(money);
}

function BalanceCheck(money) {
    if (money <= 0) {
        playMoney = 0;
        document.getElementById('money').value = playMoney;
    } else {
        if (money > 999999999) {
            playMoney = 999999999;
        } else {
            playMoney = money;
        }
        document.getElementById('money').value = playMoney;
        DisableInputField();
    }
    document.getElementById('balance').innerHTML = "Balance: " + playMoney + "$";
    console.log("Balance: " + playMoney);
}

function DisableInputField() {
    if (playMoney > 0) {
        document.getElementById('set_balance_button').disabled = true;
        document.getElementById('money').disabled = true;
        EnableInputField();
    }
}

function EnableInputField() {
    document.getElementById('bet_number').disabled = false;
    document.getElementById('bet_amount').disabled = false;
    document.getElementById('start_button').disabled = false;
}

function GetInput() {
    betNumber = parseInt(document.getElementById('bet_number').value);
    document.getElementById('bet_number').value = betNumber;
    console.log("Bet Number: " + betNumber);
    SetAmount();
}

function SetAmount() {
    money = parseInt(document.getElementById('bet_amount').value);
    MoneyCheck(money);
}

function MoneyCheck(money) {
    if (money > playMoney) {
        betMoney = playMoney;
    } else if (money <= 0) {
        betMoney = 0;
    } else {
        betMoney = money;
    }
    document.getElementById('bet_amount').value = betMoney;
    console.log("Bet Amount: " + betMoney);
    if (playMoney >= 0 && betNumber >= 0 && betMoney >= 0) {
        NumberGenerator();
    }
}

function NumberGenerator() {
    actualNumber = Math.floor(Math.random() * 100);
    console.log("Actual Number: " + actualNumber);
    if (actualNumber >= 0) {
        document.getElementById('bet_number').disabled = true;
        document.getElementById('bet_amount').disabled = true;
        document.getElementById('start_button').disabled = true;
    }
    document.getElementById('stop_button').disabled = false;
}

function CompareGuesses() {
    if (actualNumber == betNumber) {
        document.getElementById('text').innerHTML = "You Guess Correctly. You win " + (betMoney*70) + "$.";
        playMoney += betMoney * 70;
    } else if (actualNumber < betNumber) {
        document.getElementById('text').innerHTML = "The Result is " + actualNumber + ". You lost " + betMoney + "$.";
        playMoney -= betMoney;
    } else if (actualNumber > betNumber) {
        document.getElementById('text').innerHTML = "The Result is " + actualNumber + ". You lost " + betMoney + "$";
        playMoney -= betMoney;
    }
    document.getElementById('balance').innerHTML = "Balance: " + playMoney + "$";
    console.log("Balance: " + playMoney);
    document.getElementById('money').value = playMoney;
    document.getElementById('play_again_button').disabled = false;
    document.getElementById('stop_button').disabled = true;
}

function PlayAgain() {
    document.getElementById('text').innerHTML = "Enter Your Bet Number (0-99) Here:"
    document.getElementById('play_again_button').disabled = true;
    document.getElementById('bet_number').value = '';
    document.getElementById('bet_number').disabled = false;
    document.getElementById('bet_amount').value = '';
    document.getElementById('bet_amount').disabled = false;
    document.getElementById('start_button').disabled = false;
    if (playMoney <= 0) {
        document.getElementById('start_button').disabled = true;
        document.getElementById('reset_button').style.visibility = 'visible';
        document.getElementById('bet_number').disabled = true;
        document.getElementById('bet_amount').disabled = true;
        on();
    }
}

function Reset() {
    document.getElementById('reset_button').style.visibility = 'hidden';
    off();
    document.getElementById('set_balance_button').disabled = false;
    document.getElementById('money').disabled = false;
    document.getElementById('money').value = '';
}

function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

console.log(Start());

var numInput = document.querySelectorAll('input');
var i;
for (i = 0; i < numInput.length; i++) {
    numInput[i].addEventListener('input', function () {
        var num = this.value.match(/^\d+$/);
        if (num === null) {
            this.value = "";
        }
    }, false)
    if (i == 1) {
        numInput[i].addEventListener('input', function () {
            var num = this.value.match(/^\d+$/);
            if (num === null) {
                this.value = "";
            } else if (num > 99) {
                this.value = "";
            }
        }, false)
    }
}