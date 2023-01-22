import React, { useEffect, useState } from 'react'
import '../css/EventRegistration.css'
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from "../context/useLocalStorage";
import RenderCategoryForRegistration from './RenderCategoryForRegistration';
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";


export default function RegistrationCategory() {
    const { state } = useLocation();
    const { id, participantDetails } = state;
    const [categoryList, setCategoryList] = useState();
    const [eventDetails, setEventDetails] = useLocalStorage('EventDetails', null);
    const [categorySelect, setCategorySelect] = useState();
    const [eventID, setEventID] = useLocalStorage('EventID', null);
    const [registeredEvents, setRegisteredEvents] = useState();
    const [totalEvent, setTotalEvent] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    function saveCategory(e) {
        e.preventDefault();
    }
    function selectCategory(e) {
        //    e.preventDefault();
    }
    useEffect(() => {
        console.log('useEffect');
        console.log('id ', id);
        console.log('participantDetails ', participantDetails);
        setCategoryList(checkCategory());
        console.log(categoryList);
        getRegisteredEvents();
    }, []);
    function calculatePayment(isAdd, amount) {
        isAdd ? setTotalEvent(totalEvent + 1) : setTotalEvent(totalEvent - 1);
        isAdd ? setTotalPayment(totalPayment + amount) : setTotalPayment(totalPayment - amount);
    }
    function getRegisteredEvents() {
        var para1 = {};
        para1 = {
            PlayerID: participantDetails.PlayerID,
            EventID: eventID,
        };
        const ret1 = httpsCallable(functions, "getAllRegisteredEventList");
        ret1(para1).then((result) => {
            setRegisteredEvents(result.data);
            console.log(registeredEvents);
            result.data.forEach(data => {
                console.log(data);
                setTotalEvent(totalEvent + 1);
                setTotalPayment(totalPayment + Number(data.Fees))
            });
        });

    }
    function checkCategory() {
        console.log('in checkCategory');
        let flagGender = false;
        let flagDate = false;
        let selectedCategory = [];
        // console.log(eventDetails);
        if (eventDetails.CategoryDetails !== undefined && eventDetails.CategoryDetails !== null) {
            eventDetails.CategoryDetails.forEach(element => {
                flagGender = false;
                flagDate = false;
                let dob = new Date(participantDetails.DateOfBirth._seconds * 1000);
                // console.log(element);
                flagGender = (element.Gender.toUpperCase() === participantDetails.Gender ? true :
                    element.Gender.toUpperCase() === 'MIXED' ? true : false);
                // console.log(flagGender);
                if (flagGender === true) {
                    var refDate = new Date(element.ReferenceDate._seconds * 1000);
                    // console.log(refDate);
                    if (element.DateRefType === 'Before' && dob <= refDate) {
                        flagDate = true;
                    } else if (element.DateRefType === 'After' && dob >= refDate) {
                        flagDate = true;
                    }
                    if (flagDate === true) {
                        // console.log("Render Category", element.CategoryName);
                        selectedCategory.push(element);
                    }
                }

            });

        }
        console.log(selectedCategory)
        return selectedCategory;

    }
    return (

        <div className="container-fluid">
            <div className="row no-gutters">

                <div className="col-lg-8 col-md-8 col-sm-12">

                    <div id="regProfileNewParticipantDetails">
                        <h3 style={{ fontWeight: '1000', color: '#348DCB', textAlign: 'center' }}>CATEGORY</h3>
                        <h1 className="reg-form-email" id="playerName">{participantDetails.UserName}</h1>
                        (<h5 className="reg-form-email" id="playerID">{participantDetails.PlayerID}</h5>)
                        {participantDetails.Gender === 'Female' ? <h5 className="reg-form-email female" id="playerGender">FEMALE</h5> : <h5 className="reg-form-email male" id="playerGender">MALE</h5>}
                        <input type="hidden" id="hfPlayerDocID" />
                        <input type="hidden" id="hfPlayerID" />
                        <input type="hidden" id="hfGender" />
                        <br />
                    </div>

                    <div className="row no-gutters" id="categoryDiv">

                        {categoryList && categoryList.map((events) => {
                            let regEvent = registeredEvents && registeredEvents.find(e => e.CategoryName === events.CategoryName);
                            console.log(regEvent);
                            return <RenderCategoryForRegistration key={events.CategoryName} events={events} registeredEventStatus={regEvent} playerGender={participantDetails.Gender} ></RenderCategoryForRegistration>

                        })
                        }
                        {/* <div className="col-lg-4 col-md-6 col-sm-12" style={{ padding: '0' }}>
                            <div style={{ padding: '10px' }}>
                                <div className="reg-category-card" id="regCategoryGS17">

                                    <div className="display-flex-div"
                                        onClick={selectCategory}>
                                        <div className="category-details">
                                            <h1>GS U17</h1>
                                            <div className="category-icons">
                                                <span className="material-symbols-outlined female">
                                                    woman
                                                </span>
                                            </div>
                                        </div>

                                        <div className="category-fees">
                                            <h2><span>₹ </span> <span id="regCategoryGS17Price">1000</span>
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="select-category-div">
                                        <span className="material-symbols-outlined">
                                            done
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div> */}


                    </div><br />
                    <hr style={{ border: 'none', borderTop: '1px solid #aaa' }} />
                    <br />

                    <div className="category-checkout" id="checkOutDiv" style={{ opacity: '1' }}>

                        <div className="category-checkout-first-details">
                            <div className="first-details-total">

                                <div>
                                    <h3>TOTAL</h3>
                                    <input type="hidden" id="hfcatCount" />
                                </div>
                                <div>
                                    <h1><span>₹ </span> <span id="totalPrice">{totalPayment}</span></h1>
                                    <h2><span id="noOfCategories">{totalEvent}</span> <span> CATEGORIES</span></h2>
                                </div>
                            </div>
                            <div className="category-checkout-button-div">
                                <button onClick={saveCategory} className="mybutton button5"
                                    style={{ fontWeight: 'bold' }}>CHECKOUT</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div >
    )
}
