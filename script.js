const calculateWithdrawalNotes = () => {
  const clientBalance = 122.5;
  const amountOfNotes = { 100: 1, 50: 3, 20: 1, 10: 1, 5: 3, 2: 12, 1: 10 };

  let withdrawalAmount = document.getElementById("inputValue").value;
  let notesToReturn = {};

  if (clientBalance < withdrawalAmount) {
    console.log("Não há saldo suficiente");
  }
  Object.keys(amountOfNotes)
    .reverse()
    .map((bankNote) => {
      if (withdrawalAmount / bankNote >= 1 && amountOfNotes[bankNote] > 0) {
        amountNecessary = Math.floor(withdrawalAmount / bankNote);

        if (amountNecessary > amountOfNotes[bankNote]) {
          notesToReturn[bankNote] = amountOfNotes[bankNote];
          amountOfNotes[bankNote] = 0;
          withdrawalAmount -= amountOfNotes[bankNote] * bankNote;
        } else {
          notesToReturn[bankNote] = amountNecessary;
          amountOfNotes[bankNote] -= amountNecessary;
          withdrawalAmount -= bankNote;
        }
      }
    });

  if (withdrawalAmount > 0) {
    console.log("Não há notas suficientes, porfavor escolha outro valor");
  }
  console.log(notesToReturn);
};
button = document.getElementById("submit");
button.addEventListener("click", calculateWithdrawalNotes);
