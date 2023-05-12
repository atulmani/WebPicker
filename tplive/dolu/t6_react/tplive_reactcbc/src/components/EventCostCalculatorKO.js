import React, { useState } from 'react'

export default function EventCostCalculatorKO(props) {
    const [duration, setDuration] = useState(20);
    const [enteries, setEnteries] = useState(50);
    const [category, setCategory] = useState(1);
    const [court, setCourt] = useState(1);
    const [totalDuration, setTotalDuration] = useState('16 Hours 20 Minutes');
    const [totalMatches, setTotalMatches] = useState(49);

    function calculateValue(lduration, lentries, lcategory, lcourt) {
        var totalM = lentries - lcategory;
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
        props.setShowComponents('knockout');
    }
    return (
        <div>

            <div className={props.showFlag === 'knockout' ? 'calculator-div open' : 'calculator-div'}>
                <div className='calculator-heading' onClick={setFlag}>
                    <h1>Time Calculator - Knock out</h1>
                </div>
                <div className='calculator-content'>
                    <div className="row no-gutters">

                        <div className="col-6">

                            <div className="reg-first-form-gender-section">
                                <div className="city-section-inside-div profile-setup-name-email-div">
                                    <div className="reg-participant-form-field profile-name-input" style={{ width: '100%', marginTop: '20px' }}>
                                        <input type="number" required onChange={(e) => {
                                            const valueDuration = Math.max(1, Math.min(120, Number(e.target.value)));
                                            setDuration(valueDuration)
                                            calculateValue(valueDuration, enteries, category, court);
                                        }} value={duration} />
                                        <span style={{ top: '-5px' }}>Duration of one Match (in Minutes)</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-6">

                            <div className="reg-first-form-gender-section">
                                <div className="city-section-inside-div profile-setup-name-email-div">
                                    <div className="reg-participant-form-field profile-name-input" style={{ width: '100%', marginTop: '20px' }}>
                                        <input type="number" required onChange={(e) => {
                                            const valueetries = Math.max(1, Math.min(10000, Number(e.target.value)));
                                            console.log(valueetries)
                                            setEnteries(valueetries)
                                            calculateValue(duration, valueetries, category, court);


                                        }} value={enteries} />
                                        <span style={{ top: '-5px' }}>Total Enteries</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-6">

                            <div className="reg-first-form-gender-section">
                                <div className="city-section-inside-div profile-setup-name-email-div">
                                    <div className="reg-participant-form-field profile-name-input" style={{ width: '100%', marginTop: '20px' }}>
                                        <input type="number" id="userName" required onChange={(e) => {
                                            const valuecategory = Math.max(1, Math.min(200, Number(e.target.value)));
                                            setCategory(valuecategory);
                                            calculateValue(duration, enteries, valuecategory, court)
                                        }} value={category} />
                                        <span style={{ top: '-5px' }}>Number of Categories / Courts </span>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-6">

                            <div className="reg-first-form-gender-section">
                                <div className="city-section-inside-div profile-setup-name-email-div">
                                    <div className="reg-participant-form-field profile-name-input" style={{ width: '100%', marginTop: '20px' }}>
                                        <input type="number" id="userName" required onChange={(e) => {
                                            const valuecourt = Math.max(1, Math.min(200, Number(e.target.value)));
                                            setCourt(valuecourt);

                                            calculateValue(duration, enteries, category, valuecourt)
                                        }} value={court} />
                                        <span style={{ top: '-5px' }}>Number of Fields / Courts </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <hr></hr>

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
