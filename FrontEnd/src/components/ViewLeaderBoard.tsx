import leaderboardData from "../data/leaderboardData.json"


type HandleMatchdayChange = (event: {
    target: {
        value: any;
    };
}) => void;

type ViewLeaderBoardProps = {
    selectedMatchday: string;
    handleMatchdayChange: HandleMatchdayChange;
    selectedMatchdayIndex: number;
    matchdays: string[];
};


export const ViewLeaderBoard: React.FC<ViewLeaderBoardProps> = ({ selectedMatchday, handleMatchdayChange, selectedMatchdayIndex, matchdays }) => {

    return (
        <>
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

            <table className="table table-sm table-bordered table-auto mt-2">
                <thead>
                    <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Username</th>
                        <th scope="col">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((entry, index) => (
                        <tr key={index}>
                            <td className="narrow-column">{entry.rank}</td>
                            <td className="narrow-column">{entry.username}</td>
                            <td className="narrow-column">{entry.points}</td>
                        </tr>   
                    ))}
                </tbody>
            </table>
        </>
    )
}