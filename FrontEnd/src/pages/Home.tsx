import { useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ViewLeaderBoard } from "../components/ViewLeaderBoard";


export function Home() {

    const matchdays = [
        "Matchday 1",
        "Matchday 2",
        "Matchday 3",
        "Matchday 4",
        "Matchday 5",
        "Matchday 6",
        "Matchday 7",
        "Matchday 8",
        "Matchday 9",
        "Matchday 10",
        "Finals",
    ];

    const [selectedMatchdayIndex, selectMatchdayIndex] = useState(1);
    
    const handleMatchdayChange = (event: { target: { value: any; }; }) => {
        const selectedValueIndex = event.target.value;
        selectMatchdayIndex(selectedValueIndex);
    };

    const selectedMatchday = matchdays[selectedMatchdayIndex];
    return (
        //Link will go to the sign in and sign up page
        <>
            <Container>
                <Row>
                    <Col className="">
                        <h2>Compete in Daily Fantasy ALGS</h2>
                        <div className="d-flex align-items-center">
                            <Button size="sm" className="me-2 bg-light"><Link to="/team" className="text-black text-decoration-none" >Sign Up Here</Link></Button>

                            <p className="text-center ">or if you already have an account</p>

                            <Button size="sm" className="ms-2 bg-light"><Link to="/team" className="text-black text-decoration-none" >Sign In Here</Link></Button>
                        </div>
                        <h3>Pick your Dream Roster</h3>
                        <p>Pick your Dream Lineup of Apex Legends Pros using a budget and drafting up to 5 players to compete with other drafters.</p>
                        <h3>How do you play?</h3>
                        <p>You select 6 players from the pool of 60 that are playing that matchday each with a varying costs and you must keep the total cost under the Salary Cap.</p>
                        <h3>How do you win?</h3>
                        <p>Each matchday(Round) is seperately tracked and scored the ultimate goal is to win that singular matchday. You can view your rank on both the Roster page and to the right on the leaderboard.</p>
                    </Col>
                    <Col xs="6" className="pl-10">
                        <ViewLeaderBoard selectedMatchday={selectedMatchday} handleMatchdayChange={handleMatchdayChange} selectedMatchdayIndex={selectedMatchdayIndex} matchdays={matchdays}></ViewLeaderBoard>
                    </Col>
                </Row>
            </Container>

        </>
    )
}