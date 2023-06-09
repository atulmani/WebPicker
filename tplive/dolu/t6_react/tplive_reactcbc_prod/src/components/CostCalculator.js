import React, { useState } from 'react'

export default function CostCalculator(props) {
    const [duration, setDuration] = useState(20);
    const [hours, setHours] = useState(50);
    const [fees, setFees] = useState(500);
    const [courtCharge, setCourtCharge] = useState(400);

    const [totalCharge, setTotalCharge] = useState('₹20,000');
    const [totalMatches, setTotalMatches] = useState(150);
    const [minentry, setMinentry] = useState(50);

    var curFormat = {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    };

    function calculateValue(lhours, lfees, lcourtCharge, lduration) {

        var tCharge = lhours * lcourtCharge;
        setTotalCharge(Number(tCharge).toLocaleString('en-IN', curFormat));

        var maxmatch = Math.trunc(lhours * 60 / lduration);
        setTotalMatches(maxmatch);
        var minEntries = Math.trunc(tCharge / lfees);
        setMinentry(minEntries);
    }
    function setFlag() {
        props.setShowComponents('cost');
    }

    return (

        <div className={props.showFlag === 'cost' ? 'calculator-div open' : 'calculator-div'}>
            <div className='calculator-heading' onClick={setFlag}>
                <h1>Cost Calculator</h1>
            </div>
            <div className='calculator-content'>
                <div className="row no-gutters">

                    <div className="col-lg-6 col-md-6 col-sm-12">

                        <div className="reg-first-form-gender-section">
                            <div className="city-section-inside-div profile-setup-name-email-div">
                                <div className="reg-participant-form-field profile-name-input" style={{ width: '100%', marginTop: '20px' }}>
                                    <input type="number" required onChange={(e) => {
                                        const valuehours = Math.max(1, Math.min(2000, Number(e.target.value)));
                                        setHours(valuehours)
                                        calculateValue(valuehours, fees, courtCharge, duration);
                                    }} value={hours} />
                                    <span>Total Field/Court Booking Hrs</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">

                        <div className="reg-first-form-gender-section">
                            <div className="city-section-inside-div profile-setup-name-email-div">
                                <div className="reg-participant-form-field profile-name-input" style={{ width: '100%', marginTop: '20px' }}>
                                    <input type="number" required onChange={(e) => {
                                        const valueefee = Math.max(1, Math.min(10000, Number(e.target.value)));
                                        // console.log(valueefee)
                                        setFees(valueefee)
                                        calculateValue(hours, valueefee, courtCharge, duration);

                                    }} value={fees} />
                                    <span>Entry Fee(Average per entry)</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">

                        <div className="reg-first-form-gender-section">
                            <div className="city-section-inside-div profile-setup-name-email-div">
                                <div className="reg-participant-form-field profile-name-input" style={{ width: '100%', marginTop: '20px' }}>
                                    <input type="number" id="userName" required onChange={(e) => {
                                        const valuecourtCharge = Math.max(1, Math.min(20000, Number(e.target.value)));
                                        setCourtCharge(valuecourtCharge);
                                        calculateValue(hours, fees, valuecourtCharge, duration);

                                    }} value={courtCharge} />
                                    <span>Field/Courts charges per hours </span>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">

                        <div className="reg-first-form-gender-section">
                            <div className="city-section-inside-div profile-setup-name-email-div">
                                <div className="reg-participant-form-field profile-name-input" style={{ width: '100%', marginTop: '20px' }}>
                                    <input type="number" id="userName" required onChange={(e) => {
                                        const valueduration = Math.max(1, Math.min(20000, Number(e.target.value)));
                                        setDuration(valueduration);

                                        calculateValue(hours, fees, courtCharge, valueduration);

                                    }} value={duration} />
                                    <span>Duration on one match (in Minutes) </span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <hr></hr>

                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className='calculator-output-div'>
                            <h1>Total Feild / Court Charges</h1>
                            <h2 style={{ paddingBottom: '10px' }}>{totalCharge} </h2>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className='calculator-output-div'>
                            <h1>Max matches can be played</h1>
                            <h2 style={{ paddingBottom: '10px' }}>{totalMatches} </h2>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className='calculator-output-div'>
                            <h1>Min entries to recover field/court charges</h1>
                            <h2>{minentry} </h2>
                        </div>
                    </div>

                </div>
            </div >
        </div >


    )
}
