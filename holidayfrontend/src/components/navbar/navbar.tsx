import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import flugzeug from "../../images/flugzeug.png";
import "../navbar/navbar.css";
import { useNavigate } from "react-router-dom";

const pages = [
  { name: "family members", route: "/family" },
  { name: "holidays", route: "/holiday" },
  { name: "holiday wishes", route: "/wish" },
  { name: "vote", route: "/vote" },

];


function Navbar() {
  const navigate = useNavigate(); 

  const handleNavigate = (page: string) => {
    navigate(page);
  };

  return (
    <AppBar position="relative" sx={{backgroundColor:'white'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              marginLeft: "-180px",
            }}
          >
            <img className="logo" src={flugzeug} alt="" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page["name"]}
                onClick={() => handleNavigate(page["route"])}
                sx={{
                  my: 2,
                  color: "black",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  display: "block",
                  fontWeight: "bold",
                  fontSize: "16px",
                  margin: "0px 10px 0px 10px",
                  "&:hover": {
                    backgroundColor: "#112C3F",
                    color: "black",
                  }
                }}
              >
                {page["name"]}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
