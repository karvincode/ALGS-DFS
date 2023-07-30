import { useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

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
                    <Col>
                        <h2>Compete in Daily Fantasy ALGS</h2>
                        <div className="d-flex">
                            <button>Sign Up Here</button>
                            <Button size="sm" className="me-2"><Link to="/team" className="text-white text-decoration-none" >Sign Up Here</Link></Button>

                            <p className="text-center">or if you already have an account</p>

                            <Button size="sm" className="ms-2"><Link to="/team" className="text-white text-decoration-none" >Sign In Here</Link></Button>
                        </div>
                        <h2>Pick your Team</h2>
                        <div>Pick your Dream Lineup of Apex Legends Pros using a budget and drafting up to 5 players to compete with other drafters.</div>
                    </Col>
                    <Col xs="6">
                        <div className="d-flex">
                            <h2>{selectedMatchday} LeaderBoard</h2>
                            <select
                                className="mx-3"
                                onChange={handleMatchdayChange}
                                value={selectedMatchdayIndex}
                            >
                                <option value="">--Please choose an option--</option>
                                {matchdays.map((matchday, index) => (
                                    <option key={index} value={index}>
                                        {matchday}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <table className="table table-sm table-bordered table-auto"></table>
                        <thead>
                            <tr>
                                <th scope="col">Rank</th>
                                <th scope="col">Username</th>
                                <th scope="col">Points</th>
                            </tr>
                        <tbody>
                            {/* {placeScoring.map((leaderboard, index) => {
                                const rank = index +1;
                                return (
                                    <tr>
                                        <td className="narrow-column">{rank}</td>
                                        <td className="narrow-column">{leaderboard.username}</td>
                                        <td className="narrow-column">{leaderboard.points}</td>
                                    </tr>
                                );
                            })} */}

                        </tbody>
                        </thead>
                    </Col>
                </Row>
            </Container>

        </>
    )
}