export type PokemonSummary = {
  id: number
  name: string
  url: string
  imageUrl: string
}

export type PokemonDetail = {
  id: number
  name: string
  imageUrl: string
  types: string[]
  height: number
  weight: number
  stats: Array<{
    name: string
    value: number
  }>
}

type PokemonListResponse = {
  results: Array<{
    name: string
    url: string
  }>
}

type PokemonDetailResponse = {
  id: number
  name: string
  sprites: {
    front_default: string | null
  }
  types: Array<{
    type: {
      name: string
    }
  }>
  height: number
  weight: number
  stats: Array<{
    stat: {
      name: string
    }
    base_stat: number
  }>
}

const formatPokemonName = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1)

export async function fetchPokemonList(): Promise<PokemonSummary[]> {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')

  if (!res.ok) {
    throw new Error('ポケモン一覧の取得に失敗しました')
  }

  const data = (await res.json()) as PokemonListResponse

  return data.results.map((pokemon) => {
    const match = pokemon.url.match(/\/pokemon\/(\d+)\/?$/)
    const id = match ? Number(match[1]) : 0

    return {
      id,
      name: formatPokemonName(pokemon.name),
      url: pokemon.url,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    }
  })
}

export async function fetchPokemonDetail(id: number): Promise<PokemonDetail> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

  if (!res.ok) {
    throw new Error('ポケモン詳細の取得に失敗しました')
  }

  const data = (await res.json()) as PokemonDetailResponse

  return {
    id: data.id,
    name: formatPokemonName(data.name),
    imageUrl: data.sprites.front_default ?? '',
    types: data.types.map((item) => formatPokemonName(item.type.name)),
    height: data.height,
    weight: data.weight,
    stats: data.stats.map((entry) => ({
      name: entry.stat.name,
      value: entry.base_stat,
    })),
  }
}
