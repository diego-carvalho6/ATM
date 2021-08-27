const defaultAmountOfNotes = {
  100: 1,
  50: 3,
  20: 4,
  10: 1,
  5: 3,
  2: 12,
  1: 10,
};
let defaultClientBalance = 122.5;

const showClientBalance = () => {
  const actualBalance = document.getElementById("actualBalance");
  let clientBalance = defaultClientBalance;

  actualBalance.innerText = `Saldo: ${clientBalance} R$`;
};
const showAmountOfNotes = () => {
  const fieldNumberOfNotes = document.getElementById("numberOfNotes");
  const amountOfNotes = defaultAmountOfNotes;

  Object.keys(amountOfNotes).map((bankNote) => {
    const paragraph = document.createElement("p");
    paragraph.className = "noteAmountParagraph";
    paragraph.innerText = `${bankNote},00R$ = ${amountOfNotes[bankNote]}`;
    fieldNumberOfNotes.appendChild(paragraph);
  });
};
// const updateFields = () => {
//   const actualBalance = document.getElementById("actualBalance");
//   const fieldNumberOfNotes = document.getElementById("numberOfNotes");
//   const noteAmountParagraphs = document.querySelectorAll(
//     ".noteAmountParagraph"
//   );
//   Object.values(noteAmountParagraphs).map((paragraph) =>
//     fieldNumberOfNotes.removeChild(paragraph)
//   );
//   showAmountOfNotes();
//   showClientBalance();
// };

const calculateWithdrawalNotes = () => {
  const ResponseTextField = document.getElementById("returnResponse");

  const amountOfNotes = defaultAmountOfNotes;
  let clientBalance = defaultClientBalance;

  let withdrawalAmount = document.getElementById("inputValue").value;
  //   let valueToDiscount = document.getElementById("inputValue").value;
  let notesToReturn = "";

  if (withdrawalAmount % 1 != 0) {
    ResponseTextField.innerText =
      "Selecione um valor inteiro, não trabalhamos com moedas.";
    return false;
  }
  if (withdrawalAmount < 1) {
    ResponseTextField.innerText = "Selecione um valor maior que 0!";
    return false;
  }
  if (clientBalance < withdrawalAmount) {
    ResponseTextField.innerText = "Não há saldo suficiente.";
    return false;
  }

  sumAmountOfNotes = Object.keys(amountOfNotes).reduce(
    (accumulator, bankNote) => {
      return accumulator + bankNote * amountOfNotes[bankNote];
    },
    0
  );
  if (sumAmountOfNotes < withdrawalAmount) {
    ResponseTextField.innerText = `Não há dinheiro suficiente no caixa, porfavor escolha um valor igual ou menor há: ${sumAmountOfNotes}.`;
    return false;
  }
  Object.keys(amountOfNotes)
    .reverse()
    .map((bankNote) => {
      if (withdrawalAmount / bankNote >= 1 && amountOfNotes[bankNote] > 0) {
        amountNecessary = Math.floor(withdrawalAmount / bankNote);

        if (amountNecessary > amountOfNotes[bankNote]) {
          notesToReturn += ` ${amountOfNotes[bankNote]} de R$${bankNote},00`;
          withdrawalAmount -= amountOfNotes[bankNote] * bankNote;
          //   amountOfNotes[bankNote] = 0;
        } else {
          notesToReturn += ` ${amountNecessary} de R$${bankNote},00`;
          //   amountOfNotes[bankNote] -= amountNecessary;
          withdrawalAmount -= bankNote * amountNecessary;
        }
      }
    });

  if (withdrawalAmount > 0) {
    ResponseTextField.innerText = `Não há notas suficientes para este valor, porfavor escolha um valor diferente.`;
    return false;
  }
  ResponseTextField.innerText = `Suas notas são:${notesToReturn}.`;
  //   defaultClientBalance -= valueToDiscount;
  //   updateFields();
  return true;
};

const buttonSubmit = document.getElementById("submit");
buttonSubmit.addEventListener("click", calculateWithdrawalNotes);
showAmountOfNotes();
showClientBalance();
