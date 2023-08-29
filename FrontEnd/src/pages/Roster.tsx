import { useContext, useEffect, useMemo, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import { RosterPlayerCard } from "../components/RosterPlayerCard"
import { ViewPlayers } from "../components/ViewPlayers";
import { Player } from '../App'
import playersFile from "../data/players.json"
import { ActiveRoster } from "../components/ActiveRoster";

export function Roster() {
    const [matchDay, setMatchDay] = useState(3);
    const [playersInWorkingRoster, setPlayersInWorkingRoster] = useState<Player[]>([]);
    const [playersNotInWorkingRoster, setPlayersNotInWorkingRoster] = useState<Player[]>([]);
    const [totalCost, setTotalCost] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0)

    //Initially because players in Working ROster is empty every player is not in Working Roster
    useEffect(() => {
        setPlayersNotInWorkingRoster(playersFile)
    }, [])

    function addPlayerToWorkingRoster(player: Player) {

        if (playersInWorkingRoster.length < 6) {
            setPlayersInWorkingRoster([...playersInWorkingRoster, player])
            setPlayersNotInWorkingRoster(playersNotInWorkingRoster.filter((p) => p.id !== player.id));
            setTotalPoints(totalPoints + player.kills + player.placement)
        }
    };
    // const playerToRemove = playersInWorkingRoster.find((player) => player.id === playerId);
    function removePlayerFromWorkingRoster(player: Player) {
        setPlayersInWorkingRoster(playersInWorkingRoster.filter((p) => p.id !== player.id));
        setPlayersNotInWorkingRoster([...playersNotInWorkingRoster, player])

        setTotalCost(totalCost - player.cost);
        setTotalPoints(totalPoints - player.kills - player.placement)

    }
    // const playersNotInWorkingRoster = allPlayers.filter((player) => {
    //     return !playersInWorkingRoster.some((selectedPlayer) => selectedPlayer.id === player.id);
    // })
    return (
        ///Will have 2 components one that pops out when the user selects to add a player
        <Container className="mw-100">
            <Row>
                <Col className="w-0">
                    <ViewPlayers addPlayerToWorkingRoster={addPlayerToWorkingRoster} playersNotInWorkingRoster={playersNotInWorkingRoster} ></ViewPlayers>
                </Col>
                <Col xs={8} className="px-2">
                    <ActiveRoster playersInWorkingRoster={playersInWorkingRoster} totalCost={totalCost} matchDay={matchDay} totalPoints={totalPoints} removePlayerFromWorkingRoster={removePlayerFromWorkingRoster}></ActiveRoster>
                </Col>
            </Row>
        </Container>
    )
}

