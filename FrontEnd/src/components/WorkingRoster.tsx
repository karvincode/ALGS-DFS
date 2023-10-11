import { Row, Col } from "react-bootstrap";
import { Player } from "../App";
import { RosterPlayerCard } from "./RosterPlayerCard";

type WorkingRosterProps = {
    playersInWorkingRoster: Player[];
    removePlayerFromWorkingRoster: (player: Player) => void;
    totalCost: number;
    matchDay: number;
    totalPoints: number;
};

export const WorkingRoster: React.FC<WorkingRosterProps> = ({ playersInWorkingRoster, totalCost, matchDay, totalPoints, removePlayerFromWorkingRoster }) => {

    return (
        <>
            <div className="bg-light p-3 mb-2">
                <div className="d-flex justify-content-between">
                    <h4>Current Rostered Players: {playersInWorkingRoster.length}/6</h4>
                    <h4>Total Cost: ${totalCost}/$30</h4>
                    <h4 className="mb-3">Current MatchDay: {matchDay}</h4>
                </div>
            </div>
            <Row md={2} xs={1} lg={3} className="g-3">

                {playersInWorkingRoster.map(player => (

                    <Col key={player.name}>
                        <RosterPlayerCard key={player.id} player={player} points={player.kills + player.placement} removePlayerFromWorkingRoster={removePlayerFromWorkingRoster} matchday={matchDay} />
                    </Col>
                ))}
            </Row>
            <div className="d-flex mt-4">
                <button className="bg-success rounded-pill">Save Changes</button>
                <div className="bg-light d-flex mx-2 px-2 py-1">
                    <h4>TotalPoints: {totalPoints}</h4>
                </div>
            </div>
        </>
    )
}
