function openPartnerSelection(doubleDiv) {

    if (doubleDiv.classList.contains('show')) {
        doubleDiv.classList.remove('show');
        doubleDiv.style.overflow = 'hidden';
    } else {
        doubleDiv.classList.add('show');

        setTimeout(() => {
            doubleDiv.style.overflow = 'visible';
        }, 1000)
    }
}

function closePartnerSelection(doubleDiv) {
    doubleDiv.classList.remove('show');
    doubleDiv.style.overflow = 'hidden';
}

function selectCategory(category, entryFees) {
    category.classList.toggle('active');

    var feesInNumber = Number(entryFees.innerHTML);

    var totalPrice = document.getElementById('totalPrice');
    var noOfCategories = document.getElementById('noOfCategories');

    var totalPriceInNumber = Number(totalPrice.innerHTML);
    var totalNoOfCategories = Number(noOfCategories.innerHTML);

    if (category.classList.contains('active')) {
        totalPrice.innerHTML = totalPriceInNumber + feesInNumber;
        noOfCategories.innerHTML = totalNoOfCategories + 1;
    } else {
        totalPrice.innerHTML = totalPriceInNumber - feesInNumber;
        noOfCategories.innerHTML = totalNoOfCategories - 1;
    }

    var paymentDiv = document.getElementById('paymentDiv');
    console.log(totalPriceInNumber);

    totalPriceInNumber = Number(totalPrice.innerHTML);

    if (totalPriceInNumber <= 0) {
        paymentDiv.style.opacity = '0';
        paymentDiv.style.pointerEvents = 'none';
        console.log('Inside else');
    } else {
        paymentDiv.style.opacity = '1';
        paymentDiv.style.pointerEvents = 'all';
        console.log('Inside <=0');
    }

}

function openMoreEventDetails(moreDetails) {
    moreDetails.classList.toggle('active');
}

function openMorePaymentDetails(paymentDiv) {
    paymentDiv.classList.toggle('active');
}