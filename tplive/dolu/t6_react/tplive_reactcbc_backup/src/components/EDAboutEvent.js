import React from 'react'

export default function EDAboutEvent(props) {
    let ruleList = [];
    let ruleListWithKey = [];
    if (props.eventDetails.RulesAndRegulations) {
        ruleList = props.eventDetails.RulesAndRegulations.split(";");
        let i = 0;
        for (i = 0; i < ruleList.length; i++) {
            ruleListWithKey.push({ id: i, rule: ruleList[i] })
        }
        //   console.log('ruleListWithKey', ruleListWithKey);
    }
    //console.log('ctegory', props.eventDetails.CategoryDetails);

    var curFormat = {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    };
    var indexCategory = 1;
    return (
        <div className="col-lg-12"><br />
            <hr />
            <div className="heading">
                <span className="material-symbols-outlined">
                    display_settings
                </span>
                <h4 style={{ fontWeight: '1000' }}>About Event</h4>
            </div>

            <h2 className="event-details" id="EventDetails">
                {props.eventDetails.NoticeBoard && props.eventDetails.NoticeBoard.replaceAll(";", "<br>")}
                {/* Grace wait period will be 10 mins after which the participant/team will be disqualified, and the opponent
                will be declared winner for that match
                Trophies and medals will be awarded for the finalists of each category
                There will be a cash prize too for the winners and the runners up of each category

                Winning team - Rs. 2000
                Runners up team - Rs. 1000
                The event will be on Feb 21 2021
                Timing of the event will be from 2:00 pm to 7:00 pm
                Registrations will be open till 18th Feb 2021 11:59 pm

                The registration fees will be as follows:
                MS (Men’s Single) - Rs.500
                MD (Men’s Double) - Rs.750
                MD65+ (Men’s double) - 750
                Venue Contact: Krishal Shetty - 9663292233 |

                Venue Link: Not Available

                Venue: WHITEFIELD SPORTS CENTRE, SEEGEHALLI

                Registration Closed Date:Friday, 19 February 2021

                <br />
                We request you to kindly go through the rules and regulations before participating in the event.

                A player can participate in multiple categories in the tournament
                First round group stage 15 points
                Next round group stages 21 points
                There will be no concept of deuce till semi finals and the matches will be one set game
                After group stages top 4 who are left will be the semi finalists
                Semi finals and finals will be played for best of 3 sets(21 points). There will be deuce concept whenever
                the points are equaled at 20 – 20 each side. There will be no deuce more than 24 -24 each side and the team/
                player who reaches 25
                points will be the winner of the set
                Semi-finals and Finals will be recorded
                Teams/ players will have one review to challenge referee decision once per set in the semi finals and final
                match. Review will be there for only semi final and final matches
                At any point of the game, the referee decision will considered as the final decision. Argument with the
                referee will lead to disqualification from the tournament
                There will be 2 warnings given for a faulty service and the service will be redone after which the point
                will be given to the opponent */}
            </h2>

            <table className="content-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Gender</th>
                        <th>Fees</th>
                    </tr>
                </thead>
                <tbody id="eventCategoryDetails">
                    {props.eventDetails.CategoryDetails.map((category) => (

                        <tr key={category.CategoryName}>
                            <td>{indexCategory++}</td>
                            <td>{category.CategoryName}</td>
                            <td>{category.Gender} - {category.EventType}</td>

                            <td>{Number(category.Fees).toLocaleString('en-IN', curFormat)}</td>
                        </tr>
                    ))}

                    {/* {ruleListWithKey.map(({ rule, id }) => (
                        <p key={id}> <li> {rule}</li> </p>
                    ))} */}
                    {/* <tr>
                        <td>1</td>
                        <td>Boys Double Under11</td>
                        <td>M</td>
                        <td>600</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Boys Double Under11</td>
                        <td>M</td>
                        <td>600</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>BD U14</td>
                        <td>M</td>
                        <td>600</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>BD U17</td>
                        <td>M</td>
                        <td>600</td>
                    </tr> */}

                </tbody>
            </table>
            <br />
            <div style={{ border: '2px solid #333C5D' }} className="secbox">
                <div style={{ display: 'inline-block' }} className="">
                    <h4 style={{ fontWeight: '1000', color: '#348DCB' }}>Rules & Regulations </h4>
                    <hr />
                </div>
                <div id="RulesAndRegulations">
                    <ul>
                        {ruleListWithKey.map(({ rule, id }) => (
                            <p key={id}> <li> {rule}</li> </p>
                        ))}
                    </ul>
                </div>
                <ul>
                    <li>
                        <p>We request you to kindly go through the rules and regulations before participating in the event.</p>
                    </li>
                    <li>
                        <h6> Every player as well Guardian is requested wear mask and frequently use sanitizer. </h6>
                    </li>
                    <li>
                        <h6>All Covid protocols must be followed</h6>
                    </li>
                </ul>
            </div><br />

            <div style={{ border: '2px solid #333C5D' }} className="secbox">
                <div style={{ display: 'inline-block' }} className="">
                    <h4 style={{ fontWeight: '1000', color: '#348DCB' }}>Disclaimer </h4>
                    <hr />
                </div>
                <ul>
                    <li>
                        <p>TournamentPlanner LiVE has not verified the above information and also is not responsible of any
                            information which may be get changed or modified or any incorrect information. Please contact to the
                            organiser for any discrepancy.
                        </p>
                    </li>
                </ul>
            </div>
            <br /><hr />


        </div >
    )
}

