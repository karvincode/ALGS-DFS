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
                        </table>
        </>
    )
}