// listen for submit button
document.getElementById('loan-form').addEventListener('submit', function(e) {

    //hide results
    document.getElementById('results').style.display = 'none';
    //show loader
    document.getElementById('loading').style.display = 'block';


    setTimeout(calculateResults, 2000);

    e.preventDefault();
});


function calculateResults(e) {

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {  //isFinite = is the number finite (and not infinite) ?
        monthlyPayment.value = monthly.toFixed(2); //tofixed defines 2 decimals, value outputs it into html
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //show results
        document.getElementById('results').style.display = 'block';
        //hide loading
        document.getElementById('loading').style.display = 'none';


    } else {
        showError('Bitte überprüfe die eingegebenen Zahlen.');
    };


    e.preventDefault();
}

function showError(error) {

    //hide results
    document.getElementById('results').style.display = 'none';
    //hide loading
    document.getElementById('loading').style.display = 'none';


    //create div
    const errorDiv = document.createElement('div');

    // get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    
    //add bootstrap class for red color
    errorDiv.className = 'alert alert-danger';
    //create textnode and append to child
    errorDiv.appendChild(document.createTextNode(error));

    //insert error above heading
    card.insertBefore(errorDiv, heading);

    //clear error after seconds
    self.setTimeout(clearError, 3000);
}

function clearError () {
    document.querySelector('.alert').remove();
}