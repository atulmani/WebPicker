import React, { useState } from 'react'
import EventCostCalculatorKO from './EventCostCalculatorKO'
import EventCostCalculatorL from './EventCostCalculatorL'
import CostCalculator from './CostCalculator';

export default function Calculators() {
    const [showComponents, setShowComponents] = useState('knockout');

    function setFlag(flag) {
        if (showComponents === flag) {
            setShowComponents("");
        } else {
            setShowComponents(flag);
        }

    }
    return (
        <div>
            <br></br>
            <EventCostCalculatorKO setShowComponents={setFlag} showFlag={showComponents} />
            <br></br>
            <EventCostCalculatorL setShowComponents={setFlag} showFlag={showComponents}></EventCostCalculatorL>
            <br></br>
            <CostCalculator setShowComponents={setFlag} showFlag={showComponents}></CostCalculator>
        </div>
    )
}
