function onGooglePayLoaded() {
    alert("test");
    const googlePayClient = new google.payments.api.PaymentsClient({
        enviornment: 'TEST'
    });

    const tokenizationSpec = {
        type: 'PAYMENT_GATEWAY',
        parameters: {
            gateway: 'example',
            gatewayMerchantId: 'some-merchant-id'
        }
    }
    const cardPaymentMethod = {
        type: 'CARD',
        tokenizationSpecification: tokenizationSpec,
        parameters: {
            allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"],
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            billingAddressRequired: true,
            billingAddressParameters: {
                format: 'FULL',
                phoneNumberRequired: true
            }
        }
    }
    const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];
    const clientConfiguration = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [cardPaymentMethod,]
    };
    const paymentDataRequest = Object.assign({
    }, clientConfiguration);

    paymentDataRequest.transactionInfo = {
        totalPriceStatus: 'FINAL',
        totalPrice: '1',
        currencyCode: 'INR'
    };

    paymentDataRequest.merchantInfo = {
        merchantId: '0123456789',
        merchantName: 'Anita'
    };

    googlePayClient.isReadyToPay(clientConfiguration)
        .then(function (response) {
            if (response.result) {
                console.log("in succes");

                googlePayClient.createButton({
                    buttonColor: 'default',
                    buttonType: 'long',
                    onClick: onGooglePaymentsButtonClicked
                });
            }
        })
        .catch(function (err) {
            console.log("in error", err);
        });
    //    onGooglePaymentsButtonClicked(googlePayClient);
    // googlePayClient.loadPaymentData(paymentDataRequest)
    //     .then(function (paymentData) {
    //         processPayment(paymentData);
    //     }).catch(function (err) {
    //         console.log("in error", err);
    //     });

    googlePayClient.loadPaymentData(paymentDataRequest)
        .then(function (paymentData) {
            //processPayment(paymentData);
            paymentToken = paymentData.paymentMethodData.tokenizationData.token;
        })
        .catch(function (err) {
            console.log("in error", err);
        })


}
function onGooglePaymentsButtonClicked(googlePayClient) {
    alert("in onGooglePaymentsButtonClicked");

    googlePayClient.loadPaymentData(paymentDataRequest)
        .then(function (paymentData) {
            //processPayment(paymentData);
            paymentToken = paymentData.paymentMethodData.tokenizationData.token;
        })
        .catch(function (err) {
            console.log("in error", err);
        })

}