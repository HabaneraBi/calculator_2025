let input = document.getElementById("inp");
let all_buts = document.getElementsByTagName("button");
let buttons_figure = document.querySelectorAll(".figure");
let buttons_oper = document.querySelectorAll(".move");
let operation = "";
let num1 = "";
let num2 = "";
// 0 1 2 5 6 7 10 11 12 16
buttons_figure.forEach((figure) => {
  figure.addEventListener("click", function () {
    if (operation === "" || num1 === "") {
      num1 += figure.textContent;
    } else {
      num2 += figure.textContent;
    }
    input.value += figure.textContent;
  });
});

buttons_oper.forEach((oper) => {
  oper.addEventListener("click", function () {
    input.value += " " + oper.textContent + " ";
    operation = oper.textContent;
  });
});

all_buts[17].addEventListener("click", function () {
  if (operation === "+") {
    if (
      String(Number(num1) + Number(num2))
        .split("")
        .at(-2) === "0"
    ) {
      const arr = String(Number(num1) + Number(num2)).split("");
      let z = 0;
      for (let i = arr.indexOf("."); i < arr.length; i++) {
        if (arr[i] === "0") {
          z = i;
          break;
        }
      }
      if (arr[z - 1] === ".") {
        arr.splice(z - 1, arr.length - z + 1);
      } else {
        arr.splice(z, arr.length - z);
      }
      input.value = arr.join("");
    } else {
      input.value = String(Number(num1) + Number(num2));
    }
  } else if (operation === "-") {
    input.value = Number(num1) - Number(num2);
  } else if (operation === "*") {
    input.value = Number(num1) * Number(num2);
  } else if (operation === "/") {
    if (num2 === "0") {
      input.value = "На ноль делить нельзя!";
      num1 = "";
      num2 = "";
      operation = "";
    } else {
      input.value = Number(num1) / Number(num2);
    }
  }
  num1 = input.value;
  num2 = "";
});

all_buts[4].addEventListener("click", function () {
  input.value = "";
  num1 = "";
  num2 = "";
  operation = "";
});
