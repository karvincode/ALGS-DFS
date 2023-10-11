const { query } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'FF-ALGS-DB',
    password: 'kesav',
    port: 5432,
})

const getUsers = (request, response) => {
    pool.query('Select * From Users', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateUsersName = (request, response) => {
    const newUsername = request.params.newUsername;
    const currentUsername = request.params.currentUsername;
    console.log(newUsername,currentUsername)

    pool.query(
        'UPDATE users SET username = $1 WHERE username = $2',
        [newUsername, currentUsername],
        (error, results) => {
            if (error) {
                throw error
            }
            console.log(error,results)
            response.status(200).send(`Username changed to: ${newUsername}`)
        }
    )
}

const getRoster = (request, response) => {
    const username = request.params.username
    pool.query(
        'Select * From Roster WHERE username = $1',
        [username],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        })
}

const addRoster = (request, response) => {
    const username = request.params.username;
    const playerIDs = request.body.playerIDs; // Assuming the request body contains an array of playerIDs

    if (!Array.isArray(playerIDs)) {
        return response.status(400).send('playerIDs should be an array');
    }

    const values = playerIDs.map(playerID => [username, playerID]);

    pool.query(
        'INSERT INTO Roster (username, PlayerID) VALUES ($1, $2), ($3, $4), ($5, $6), ($7, $8)',
        values.flat(),
        (error, results) => {
            if (error) {
                console.error(error);
                response.status(500).send('Error inserting data.');
            } else {
                response.status(200).send('Data inserted successfully.');
            }
        }
    );
}

const deleteSpecificRoster = (request, response) => {
    const username = request.params.username;
    pool.query(
        'DELETE FROM Roster WHERE username = $1;',
        [username],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Deleted ${username} roster`)
        }
    )
}

const deleteEveryRoster = (request, response) => {
    pool.query('DELETE FROM Roster', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send('Deleted Every Roster.')
    })

}
const getRosterScores = (request, response) => {
    const query = `
        SELECT 
            u.username,
            SUM(ps.score) AS RosterScore
        FROM Users AS u
        LEFT JOIN Roster AS r
            ON u.username = r.username
        LEFT JOIN Player AS p
            ON r.playerID = p.playerID
        LEFT JOIN PlayerScore AS ps
            ON r.playerID = ps.PlayerID
        GROUP BY u.username
        ORDER BY RosterScore DESC;
    `;

    pool.query(query, (error, results) => {
        if (error) {
            console.error(error);
            response.status(500).send('Error fetching roster scores.');
        }
        response.status(200).json(results.rows);
    });
};
const updatePlayerScore = (request, response) => {
    const newScore = request.body.newScore; 
    const playerID = request.params.playerID;
    const weekID = request.params.weekID;

    console.log('Received PATCH request to update player score:');
    console.log('newScore:', newScore);
    console.log('playerID:', playerID);
    console.log('weekID:', weekID);

    pool.query(
        'UPDATE playerscore SET score = $1 WHERE playerid = $2 AND weekid = $3',
        [newScore, playerID, weekID],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Player ${playerID} Score changed to: ${newScore} on the week of ${weekID}`)
        }
    )
}
const createPlayer = (request, response) => {
    const playerCost = request.body.playerCost;
    const teamName  = request.body.teamName;
    const playerName  = request.body.playerName;

  const insertQuery = `
    INSERT INTO Player (playercost, TeamName, PlayerName)
    VALUES ($1, $2, $3)
    RETURNING *;`;

  pool.query(insertQuery, [playerCost, teamName, playerName], (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      response.status(500).json({ error: 'Error inserting data' });
    } else {
      console.log('Data inserted successfully:', results.rows[0]);
      response.status(201).json(results.rows[0]);
    }
  });
}

const getPlayers = (request, response) => {
    pool.query('Select * From Player', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPlayer = (request, response) => {
    const playerName = request.params.playername
    pool.query(
        'Select * From Player WHERE playername = $1',
        [playerName],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        })
}

const updatePlayer = (request, response) => {
    const { playerName, oldTeamName, newTeamName, newPlayerName } = request.body;

    if (!playerName || (!oldTeamName && !newTeamName && !newPlayerName)) {
        return response.status(400).json({ error: 'Specify playerName and either oldTeamName, newTeamName, or newPlayerName to update.' });
    }

    const queryParams = [];
    let updateQuery = 'UPDATE Player SET ';

    if (newTeamName) {
        updateQuery += 'TeamName = $1';
        queryParams.push(newTeamName);
    }

    if (newTeamName && newPlayerName) {
        updateQuery += ', ';
    }

    if (newPlayerName) {
        updateQuery += 'PlayerName = $2';
        queryParams.push(newPlayerName);
    }

    updateQuery += ' WHERE PlayerName = $3';
    queryParams.push(playerName);

    if (oldTeamName) {
        updateQuery += ' AND TeamName = $4';
        queryParams.push(oldTeamName);
    }

    pool.query(
        updateQuery,
        queryParams,
        (error, results) => {
            if (error) {
                throw error;
            }

            response.status(200).send('Player information updated successfully.');
        }
    );
}


module.exports = {
    getUsers,
    updateUsersName,
    getRoster,
    addRoster,
    deleteSpecificRoster,
    deleteEveryRoster,
    getRosterScores,
    updatePlayerScore,
    createPlayer,
    updatePlayer,
    getPlayers,
    getPlayer
}