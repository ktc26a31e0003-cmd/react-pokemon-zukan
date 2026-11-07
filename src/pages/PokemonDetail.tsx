import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { fetchPokemonDetail } from '../api/pokemon'
import PageHeading from '../components/PageHeading'

const statDisplayNames: Record<string, string> = {
  hp: 'HP',
  attack: 'こうげき',
  defense: 'ぼうぎょ',
  'special-attack': 'とくこう',
  'special-defense': 'とくぼう',
  speed: 'すばやさ',
}

export default function PokemonDetail() {
  const { id } = useParams()
  const pokemonId = Number(id)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemon', 'detail', pokemonId],
    queryFn: () => fetchPokemonDetail(pokemonId),
    enabled: Number.isFinite(pokemonId),
  })

  if (!Number.isFinite(pokemonId)) {
    return (
      <main className="page-wrapper">
        <PageHeading title="ポケモン詳細" />
        <p className="page-status">不正なポケモンIDです。</p>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="page-wrapper">
        <PageHeading title="ポケモン詳細" />
        <p className="page-status">読み込み中...</p>
      </main>
    )
  }

  if (isError || !data) {
    return (
      <main className="page-wrapper">
        <PageHeading title="ポケモン詳細" />
        <p className="page-status">ポケモンの詳細が見つかりませんでした。</p>
      </main>
    )
  }

  return (
    <main className="page-wrapper">
      <Link to="/" className="detail-backlink">
        ← 一覧へ戻る
      </Link>

      <section className="detail-layout">
        <div className="detail-image-panel">
          <img src={data.imageUrl} alt={data.name} className="detail-image" />
        </div>

        <div className="detail-info">
          <PageHeading title={data.name} />

          <div className="type-badges">
            {data.types.map((type) => (
              <span key={type} className="type-badge">
                {type}
              </span>
            ))}
          </div>

          <div className="meta-grid">
            <div>
              <span className="meta-label">高さ</span>
              <strong>{data.height / 10} m</strong>
            </div>
            <div>
              <span className="meta-label">重さ</span>
              <strong>{data.weight / 10} kg</strong>
            </div>
          </div>

          <div className="stat-list">
            {data.stats.map((stat) => (
              <div key={stat.name} className="stat-row">
                <span>{statDisplayNames[stat.name] ?? stat.name}</span>
                <div className="stat-bar-track">
                  <div className="stat-bar-fill" style={{ width: `${Math.min(stat.value, 100)}%` }} />
                </div>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
