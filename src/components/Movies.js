import React from "react";
import { Card } from "semantic-ui-react";

const Movies = ({ movies }) => {
  return (
    <>
      <Card.Group itemsPerRow="3">
        {!movies.length ? (
          <p>Please Wait</p>
        ) : (
          movies.map((movie) => (
            <Card key={movie.id}>
              <Card.Content>
                <Card.Header>{movie.title}</Card.Header>
                <Card.Meta>
                  <span className="date">{`Released in ${movie.release_date}`}</span>
                </Card.Meta>
                <Card.Description>{movie.description}</Card.Description>
              </Card.Content>
            </Card>
          ))
        )}
      </Card.Group>
    </>
  );
};

export default Movies;
