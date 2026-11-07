import { Link } from 'react-router-dom'
import type { PokemonSummary } from '../api/pokemon'

type PokemonCardProps = {
  pokemon: PokemonSummary
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card">
      <img src={pokemon.imageUrl} alt={pokemon.name} className="pokemon-card-image" />
      <span className="pokemon-card-name">{pokemon.name}</span>
    </Link>
  )
}
