const inputs = document.querySelectorAll(".login_input"); 
const button = document.querySelector(".login_button");
const form = document.querySelector(".login_form");

const validateInputs = () => {
  const allFilled = Array.from(inputs).every(input => input.value.length > 2);

  if (allFilled) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "");
  }
};

inputs.forEach(input => {
  input.addEventListener("input", validateInputs);
});
