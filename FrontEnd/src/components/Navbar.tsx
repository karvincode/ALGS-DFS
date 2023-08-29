import { useState } from "react"
import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"

export function Navbar() {
    const [LoggedIn, ToggleLoggedIn] = useState(false)
    return (
        <NavbarBs sticky="top" className="bg-light shadow-sm mb-3">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link to="/" as={NavLink} className="">
                        Home
                    </Nav.Link>
                    <Nav.Link to="/roster" as={NavLink}>
                        Roster Selection
                    </Nav.Link>
                    <Nav.Link to="/rules" as={NavLink}>
                        Rules
                    </Nav.Link>
                </Nav>
                {LoggedIn ?
                    <><a className="mx-3 nav-link">Logout</a><Nav.Link to="/profile" as={NavLink}></Nav.Link></>
                    :
                    <a className="mx-3 nav-link">Login</a>
                }
            </Container>

        </NavbarBs>
    )
}
// Set it up to have successful login go to a tab called news where it is literally just the logged in home page.
//Logged in shows Team Selection as well
// unlogged in users should be able to see LeaderBoard Stats(maybe just a link to a the cool apex api)