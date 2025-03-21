let input = document.getElementById("inp");
let all_buts = document.getElementsByTagName("button");
let buttons_figure = document.querySelectorAll(".figure");
let buttons_oper = document.querySelectorAll(".oper");
let operation = "";
let num1 = "";
let num2 = "";
let style = document.getElementById("style");

buttons_figure.forEach((figure) => {
  figure.addEventListener("click", function () {
    if (input.value === "На ноль делить нельзя!") {
      num1 = figure.textContent;
      input.value = figure.textContent;
    } else if (figure.textContent === ".") {
      if (
        (num1.includes(figure.textContent) && operation === "") ||
        num2.includes(figure.textContent)
      ) {
        return;
      } else if (num1 !== "" && num2 === "" && operation === "") {
        num1 += figure.textContent;
      } else if (num2 !== "" && operation !== "") {
        num2 += figure.textContent;
      } else {
        return;
      }
      input.value += figure.textContent;
    } else {
      if (operation === "" || num1 === "") {
        num1 += figure.textContent;
      } else {
        num2 += figure.textContent;
      }
      input.value += figure.textContent;
    }
  });
});

buttons_oper.forEach((oper) => {
  oper.addEventListener("click", function () {
    if (oper.textContent === "±") {
      if (num1 !== "" && num2 === "" && operation === "") {
        let input_arr = input.value.split("");
        if (Number(num1) > 0) {
          input_arr.unshift("-");
        } else if (Number(num1 < 0)) {
          input_arr.shift();
        }
        num1 = String(Number(num1) * -1);
        input.value = input_arr.join("");
      } else if (num2 !== "" && operation !== "") {
        let slice1_input = input.value.slice(0, num1.length + 3);
        let slice2_input = input.value.slice(num1.length + 3);
        if (Number(num2) > 0) {
          slice2_input = "-" + slice2_input;
        } else if (Number(num2 < 0)) {
          slice2_input = slice2_input.slice(1);
        }
        num2 = num2 * -1;
        input.value = slice1_input + slice2_input;
      }
    } else if (operation === "" && num1 !== "") {
      input.value += " " + oper.textContent + " ";
      operation = oper.textContent;
    }
  });
});

all_buts[17].addEventListener("click", function () {
  if (operation === "+") {
    if (
      String(Number(num1) + Number(num2))
        .split("")
        .at(-2) === "0" &&
      String(Number(num1) + Number(num2)).includes(".")
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
  operation = "";
  num2 = "";
});

all_buts[4].addEventListener("click", function () {
  input.value = "";
  num1 = "";
  num2 = "";
  operation = "";
});

//del
all_buts[9].addEventListener("click", function () {
  let input_arr = input.value.split("");
  if (num2 !== "") {
    input_arr.pop();
    let num2_arr = num2.split("");
    num2_arr.pop();
    num2 = num2_arr.join("");
  } else if (num2 === "" && operation !== "") {
    input_arr.splice(input_arr.indexOf(" "), 3);
    operation = "";
  } else if (num1 !== "" && operation === "" && num2 === "") {
    input_arr.pop();
    let num1_arr = num1.split("");
    num1_arr.pop();
    num1 = num1_arr.join("");
  }
  input.value = input_arr.join("");
});

//theme
all_buts[19].addEventListener("click", function () {
  if (all_buts[19].textContent === "Light") {
    all_buts[19].textContent = "Dark";
    style.href = "calc_light.css";
  } else {
    all_buts[19].textContent = "Light";
    style.href = "calc_dark.css";
  }
});
