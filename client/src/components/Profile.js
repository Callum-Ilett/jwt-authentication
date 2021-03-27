import React from "react";
import { Container, Jumbotron } from "react-bootstrap";

const Profile = ({ user }) => {
  return (
    <Container>
      <Jumbotron>
        <h3>Your Profile</h3>
      </Jumbotron>

      <div>
        <p>
          <b>ID: </b>
          {user?._id}
        </p>
        <p>
          <b>Full Name: </b>
          {user?.fullName}
        </p>
        <p>
          <b>email: </b>
          {user?.email}
        </p>
      </div>
    </Container>
  );
};

export default Profile;
