import React, { useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";
import Movies from "./components/Movies";
import Characters from "./components/Characters";
import axios from "axios";
import "./App.css";

function App() {
  const [studioGhibli, setStudioGhibli] = useState([]);
  const [ghibliCharacters, setGhibliCharacters] = useState([]);
  const [activeItem, setActiveItem] = useState({});
  const [onMovieSection, setOnMovieSection] = useState(true);
  const [expanded, setExpanded] = useState(false);
  let spe = [];

  async function getStudioGhibliFilms() {
    try {
      const response = await axios.get("https://ghibliapi.herokuapp.com/films");
      console.log(response);
      setStudioGhibli(response.data);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }

  async function fetchCharacters() {
    try {
      const chars = await fetch(
        "https://ghibliapi.herokuapp.com/people"
      ).then((res) => res.json());

      const species = chars.map((char) => char.species);

      Promise.all(
        species.map((s) => fetch(s).then((res) => res.json()))
      ).then((responses) => console.log(responses));
      console.log("charRes", chars);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getStudioGhibliFilms();
    fetchCharacters();
  }, []);

  function handleItemClick(e, { name }) {
    setActiveItem(name);
    setOnMovieSection(!onMovieSection);
  }
  // function handleClick(id) {
  //   console.log(id);
  // }
  return (
    <div className="App">
      <Menu size="huge">
        <Menu.Item
          name="movies"
          active={activeItem === "editorials"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="characters"
          active={activeItem === "characters"}
          onClick={handleItemClick}
        />
      </Menu>
      {onMovieSection ? <Movies movies={studioGhibli} /> : <Characters />}
    </div>
  );
}

export default App;
