console.log('client.js is sourced!');

myResults();
let currentCalculations = {}


// function for when +-*/ is clicked operatorClicked(event)
function setOperator(event) {
    event.preventDefault();
    let myOperator = event.target.textContent //this line of code extracts the text content (+ - * /) that was input
    currentCalculations.operator = myOperator// this keeps track of teh current state 
    console.log(currentCalculations)
}

// event for when = button is clicked calculateValue(event)
// values are stored in the currentCalculations{} object
function handleGetCalculations(event) {
    event.preventDefault();
    let firstNumberInput = document.getElementById("firstNumberInput").value
    let secondNumberInput = document.getElementById("secondNumberInput").value;

    currentCalculations.numOne = firstNumberInput
    currentCalculations.numTwo = secondNumberInput

    console.log("inside handleGetCalculations(event)", currentCalculations)

    axios({
        method: 'POST',
        url: '/calculations',
        data: currentCalculations
    })
        .then((res) => {
            console.log("Success in handleGetCalculations(event) POST");
            myResults()
            //document.getElementById("calculator").reset();
        })
        .catch((error) => {
            console.log("server error:", error)
        })



}

//function to display the result
function myResults() {

    axios({
        method: "GET",
        url: "/calculations",
    })
        .then((response) => {
            console.log('inside GET response', response.data)

            let responseInfo = response.data;
            //resultHistory
            let myResults = responseInfo[responseInfo.length - 1];
            let resultHistory = document.getElementById("resultHistory");
            resultHistory.innerHTML = ''
            for (let items of responseInfo) {
                resultHistory.innerHTML += `<h2>History:<li> ${items.numOne} ${items.operator} ${items.numTwo} = ${items.result}</li></h2>`
            }
            //recentResult
            let recentResult = document.getElementById('recentResult');
            recentResult.innerHTML = `<h2>Result:</h2><p> ${myResults}</p>`;
        })
        .catch((error) => {
            console.log("server error", error);
        })

}



//function for when C button is clicked
function clearInputs(event) {
    event.preventDefault()
    numOne = '';
    numTwo = '';
    operator = '';

    document.getElementById("firstNumberInput").value = '';
    document.getElementById("secondNumberInput").value = '';
}
