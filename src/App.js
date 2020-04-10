import React, { useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";
import Movies from "./components/Movies";
import Characters from "./components/Characters";
import axios from "axios";
import "./App.css";

function App() {
  const [studioGhibli, setStudioGhibli] = useState([]);
  const [activeItem, setActiveItem] = useState({});
  const [onMovieSection, setOnMovieSection] = useState(true);

  async function getStudioGhibliFilms() {
    try {
      const response = await axios.get("https://ghibliapi.herokuapp.com/films");
      response.data.map((d) =>
        Promise.all(
          d.species.map((s) => fetch(s).then((res) => res.json()))
        ).then((responses) => (d.species = responses))
      );
      setStudioGhibli(response.data);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getStudioGhibliFilms();
    return () => {
      getStudioGhibliFilms();
    };
  }, []);

  function handleItemClick(e, { name }) {
    setActiveItem(name);
    setOnMovieSection(!onMovieSection);
  }

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
