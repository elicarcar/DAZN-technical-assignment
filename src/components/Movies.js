import React from "react";
import { Card, Accordion, List, Container } from "semantic-ui-react";
import "../App.css";

const Movies = ({ movies }) => {
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const handleTitleClick = (e, props) => {
    const { index } = props;
    console.log(props);
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };
  return (
    <Container className="movie-container">
      <Card.Group itemsPerRow="3">
        {!movies.length ? (
          <p>Please Wait</p>
        ) : (
          movies.map((movie, i) => (
            <Card key={movie.id}>
              <Card.Content>
                <Card.Content extra>
                  <Accordion>
                    <Accordion.Title
                      onClick={(e, props) => handleTitleClick(e, props)}
                      active={activeIndex === i}
                      index={i}
                    >
                      {movie.title}
                    </Accordion.Title>
                    <Card.Meta>
                      <span className="date">{`Released in ${movie.release_date}`}</span>
                    </Card.Meta>
                    <Accordion.Content active={activeIndex === i}>
                      <List
                        floated="left"
                        animated
                        style={{
                          color: "black",
                          textAlign: "left",
                          margin: "20px",
                        }}
                      >
                        {movie.species.map((specie) => (
                          <>
                            <List.Item>{`Name: ${specie.name}`}</List.Item>
                            <List.Item>{`Classification: ${specie.classification}`}</List.Item>
                          </>
                        ))}
                      </List>
                    </Accordion.Content>
                  </Accordion>
                </Card.Content>

                <Card.Description>{movie.description}</Card.Description>
              </Card.Content>
            </Card>
          ))
        )}
      </Card.Group>
    </Container>
  );
};

export default Movies;
