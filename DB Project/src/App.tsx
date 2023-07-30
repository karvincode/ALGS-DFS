import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Team } from './pages/Team'
import { Rules } from './pages/Rules'
// import { RosterProvider } from './context/RosterContext'

//Possible ways to calculate player cost supply vs demand where if people pick a player his price will increase vs decrease this seems dumb though since I want the submit button to just be a timer.
// get last three week scores average it and divide it by a cost so that every player has the same cost per expected point than round it to the nearest .5
// Maybe add a placeholder for cards so the user can better see the amount of total players that may be rostered.
//add a login function
//connect code to a dynamodb for player and user db.
//learn how to add data to a dynamodb at set intervals where it just extracts info from liquipedia api
//add a leaderboard of top scores from users leaderboard for each week
//add a rules page
// change the website theme
//Function that tracks removal and addition of players to player Teamsheet\
//external api 
// Lamda function that runs daily that finds out if matches occured and than gets data
// Lamda function looks historical scores of a players and runs if any sort of match data changes.


//Possible DB actions
//UI adds and removes player from user TeamSheet
//UI requests user matchday scoring ranked
//adds player kills and placement
// get lists of players, their costs, kills, and placements 
//get scores for players 
//mat



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <RosterProvider> */}
    <Navbar />
    <Container className="mb-4 mw-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </Container>
    {/* </RosterProvider> */}
    </>
  )
}

export default App
