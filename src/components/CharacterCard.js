import React from "react";
import { Card, List } from "semantic-ui-react";
import "../App.css";

const CharacterCard = ({ ghibliCharacters, handleMovieClick }) => {
  return ghibliCharacters.map((char) => (
    <Card className="char-detail-card" key={char.id} centered>
      <Card.Content>
        <Card.Header>{char.name}</Card.Header>
        <Card.Meta textAlign="left">
          <List>
            <List.Item>{`Gender: ${char.gender}`}</List.Item>
            <List.Item>{`Age: ${char.age}`}</List.Item>
            <List.Item>{`Eye color: ${char.eye_color}`}</List.Item>
            <List.Item>{`Hair color: ${char.hair_color}`}</List.Item>
          </List>
        </Card.Meta>
        <Card.Meta textAlign="left">
          <List>
            <List.Header>Movies</List.Header>
            {char.films.map((film) => (
              <List.Item key={film.id} onClick={handleMovieClick}>
                <a>{film.title}</a>
              </List.Item>
            ))}
          </List>
        </Card.Meta>
      </Card.Content>
    </Card>
  ));
};

export default CharacterCard;
