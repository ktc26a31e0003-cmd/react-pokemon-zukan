import { useQuery } from '@tanstack/react-query'
import { fetchPokemonList } from '../api/pokemon'
import PageHeading from '../components/PageHeading'
import PokemonCard from '../components/PokemonCard'

export default function PokemonList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: fetchPokemonList,
  })

  if (isLoading) {
    return (
      <main className="page-wrapper">
        <PageHeading title="ポケモン一覧" />
        <p className="page-status">読み込み中...</p>
      </main>
    )
  }

  if (isError || !data) {
    return (
      <main className="page-wrapper">
        <PageHeading title="ポケモン一覧" />
        <p className="page-status">ポケモンの取得に失敗しました。</p>
      </main>
    )
  }

  return (
    <main className="page-wrapper">
      <PageHeading title="ポケモン一覧" />
      <div className="pokemon-grid">
        {data.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </main>
  )
}
