import { useContext, useEffect, useMemo, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import allPlayers from "../data/players.json"
import RosterList from "../components/RosterSpot"

//6 - #of rostered players create that many black cards

type Player = {
    id: number;
    name: string;
    cost: number;
    team: string;
    kills: number;
    placement: number;
}


export function Roster() {
    const [MatchDay, setMatchDay] = useState(3);
    const [players, setPlayers] = useState<Player[]>([]);
    const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
    const [editToggle, ChangeEditToggle] = useState(true);
    const [totalCost, setTotalCost] = useState(0);
    const [totalPoints, updateTotalPoints] = useState(0)
    useEffect(() => {
        // Replace 'data.json' with the correct URL or file path to your JSON data
        fetch('data.json')
            .then((response) => response.json())
            .then((data) => setPlayers(data));
    }, []);

    const toggleRosterEdit = () => {
        ChangeEditToggle((editToggle) => !editToggle);
    };

    const filteredPlayerList = allPlayers.filter((player) => {
        return !selectedPlayers.some((selectedPlayer) => selectedPlayer.id === player.id);
    })

    function handleAddItem(player: Player) {
        const isItemSelected = selectedPlayers.some((selectedPlayer) => selectedPlayer.id === player.id);

        if (!isItemSelected && selectedPlayers.length < 6) {
            setSelectedPlayers((prevPlayers) => [...prevPlayers, player]);
            setTotalCost(totalCost + player.cost);
            updateTotalPoints(totalPoints + player.kills + player.placement)
        }
    };
    function handleRemovePlayer(playerId: number) {
        const playerToRemove = selectedPlayers.find((player) => player.id === playerId);
        if (playerToRemove) {
            setSelectedPlayers((prevPlayers) => prevPlayers.filter((p) => p.id !== playerId));
            setTotalCost((prevTotalCost) => prevTotalCost - playerToRemove.cost);
            updateTotalPoints(totalPoints - playerToRemove.kills - playerToRemove.placement)
        }
    }

    return (
        ///Will have 2 components one that pops out when the user selects to add a player
        <Container className="mw-100">
            <Row>
                <Col className="w-0">
                    <h4>Players</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Team</th>
                                <th scope="col">Cost</th>
                                {editToggle ? <th></th> : <th scope="col">Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPlayerList.map((player) => {
                                return (
                                    <tr>
                                        <td>{player.name}</td>
                                        <td>{player.team}</td>
                                        <td>${player.cost}</td>
                                        {editToggle ? <td></td> : <td><button className="bg-success rounded-pill" onClick={() => handleAddItem(player)}>Add</button></td>}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Col>
                <Col xs={8} className="px-2">
                    <div className="bg-light p-3 mb-2">
                        <div className="d-flex justify-content-between">
                            <h4>Current Rostered Players: {selectedPlayers.length}/6</h4>
                            <h4>Total Cost: ${totalCost}/$30</h4>
                            <h4 className="mb-3">Current MatchDay: {MatchDay}</h4>
                        </div>
                    </div>
                    <Row md={2} xs={1} lg={3} className="g-3">

                        {selectedPlayers.map(player => (

                            <Col key={player.name}>
                                <RosterList key={player.id} player={player} points={player.kills + player.placement} handleRemovePlayer={handleRemovePlayer} editMode={editToggle} matchday={MatchDay} />
                            </Col>
                        ))}
                    </Row>
                    <div className="d-flex mt-4">
                        {editToggle ? <button className="bg-secondary rounded-pill" onClick={toggleRosterEdit}>Edit Roster</button> : <button className="bg-success rounded-pill" onClick={toggleRosterEdit}>Save Changes</button>}
                        <div className="bg-light d-flex mx-2 px-2 py-1">
                            <h4>TotalPoints: {totalPoints}</h4>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

