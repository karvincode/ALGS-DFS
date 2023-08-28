import { Tabs, Tab, Col, Container, Row } from "react-bootstrap";
import placeScoring from "../data/placementPoints.json"
import "../css/index.css"
import React from "react";
//Deadlines
//LeaderBoard
//managing squad
//Have to figure out

export function Rules() {
    return (
        <Tabs
            defaultActiveKey="rules"
            className="mx-5">
            <Tab eventKey="rules" title="Rules" className="mt-3">
                <h3 className="mx-5">Rules</h3>
                <ul className="mx-5">
                    <li>You pick up to 6 players all located within the North American Region only during Playoffs and the ALGS Championship does the available player pool open to the teams that qualified.</li>
                    <li>You can edit your team up until 1 hour before the first match and the lineup is autimatically locked for the Match Day.</li>
                    <li>For the Matchday that occurs the following day you can submit your roster 1 hour after the previous days matches finish.</li>
                    <li>In instances where a player plays multiple times during that day the cost of the player will double. </li>
                </ul>
            </Tab>
            <Tab eventKey="scoring" title="Scoring" className="mt-3">
                <h3 className="mx-5">Scoring</h3>
                <ul className="mx-5">
                    <li>Players will earn points in two ways placement and kills. Placement will be indicative of their team's success and kills will be their own personal tally.</li>
                    <li >Placement points will follow the same scoring structure as ALGS which is listed below.</li>
                    <li className="mb-2">Kills will be worth one point each and every 3 kills an additional point will be awarded.</li>
                    <h3>Scoring Matrix</h3>
                    <table className="table table-sm table-bordered table-auto rules-table">
                        <thead>
                            <tr>
                                <th scope="col">Place</th>
                                <th scope="col">Points</th>
                               
                            </tr>
                        </thead>
                    <tbody className="">
                        {placeScoring.map((score) => {
                                return (
                                    <tr>
                                        <td className="narrow-column">{score.place}</td>
                                        <td className="narrow-column">{score.points}</td>
                                    </tr>
                                );
                            })}

                    </tbody>
                    </table>
                </ul>
            </Tab>
        </Tabs>
    )
}