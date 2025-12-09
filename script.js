const bank = [];

// DEBIT CARD (Без Овердрафта)
const bankAccount = {
  accountNumber: "123456789",
  accountHolderName: "Alice",
  balance: 0,
  isFrozen: false,
  deposit(sum) {
    // TODO Логика пополнения баланса
    if (sum > 0 && !this.isFrozen) {
      this.balance += sum;
      alert(`Успешное пополнение баланса на сумму ${sum}€`);
    } else {
      alert(`Сумма пополнения ${sum}€ отрицательная`);
    }
  },
  withdraw(sum) {
    // TODO Логика списания баланса
    if (this.balance >= sum && sum > 0 && !this.isFrozen) {
      this.balance -= sum;
      alert(`Успешное списание баланса на сумму ${sum}€`);
    } else {
      alert(
        `Недостаточно средств для списания (balance: ${this.balance}, sum: ${sum}€) или сумма списания отрицательна`
      );
    }
  },
  checkBalance() {
    // TODO Вывод баланса в консоли
    console.log(this.balance);
  },
};

const inputName = document.getElementById("name");
const accountsList = document.getElementById("accountsList");

function createNewAccount() {
  if (inputName.value.trim()) {
    const copyBankAccount = { ...bankAccount };
    copyBankAccount.accountHolderName = inputName.value.trim();
    // Math.random() * 900000000 + 100000000
    // copyBankAccount.accountNumber = '' + Math.floor(Math.random() * (10 ** 9));
    copyBankAccount.accountNumber = Math.floor(Math.random() * 9 * (10 ** 8) + 10 ** 8);
    bank.push(copyBankAccount);

    const li = document.createElement("li");

    const spanLength = document.createElement("span");
    spanLength.id = `${copyBankAccount.accountNumber}Length`;
    spanLength.className = `bankLength`;
    spanLength.textContent = `${bank.length}`;
    li.appendChild(spanLength);

    const spanBalance = document.createElement('span');
    spanBalance.textContent = `${copyBankAccount.balance}`
    spanBalance.id = `${copyBankAccount.accountNumber}Balance`;

    li.append(
      `. Name: ${copyBankAccount.accountHolderName}, Balance: `, spanBalance , `, Account number: ${copyBankAccount.accountNumber}`
    );

    const inputFreeze = document.createElement("input");
    inputFreeze.type = 'checkbox';
    // inputFreeze.id = `${copyBankAccount.accountNumber}Check`;
    
    li.append(inputFreeze);

    inputFreeze.onclick = (e) => {
      copyBankAccount.isFrozen = !copyBankAccount.isFrozen;
      li.style.color = copyBankAccount.isFrozen ? '#c4c4c4' : 'black';
    }

    const btn = document.createElement("button");
    btn.id = `${copyBankAccount.accountNumber}Delete`;
    btn.textContent = "X";
    li.appendChild(btn);
    accountsList.appendChild(li);
    
    btn.onclick = () => {
      const bankAccountNumber = btn.id.split("Delete")[0];
      const index = bank.findIndex((e) => e.accountNumber == bankAccountNumber);
      if (index >= 0 && (!bank[index].isFrozen || !bank[index].balance)) {
        li.remove();
        bank.splice(index, 1);

        const allItems = accountsList.querySelectorAll("li");
        allItems.forEach((li, index) => {
          const span = li.querySelector(`.bankLength`);
          if (span) span.textContent = index + 1;
        });
      }
    };
  }
  inputName.value = "";
}

const withdraw = document.getElementById("withdraw");
const deposit = document.getElementById("deposit");
const amountInput = document.getElementById("amount");
const accountNumberInput = document.getElementById("accountNumber");

// DRY - Don't Repeat Yourself - Не повторяйся

function changeBalance(operation) {
  const amount = +amountInput.value;
  const accountNumber = +accountNumberInput.value;
  const existingElement = bank.find((e) => e.accountNumber === accountNumber);
  if (existingElement) {
    operation
      ? existingElement.deposit(amount)
      : existingElement.withdraw(amount);
    const spanBalance = document.getElementById(`${accountNumber}Balance`);
    spanBalance.textContent = existingElement.balance;
  } else {
    alert("Аккаунта с таким номером не найдено. Попробуйте ещё раз");
  }
  amountInput.value = accountNumberInput.value = "";
}

withdraw.onclick = () => {
  changeBalance(false);
};

deposit.onclick = () => {
  changeBalance(true);
};

// TODO: Добавить input type="checkbox" для заморозки/разморозки банковского аккаунта
// 1. изменение цвета шрифта информации о банковском аккаунте
// 2. ограничение в действиях, влияющих на баланс

