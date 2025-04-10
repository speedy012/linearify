export type Track = {
  name: string
  url: string
  duration: number
}

export type Playlist = {
  name: string
  artist: string
  year: number
  tracks: Track[]
}

export type PlaylistsData = {
  playlists: Playlist[]
}
