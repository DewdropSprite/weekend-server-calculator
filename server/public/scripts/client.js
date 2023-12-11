console.log('client.js is sourced!');

myResults();
let currentCalculations = {}


// function for when +-*/ is clicked operatorClicked(event)
function setOperator(event) {
    event.preventdefault();
    let myOperator = event.target.textContent
    currentCalculations.operator = myOperator
    console.log(currentCalculations)
}

// event for when = button is clicked calculateValue(event)
// values are stored in the currentCalculations{} object
function handleGetCalculations(event) {
    event.preventdefault();
    let firstNumberInput = document.getElementById("firstNumberInput").value 
    let secondNumberInput = document.getElementById("secondNumberInput").value
    let operatorInput = document.getElementsByClassName("operatorInput")
    
    currentCalculations.numOne = firstNumberInput
    currentCalculations.numTwo = secondNumberInput
    currentCalculations.operator = operatorInput

    console.log("inside handleGetCalculations(event)", currentCalculations)

    axios({
        method: "POST",
        url: "/calculations",
        data: currentCalculations
    })
        .then((res)=>{
            console.log("Success");
            myResults()
        })  
        .catch((error) => {
            console.log("server error:", error)
        })
        document.getElementById("calculator").reset()


}

//function to display the result
function myResults() {

    axios({
        method: "GET",
        url: "/calculations",
    })
        .then((response) => {
            console.log('inside GET response', response.data)

            let responseData = response.data;
            //resultHistory
            let newestResult = responseData[responseData.length - 1];
            let resultHistory = document.getElementById("resultHistory");
            resultHistory.innerHTML = ''
            for (let items of responseData) {
                resultHistory.innerHTML += `<div> ${items.numOne} ${items.operator} ${items.numTwo} = ${items.result}</div>`
            }
            //recentResult
            let recentResult = document.getElementById('recentResult');
            recentResult.innerHTML = `<h2> Result: ${newestResult.result}</h2>`
        })
        .catch((error) => {
    console.log("server error", error);
})

}



//function for when C button is clicked
function clearInputs(event) {
    event.preventdefault();
    document.getElementById("calculator").reset()
}
