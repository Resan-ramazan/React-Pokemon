import './App.css';
import { useState } from 'react';
import typeColors from './TypeColors.json';

const Pokedex = require("pokeapi-js-wrapper")
const P = new Pokedex.Pokedex()

function NoPokemonView() {
  return (
    <div>
      <h1>
        Please press the button to get a random pokemon ✌
      </h1>
    </div>
  )
}
function PokemonStat({ statValue, statName }) {

  let icon;

  switch (statName) {
    case "hp":
      icon = "💚"
      break;
    case "attack":
      icon = "⚔"
      break;
    case "defense":
      icon = "🛡"
      break;
    case "special-attack":
      icon = "💥"
      break;
    case "special-defense":
      icon = "💫"
      break;
    case "speed":
      icon = "🎿"
      break;

    default:
      break;
  }

  return (
    <div className='stat' style={{
      // backgroundColor:backgroundColor
    }}>
      {icon}
      <br></br>
      {statValue}
    </div>
  )
}

function PokemonType({ typeName }) {
  return (
    <span

      style={{
        color: typeColors[typeName],
        fontWeight: 800
      }}
      className="mx-2"
    >
      {typeName.toUpperCase()}
    </span>
  )
}


function PokemonCard({ pokemon }) {

  return (
    <div>
      <img src={pokemon.sprites.other.dream_world.front_default} className="pokemonImg"></img>
      <h1 className='name'>{pokemon.name.toUpperCase()}</h1>
      <h4 className='mt-2'>
        {pokemon.types.map(function (type) {
          return <PokemonType key={type.type.name} typeName={type.type.name}></PokemonType>
        })}
      </h4>
      <div className="row mt-3">
        {pokemon.stats.map(stat => {
          return <div className='col-2'><PokemonStat statName={stat.stat.name} statValue={stat.base_stat}></PokemonStat></div>
        })}
        {/* <div className="col-4">
          <PokemonStat statName='HP' statValue={pokemon.stats[0].base_stat}></PokemonStat>
        </div>
        <div className="col-4">
          <PokemonStat statName='ATK' statValue={pokemon.stats[1].base_stat}></PokemonStat>
        </div>
        <div className="col-4">
          <PokemonStat statName='DEF' statValue={pokemon.stats[2].base_stat}></PokemonStat>
        </div> */}
      </div>


    </div>
  )

}

function App() {

  const [pokemon, setPokemon] = useState(null);

  const buttonHandler = () => {
    const random = Math.floor(Math.random() * 150);
    P.getPokemonByName(random)
      .then(pokemonData => {
        console.log(pokemonData)
        setPokemon(pokemonData);
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          pokemon ? <PokemonCard pokemon={pokemon} /> : <NoPokemonView />
        }
        <button className='btn btn-dark mt-2' onClick={buttonHandler}>Random</button>
      </header>
    </div>
  );
}

export default App;
