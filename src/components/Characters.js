import React, { useEffect, useState } from "react";
import { Search, Card, List, Button, Grid } from "semantic-ui-react";
import CharacterCard from "./CharacterCard";
import MovieCard from "./MovieCard";
import "../App.css";

const Characters = () => {
  const [ghibliCharacters, setGhibliCharacters] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showMovieDetails, setShowMovieDetails] = useState(false);

  async function fetchCharacters() {
    try {
      const chars = await fetch(
        "https://ghibliapi.herokuapp.com/people"
      ).then((res) => res.json());

      const species = chars.map((char) => char.species);
      Promise.all(species.map((s) => fetch(s).then((res) => res.json()))).then(
        (responses) =>
          chars.map((char, i) => {
            char.species = responses[i];
          })
      );

      chars.map((char) => {
        return Promise.all(
          char.films.map((film) => fetch(film).then((res) => res.json()))
        ).then((responses) => {
          char.films = responses;
        });
      });

      setGhibliCharacters(chars);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleButtonClick = (value) => {
    setShowMovieDetails(false);
    const isMatch = ghibliCharacters.filter(
      (char) => char.name.toLowerCase() === value.toLowerCase()
    );
    if (isMatch) {
      setResults(isMatch);
      setShowResults(true);
    }
  };

  const handleMovieClick = () => {
    setShowMovieDetails(true);
  };

  return (
    <>
      <div>
        <input
          className="char-input"
          onChange={(e) => handleSearchChange(e)}
          value={searchValue}
          placeholder="Type a character name"
        />

        <Button size="large" onClick={() => handleButtonClick(searchValue)}>
          Search
        </Button>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            {results ? (
              <Grid.Column>
                <CharacterCard
                  ghibliCharacters={results}
                  handleMovieClick={handleMovieClick}
                />
              </Grid.Column>
            ) : (
              <p>No results found</p>
            )}
            {showMovieDetails ? (
              <Grid.Column>
                <MovieCard movies={results} />
              </Grid.Column>
            ) : (
              ""
            )}
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
};

export default Characters;
