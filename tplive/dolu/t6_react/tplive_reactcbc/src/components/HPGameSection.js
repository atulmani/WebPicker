import '../css/HPGameSection.css'
import React, { Component } from 'react'

export default class GameSection extends Component {
    render() {
        return (
            <section>
                <div className="games-section"><br />
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
                </div>
            </section>

        )
    }
}
