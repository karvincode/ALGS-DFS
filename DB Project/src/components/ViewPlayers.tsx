import allPlayers from "../data/players.json"
import { Player } from '../App'
type ViewPlayerProps = {
    playersNotInWorkingRoster: Player[];
    addPlayerToWorkingRoster: (player: Player) => void;
};
export const ViewPlayers: React.FC<ViewPlayerProps> = ({ playersNotInWorkingRoster, addPlayerToWorkingRoster }) => {

    return (
        <>
            <h4>Players</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Team</th>
                        <th scope="col">Cost</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {playersNotInWorkingRoster.map((player) => {
                        return (
                            <tr key={player.id}>
                                <td>{player.name}</td>
                                <td>{player.team}</td>
                                <td>${player.cost}</td>
                                <td><button className="bg-success rounded-pill" onClick={() => addPlayerToWorkingRoster(player)}>Add</button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}
