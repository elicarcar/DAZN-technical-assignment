import React from "react";
import { Card, List } from "semantic-ui-react";
import "../App.css";

const MovieCard = ({ movies }) => {
  return (
    <>
      <Card className="movie-detail-card" centered>
        {!movies ? (
          <p>Please Wait</p>
        ) : (
          movies.map((movie, i) =>
            movie.films.map((film) => (
              <Card.Content>
                <Card.Header>{film.title}</Card.Header>
                <Card.Content extra>
                  <Card.Meta>
                    <List>
                      <List.Item>{`Released in ${film.release_date}`}</List.Item>
                      <List.Item>{`Producer ${film.producer}`}</List.Item>
                      <List.Item>{`Released in ${film.release_date}`}</List.Item>
                    </List>
                  </Card.Meta>
                </Card.Content>

                <Card.Description>{film.description}</Card.Description>
              </Card.Content>
            ))
          )
        )}
      </Card>
    </>
  );
};

export default MovieCard;
