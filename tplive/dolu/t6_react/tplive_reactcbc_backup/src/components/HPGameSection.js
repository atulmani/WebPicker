import '../css/HPGameSection.css'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'


export default function HPGameSection() {
    const [showFlag, setShowFlag] = useState(true);

    let location = useLocation();
    // console.log(location.pathname);

    useEffect(() => {
        if (location.pathname === '/PhoneSignUp' || location.pathname === '/UserProfile') {
            setShowFlag(false);
        } else {
            setShowFlag(true);
        }
    }, [])


    return (
        <section>
            {showFlag && <div className="games-section"><br />
                <div className="container">

                    <div className="heading">
                        <span className="material-symbols-outlined">
                            scoreboard
                        </span>
                        <h4 style={{ fontEeight: '1000' }}>Your Playground</h4>
                    </div><br />

                    <div className="comming-soon">
                        <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_pnqcpdc8.json" background="transparent"
                            speed="1" loop autoplay></lottie-player>
                        <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_bhocdt4s.json" background="transparent"
                            speed="2" loop autoplay></lottie-player>
                    </div>

                </div><br /><br />
            </div>}
        </section>

    )
}
