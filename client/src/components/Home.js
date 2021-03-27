import { Button, Container, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = ({ isLoggedIn }) => {
  return (
    <Container>
      <Jumbotron className="mt-5">
        <h3>JWT Authentication using access and refresh tokens</h3>

        <div className="mt-5">
          {!isLoggedIn && (
            <>
              <Button className="mr-2" as={Link} to="/login">
                Login
              </Button>
              <Button
                className="mr-2"
                variant="success"
                as={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          )}
        </div>
      </Jumbotron>
    </Container>
  );
};

export default Home;
