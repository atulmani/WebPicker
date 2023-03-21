import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { functions } from '../firebase.js'
import { httpsCallable } from "firebase/functions";
import EventDetailsMenu from './EventDetailsMenu';
import EDTournamentDetails from './EDTournamentDetails';


export default function PlayerParticipation() {
    let { state } = useLocation();
    const { playerID, eventID, playerUserID } = state;
    const [eventDetails, setEventDetails] = useState(window.localStorage.getItem('EventDetails') ? JSON.parse(window.localStorage.getItem('EventDetails')) : null);
    const [participantCount, setParticipantCount] = useState(0);
    const [participantDetails, setParticipantDetails] = useState(null);

    useEffect(() => {
        // console.log(eventDetails);
        var para1 = {};
        async function fetchData() {
            para1 = {
                EventID: eventDetails.Eventid,
                PlayerID: playerID

            };
            // console.log(para1);
            const ret1 = httpsCallable(functions, "getAllRegisteredEventListByPlayerCode");
            ret1(para1).then(async (result) => {
                setParticipantDetails(result.data);
                // var cnt = 0;
                // console.log(result.data.length);
                // result.data.forEach(element => {
                //     cnt = cnt + 1;
                // });

                setParticipantCount(result.data.length);
                // console.log(participantDetails);
                // console.log(participantCount);
            });
        }
        fetchData();
    }, []);

    // var regCategory = [];
    // selectedCategory.forEach(element => {
    //     var partName = '';
    //     var partnerUID = '';
    //     var partnerPlayerID = '';
    //     var pindex = partnerList.find(e => e.categoryName === element.CategoryName);
    //     // console.log('pindex', pindex);
    //     // console.log('partnerList[pindex]', pindex);
    //     if (pindex) {
    //         partName = pindex.partnerName;
    //         partnerUID = pindex.partnerUserID;
    //         partnerPlayerID = pindex.partnerID;
    //     }
    //     var selCat = {
    //         CategoryName: element.CategoryName,
    //         EventType: element.EventType,
    //         Fees: element.Fees,
    //         Gender: element.Gender,
    //         MaxTeamSize: element.MaxTeamSize,
    //         PartnerPlayerID: partnerPlayerID,
    //         PartnerPlayerName: partName,
    //         PartnerUserID: partnerUID,
    //         PaymentStatus: 'Pending'
    //     }
    //     regCategory.push(selCat);
    //     // console.log(element.CategoryName);
    //     // console.log('registeredEvents : ', registeredEvents);
    //     // console.log('partnerList : ', partnerList);
    //     let eventindex = registeredEvents.find(e => e.CategoryName === element.CategoryName);
    //     var catArrayDel = deletedEvent;
    //     // console.log(eventindex);
    //     if (eventindex < 0) {
    //         catArrayDel.push(element.CategoryName);
    //         setDeletedEvent(catArrayDel);
    //     }


    // });

    // var para1 = {};
    // para1 = {
    //     EventID: eventID,
    //     ParticipantID: participantDetails.PlayerID,
    //     PlayerID: participantDetails.id,
    //     ParticipantName: participantDetails.UserName,
    //     CategoryList: regCategory,//selectedCategory,
    //     DeleteCategoryList: deletedEvent,
    // };
    // // console.log('para1', para1);
    // const ret1 = httpsCallable(functions, "registerAllEvent");
    // ret1(para1).then((result) => {
    //     // console.log('result', result);
    //     window.localStorage.setItem('SelectedCategory', JSON.stringify(regCategory));
    //     navigate("/RegistrationCheckout", { state: { id: 1, participantDetails: participantDetails, selectedCategory: regCategory } });


    // })



    return (
        <>
            <div className="container-fluid">
                <div className="row no-gutters">
                    {eventDetails && <EventDetailsMenu eventDetails={eventDetails} calledFrom='ParticipantDetails' participantDetails={participantDetails} />}
                    {eventDetails && <EDTournamentDetails eventDetails={eventDetails} showRegistration={true} />}
                </div>
            </div>
        </>
    )

}
