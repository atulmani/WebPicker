import React, { useState } from 'react';
import '../css/Calculator.css'

export default function EventCostCalculatorL(props) {
    const [duration, setDuration] = useState(20);
    const [enteries, setEnteries] = useState(5);
    const [court, setCourt] = useState(1);
    const [totalDuration, setTotalDuration] = useState('3 Hours 20 Minutes');
    const [totalMatches, setTotalMatches] = useState(10);

    function calculateValue(lduration, lentries, lcourt) {
        var totalM = lentries * (lentries - 1) / 2;
        // console.log('enteries : ', enteries);
        // console.log('category : ', category);
        setTotalMatches(totalM);
        var totalmins = totalM * lduration;
        totalmins = totalmins / lcourt;

        var hours = Math.trunc(totalmins / 60);
        var mins = Math.trunc(totalmins % 60);
        // console.log('hours : ', hours, ' mins : ', mins);
        setTotalDuration(hours + ' Hours ' + mins + ' Minutes');

    }

    function setFlag() {
        props.setShowComponents('league');
    }
    return (
        <div>

            <div className={props.showFlag === 'league' ? 'calculator-div open' : 'calculator-div'}>
                <div className='calculator-heading' onClick={setFlag}>
                    <h1>Time Calculator - League</h1>
                </div>
                <div className='calculator-content'>
                    <div className="row no-gutters">

                        <div className="col-lg-6 col-md-6 col-sm-12">

                            <div className="reg-first-form-gender-section">
                                <div className="city-section-inside-div profile-setup-name-email-div">
                                    <div className="reg-participant-form-field profile-name-input" style={{ width: '100%', marginTop: '20px' }}>
                                        <input type="number" required onChange={(e) => {
                                            const valueDuration = Math.max(1, Math.min(120, Number(e.target.value)));
                                            setDuration(valueDuration)
                                            calculateValue(valueDuration, enteries, court);
                                        }} value={duration} />
                                        <span>Duration of one Match (in Minutes)</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">

                            <div className="reg-first-form-gender-section">
                                <div className="city-section-inside-div profile-setup-name-email-div">
                                    <div className="reg-participant-form-field profile-name-input" style={{ width: '100%', marginTop: '20px' }}>
                                        <input type="number" required onChange={(e) => {
                                            const valueetries = Math.max(1, Math.min(10000, Number(e.target.value)));
                                            console.log(valueetries)
                                            setEnteries(valueetries)
                                            calculateValue(duration, valueetries, court);


                                        }} value={enteries} />
                                        <span >Total Enteries</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">

                            <div className="reg-first-form-gender-section">
                                <div className="city-section-inside-div profile-setup-name-email-div">
                                    <div className="reg-participant-form-field profile-name-input" style={{ width: '100%', marginTop: '20px' }}>
                                        <input type="number" id="userName" required onChange={(e) => {
                                            const valuecourt = Math.max(1, Math.min(200, Number(e.target.value)));
                                            setCourt(valuecourt);

                                            calculateValue(duration, enteries, valuecourt)
                                        }} value={court} />
                                        <span>Number of Fields / Courts </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        {/* <div className="col-lg-12 col-md-12 col-sm-12">

                    <div className="reg-first-form-gender-section">
                        <div className="city-section-inside-div profile-setup-name-email-div">
                            <div className="reg-participant-form-field profile-name-input" style={{ width: '100%' }}>

                                <button className="mybutton button5" onClick={() => {
                                    calculateValue();


                                }}>
                                    <span
                                        style={{ paddingLeft: '8px', position: 'relative', top: '-1px', fontSize: '1rem' }}>Calculate</span>
                                    <span
                                        style={{ position: 'relative', top: '3px', paddingLeft: '5px', fontSize: '1.1rem' }}
                                        className="material-symbols-outlined">
                                        arrow_right_alt
                                    </span>
                                </button>


                            </div>

                        </div>
                    </div>
                </div> */}
                        <div className="col-6">
                            <div className='calculator-output-div'>
                                <h1>Total Duration</h1>
                                <h2>{totalDuration} </h2>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className='calculator-output-div'>
                                <h1>Total Matches</h1>
                                <h2>{totalMatches} </h2>
                            </div>
                        </div>

                    </div>
                </div >
            </div >


        </div >
    )
}
