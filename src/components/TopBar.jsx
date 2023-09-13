import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

const TopBar = () => {
  const location = useLocation();
  return (
    <header>
      <Navbar expand="lg" className="mb-4">
        <Container fluid className="ps-md-5">
          <Navbar.Brand href="index.html">
            <img src="assets/imgs/netflix_logo.png" alt="Bootstrap" width="80" />
          </Navbar.Brand>

          <Navbar.Collapse id="right-navbar-nav">
            <Nav>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="tv-shows">
                Tv Shows
              </NavLink>
              <NavLink className="nav-link" to="movies">
                Movies
              </NavLink>
              <NavLink className="nav-link" to="recent">
                Recently Added
              </NavLink>
              <NavLink className="nav-link" to="my-list">
                My List
              </NavLink>
            </Nav>
          </Navbar.Collapse>

          <Nav className="ms-auto me-2 d-flex flex-row flex-nowrap align-items-center  ">
            <NavLink className="nav-link" to="search">
              {location.pathname.includes("tv-shows") ? "Search TV Series " : ""}
              <i className="bi bi-search ms-2 me-4 me-lg-0"></i>
            </NavLink>
            <NavLink className="nav-link d-none d-sm-block me-4 me-lg-0 fs-7 fw-bold" to="kids">
              KIDS
            </NavLink>
            <NavLink>
              <i className="nav-link bi bi-bell-fill me-4 me-lg-0 "></i>
            </NavLink>

            <NavDropdown
              direction="start"
              href="index.html"
              aria-expanded="false"
              title={<img src="assets/imgs/avatar.png" alt="" width="32px" />}>
              <NavDropdown.Item>
                <NavLink className="nav-link" to="profile">
                  Edit profile
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink className="nav-link" to="settings">
                  Settings
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Something else here</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Navbar.Toggle
            variant="secondary"
            aria-controls="right-navbar-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          />
        </Container>
      </Navbar>
    </header>
  );
};
export default TopBar;
