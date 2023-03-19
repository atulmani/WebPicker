import React from 'react';
import '../css/Wallet.css';

export default function Wallet() {
  return (
    <div>

<br/>

<div className="container-fluid">

    <div className="white-div">
        <div className="profile-wallet">

            <div>
                <h1><span>Wallet</span> Balance</h1>
                <h2>₹ 864<span>.90</span></h2>
            </div>
            <div>
                <span className="material-symbols-outlined">
                    account_balance_wallet
                </span>
            </div>

        </div>
    </div>
    <br/>

    <div className="row no-gutters">
        <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="padding-div">
                <div className="white-div">
                    <div className="add-money-card">
                        <h1>Add Money to <span>Wallet</span></h1>

                        <div className="add-money-input">
                            <input title="Add Money Amount" type="number" name="" maxlength="30" required
                                value=""/>
                            <span>₹</span>
                        </div>
                        <div>
                            <div>+ ₹100</div>
                            <div>+ ₹200</div>
                            <div>+ ₹500</div>
                            <div>+ ₹1000</div>
                        </div>
                        <br/>
                        <div>
                            <button className="mybutton button5">Proceed to add<span> ₹100 </span></button>
                        </div>
                    </div>
                </div>
            </div>
            <br/>

        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="padding-div">
                <div className="white-div">
                    <div className="settings-div" style={{padding: '5px 10px'}}>
                        <div className="icon">
                            <span className="material-symbols-outlined">
                                bar_chart
                            </span>
                        </div>

                        <div className="address-text">
                            <h5>View Analytics</h5>
                            <div className="">
                                <span className="material-symbols-outlined">
                                    chevron_right
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>

    <br/>

    <div className="all-headings">
        <h1>History</h1>
        <div className="dot one"></div>
        <div className="dot two"></div>
    </div>
    <br/>

    <div className="row no-gutters">

        <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="payment-history-card">
                <div className="payment-history-icon add">
                    <div>
                        <span className="material-symbols-outlined">
                            add
                        </span>
                    </div>
                </div>
                <div className="payment-history-content">
                    <h1>Added To Wallet</h1>
                    <h2>Today, 11:45 AM</h2>
                </div>
                <div className="payment-history-price">
                    <h1>+ ₹1000<span>.85</span></h1>
                </div>
            </div>
        </div>

        <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="payment-history-card">
                <div className="payment-history-icon minus">
                    <div>
                        <span className="material-symbols-outlined">
                            remove
                        </span>
                    </div>
                </div>
                <div className="payment-history-content">
                    <h1>Removed From Wallet</h1>
                    <h2>8th Mar, 05:39 AM</h2>
                </div>
                <div className="payment-history-price">
                    <h1>- ₹300<span>.00</span></h1>
                </div>
            </div>
        </div>

    </div>


    <br/><br/><br/>

    <div className="row no-gutters">
        <div className="col-lg-6 col-md-12 col-sm-12">

            <div className="padding-div">
                <div className="white-div" style={{padding: '0 10px'}}>
                    <div className="settings-div">
                        <div className="icon">
                            <span className="material-symbols-outlined">
                                sell
                            </span>
                        </div>

                        <div className="address-text">
                            <h5>Offers & Cashback</h5>
                            <div className="">
                                <span className="material-symbols-outlined">
                                    chevron_right
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr style={{margin: '0',border: 'none', borderBottom: '1px solid #ddd'}} />

                    <div className="settings-div">
                        <div className="icon">
                            <span className="material-symbols-outlined">
                                sms
                            </span>
                        </div>

                        <div className="address-text">
                            <h5>Help & Support</h5>
                            <div className="">
                                <span className="material-symbols-outlined">
                                    chevron_right
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">

            <div className="padding-div">


                <div className="white-div" style={{padding: '0 10px'}}>
                    <div className="settings-div">
                        <div className="icon">
                            <span className="material-symbols-outlined">
                                tune
                            </span>
                        </div>

                        <div className="address-text">
                            <h5>Settings</h5>
                            <div className="">
                                <span className="material-symbols-outlined">
                                    chevron_right
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr style={{margin: '0',border: 'none', borderBottom: '1px solid #ddd'}} />

                    <div className="settings-div">
                        <div className="icon">
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                        </div>

                        <div className="address-text">
                            <h5>Logout</h5>
                            <div className="">
                                <span className="material-symbols-outlined">
                                    chevron_right
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>
    <br/><br/><br/>


</div>
      
    </div>
  )
}
