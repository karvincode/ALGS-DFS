import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Roster,  } from './pages/Roster'
import { Rules } from './pages/Rules'
// import { RosterProvider } from './context/RosterContext'

//create an entity relationship diagram

//ToDo: List
//Move roster over to the left table
//create an entity relationship diagram
// get last three week scores average it and divide it by a cost so that every player has the same cost per expected point than round it to the nearest .5
//Scorebucket system where certain percentiles are set to scores.
// Maybe add a placeholder for cards so the user can better see the amount of total players that may be rostered.
//add a login function
//learn how to add data to a dynamodb at set intervals where it just extracts info from liquipedia api
//add a leaderboard of top scores from users leaderboard for each week
//add a rules page
// change the website theme
//external api 
// Lamda function that runs daily that finds out if matches occured and than gets data
// Lamda function looks historical scores of a players and runs if any sort of match data changes.
//add a description of what a matchday,users,teams just defien everything is and additional info for people unaware. (Maybe a FAQ)
// add a functionality that tracks your weekly scores probably in the profile maybe in a psudeo friends list prob overkill.



//Possible DB actions
//UI adds and removes player from user TeamSheet
// Get list of users and their matchday scores
// adds player kills and placement
// get lists of players, their costs, kills, and placements (scores) 




function App() {

  return (
    <>
    {/* <RosterProvider> */}
    <Navbar />
    <Container className="mb-4 mw-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </Container>
    {/* </RosterProvider> */}
    </>
  )
}

export default App
