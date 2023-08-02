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
}


export function Roster() {
    const [MatchDay, setMatchDay] = useState(3);
    const [players, setPlayers] = useState<Player[]>([]);
    const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
    const [editToggle, ChangeEditToggle] = useState(true)
    const [totalCost, setTotalCost] = useState(0)
    useEffect(() => {
        // Replace 'data.json' with the correct URL or file path to your JSON data
        fetch('data.json')
            .then((response) => response.json())
            .then((data) => setPlayers(data));
    }, []);

    const toggleRosterEdit = () => {
        ChangeEditToggle((editToggle) => !editToggle);
    };

    const filteredPlayerList =  allPlayers.filter((player)=> {
            return !selectedPlayers.some((selectedPlayer) => selectedPlayer.id === player.id);
        })

    function handleAddItem(player: Player) {
        const isItemSelected = selectedPlayers.some((selectedPlayer) => selectedPlayer.id === player.id);

        if (!isItemSelected && selectedPlayers.length < 6) {
            setSelectedPlayers((prevPlayers) => [...prevPlayers, player]);
            setTotalCost(totalCost+player.cost);
        }
    };
    function handleRemovePlayer(playerId: number) {
        const playerToRemove = selectedPlayers.find((player) => player.id === playerId);
        if (playerToRemove) {
          setSelectedPlayers((prevPlayers) => prevPlayers.filter((p) => p.id !== playerId));
          setTotalCost((prevTotalCost) => prevTotalCost - playerToRemove.cost);
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
                                <th scope="col">Cost</th>
                                {/* {editToggle ?<th scope="col">Action</th> : <th></th>} */}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPlayerList.map((player) => {
                                return (
                                    <tr>
                                        <td>{player.name}</td>
                                        <td>${player.cost}</td>
                                        {editToggle ?<td></td>: <td><button onClick={() => handleAddItem(player)}>Add</button></td> }
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Col>
                <Col xs={8} className="p-1">
                    <div className="bg-secondary p-3 mb-2">
                        <div className="d-flex justify-content-between">
                            <h4>Current Rostered Players: {selectedPlayers.length}/6</h4>
                            <h4>Total Cost: ${totalCost}/$30</h4>
                            <h4 className="mb-3">Current MatchDay: {MatchDay}</h4>
                        </div>
                    </div>
                    <Row md={2} xs={1} lg={3} className="g-3">

                        {selectedPlayers.map(player => (
                            
                            <Col key={player.name}>
                                <RosterList player={player} handleRemovePlayer={handleRemovePlayer} editMode={editToggle} />
                            </Col>
                        ))}
                    </Row>
                    <button className="mt-4" onClick={toggleRosterEdit}> {editToggle ? 'Edit Roster' : 'SaveChanges'}</button>
                </Col>
            </Row>
        </Container>
    )
}

