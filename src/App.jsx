import React, { useState, useEffect } from "react";
import "./style.css";
import { evaluate } from "mathjs";

function App() {
  const [display, setDisplay] = useState("0"); //to display what user clicked on the screen.("0" is for test case 7)
  const [result, setResult] = useState(""); // to save result
  const [decimal, setDecimal] = useState(false); //for checking decimal
  const [countOp, setCountOp] = useState(0);

  const operatorCounter = (input) => {
    setCountOp(countOp + 1);
    console.log(countOp);
  };

  const inputHandler = (input) => {
    // const arrDisplay = [...display];
    const operators = ["+", "-", "*", "/"];
    if (display === "0") {
      // if display is "0" or empty
      setDisplay(input);
      console.log("first");
      setCountOp;
    } else if (operators.includes(input) && countOp <= 1) {
      // if input is one of operators, set the decimal state to false and then add the input in the display.
      setDecimal(false);
      setDisplay((prev) => prev + input);
      console.log("second");
    } else if (input !== "-" && countOp >= 1 && operators.includes(input)) {
      setDecimal(false);
      setDisplay(display.slice(0, -countOp) + input);
    } else {
      setDisplay((prev) => prev + input);
      setCountOp(0);
      console.log("last");
    }
  };

  const decimalChecker = (input) => {
    if (decimal === false) {
      setDecimal(true);
      setDisplay((prev) => prev + input);
    } else if (decimal === true) {
      setDisplay((prev) => prev + "");
    }
  };

  const calculator = () => {
    try {
      const evalResult = evaluate(display, scope);
      setResult(evalResult);
      setDisplay(evalResult);
      setDecimal(true);
      setCountOp(0);
      console.log(evaluate(display));
    } catch (error) {
      setResult("Error in expression");
      // setDisplay("Error");
    }
  };

  const scope = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  const deleteHandler = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  const clearHandler = () => {
    setDisplay("0");
    setResult("");
    setDecimal(false);
    setCountOp(0);
  };

  /*
  // const [display, setDisplay] = useState(""); //to display what user clicked on the screen.
  // const [currentNum, setCurrentNum] = useState(""); // to check the number input
  // const [prevNum, setPrevNum] = useState(""); // to save the num that is already displayed
  // const [operator, setOperator] = useState(""); // to check the operator input
  // const [result, setResult] = useState(""); // to save the result of calculation.

  // const numHandler = (num) => {
  //   //when user clicks the number button, it will display and save the number.
  //   setDisplay(display == 0 ? num : display + num); // if display is 0, display clicked number or put the number after previous display.
  //   setCurrentNum(currentNum + num);
  //   //if "-" comes after operation or the first input is "-", the number is negative.
  //   if (display === "-" && (operator || currentNum === "")) {
  //     setDisplay(display + num);
  //     setCurrentNum(display + num);
  //   }
  // };

  // const operatorHandler = (op) => {
  //   console.log("opH", op, "curr", currentNum, "prev", prevNum);
  //   if (result) {
  //     setOperator(op);
  //     setCurrentNum("");
  //     setPrevNum(result);
  //     setResult("");
  //     setDisplay(result + op);
  //   }
  //   //  else if (operator.length >= 1) {
  //   //   setResult(equalHandler);
  //   //   setOperator(op); //to save the clicked operator.
  //   //   setDisplay(display == 0 ? op : display + op); //to display on the screen.
  //   //   setCurrentNum(""); //to reset the current number after an operator.
  //   //   setPrevNum(result); //to save the previous number before an operator.
  //   // }
  //   else {
  //     setOperator(op); //to save the clicked operator.
  //     setDisplay(display == 0 ? op : display + op); //to display on the screen.
  //     setCurrentNum(""); //to reset the current number after an operator.
  //     setPrevNum(currentNum); //to save the previous number before an operator.
  //   }
  // };

  // const decimalCheckHandler = () => {
  //   if (!currentNum.includes(".")) {
  //     setDisplay(display + ".");
  //     setCurrentNum(currentNum + ".");
  //   } else if (currentNum.includes(".")) {
  //     setCurrentNum(currentNum + "");
  //     setDisplay(display + "");
  //   }
  // };
  // const deleteHandler = () => {
  //   if (display.length > 1) {
  //     setDisplay(display.slice(0, -1));
  //     setCurrentNum(display.slice(0, -1));
  //   } else {
  //     setDisplay("");
  //   }
  // };
  // const clearHandler = () => {
  //   setDisplay("0"); // for test case 7
  //   setResult("");
  //   setCurrentNum("");
  //   setPrevNum("");
  //   setOperator("");
  // };

  // const equalHandler = () => {
  //   switch (operator) {
  //     case "+":
  //       setResult(Number(prevNum) + Number(currentNum));
  //       break;
  //     case "-":
  //       setResult(Number(prevNum) - Number(currentNum));
  //       break;
  //     case "x":
  //       setResult(Number(prevNum) * Number(currentNum));
  //       break;
  //     case "/":
  //       setResult(Number(prevNum) / Number(currentNum));
  //       break;
  //     default:
  //       return;
  //   }
  // };
  */

  return (
    <>
      <div className="calculator">
        <div className="screen" id="display">
          {display}
        </div>
        <div className="keypad">
          <button
            className="key 7"
            id="seven"
            onClick={() => inputHandler("7")}
          >
            7
          </button>
          <button
            className="key 8"
            id="eight"
            onClick={() => inputHandler("8")}
          >
            8
          </button>
          <button className="key 9" id="nine" onClick={() => inputHandler("9")}>
            9
          </button>
          <button className="key del" id="del" onClick={deleteHandler}>
            DEL
          </button>
          <button className="key 4" id="four" onClick={() => inputHandler("4")}>
            4
          </button>
          <button className="key 5" id="five" onClick={() => inputHandler("5")}>
            5
          </button>
          <button className="key 6" id="six" onClick={() => inputHandler("6")}>
            6
          </button>
          <button
            className="key plus"
            id="add"
            value="operator"
            onClick={() => {
              inputHandler("+"), operatorCounter();
            }}
          >
            +
          </button>
          <button className="key 1" id="one" onClick={() => inputHandler("1")}>
            1
          </button>
          <button className="key 2" id="two" onClick={() => inputHandler("2")}>
            2
          </button>
          <button
            className="key 3"
            id="three"
            onClick={() => inputHandler("3")}
          >
            3
          </button>
          <button
            className="key subtract"
            id="subtract"
            value="operator"
            onClick={() => {
              inputHandler("-"), operatorCounter();
            }}
          >
            -
          </button>
          <button
            className="key decimal"
            id="decimal"
            onClick={() => decimalChecker(".")}
          >
            .
          </button>
          <button className="key 0" id="zero" onClick={() => inputHandler("0")}>
            0
          </button>
          <button
            className="key divide"
            id="divide"
            value="operator"
            onClick={() => {
              inputHandler("/"), operatorCounter();
            }}
          >
            /
          </button>
          <button
            className="key multiply"
            id="multiply"
            value="operator"
            onClick={() => {
              inputHandler("*"), operatorCounter();
            }}
          >
            x
          </button>
          <button className="key ac" id="clear" onClick={clearHandler}>
            AC
          </button>
          <button className="key equal" id="equals" onClick={calculator}>
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
