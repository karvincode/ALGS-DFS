const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })    
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/users', db.getUsers) //works
//create user
app.put('/users/:newUsername/:currentUsername', db.updateUsersName) //not doing
app.get('/roster/:username', db.getRoster) //works
app.post('/roster/:username', db.addRoster)  //works
app.delete('/roster/:username', db.deleteSpecificRoster) //works
app.delete('/roster/', db.deleteEveryRoster) //works
app.get('/roster-scores/', db.getRosterScores) //works
//create PlayerScore
app.patch('/playerScore/:playerID/:weekID', db.updatePlayerScore); //works
app.post('/player/', db.createPlayer) //works
//delete Player may be not needed if I can sucessfully sort players by relavence
app.patch('/player/', db.updatePlayer) //works

app.get('/player', db.getPlayers)  //works
app.get('/player/:playername', db.getPlayer) //works 


app.listen(port, ()=> console.log(`App running on port ${port}.`))

