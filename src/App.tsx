import data from './data/playlists.json'
import { PlaylistTable } from './components/PlaylistTable'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { useControls } from './hooks/state/useControls'
import { useRef } from 'react'

export const App = () => {
  const { setIsPlaying, currentTrackUrl, setCurrentTrackUrl, setError } = useControls()
  const audioRef = useRef<AudioPlayer>(null)
  const tracks = data.playlists.flatMap((playlist) =>
    playlist.tracks.map((track) => ({
      url: track.url,
      name: track.name,
      album: playlist.name,
      duration: track.duration,
      artist: playlist['artist:'],
      year: playlist.year,
    })),
  )

  const handleTrackChange = (direction: 'next' | 'prev') => {
    const currentIndex = tracks.findIndex((track) => track.url === currentTrackUrl)
    const newIndex =
      direction === 'next' ? (currentIndex + 1) % tracks.length : (currentIndex - 1 + tracks.length) % tracks.length

    const audio = document.querySelector('audio') as HTMLAudioElement | null
    if (audio) audio.pause()

    setTimeout(() => {
      setCurrentTrackUrl(tracks[newIndex].url)
    }, 100)
  }

  return (
    <div className="text-2xl flex flex-col items-center justify-center bg-black">
      <h1 className="text-3xl text-white font-bold py-6">Linearify</h1>

      <PlaylistTable songs={tracks} />

      <AudioPlayer
        key={currentTrackUrl}
        src={currentTrackUrl ?? tracks[0].url}
        ref={audioRef}
        onEnded={() => handleTrackChange('prev')}
        onClickNext={() => handleTrackChange('next')}
        onClickPrevious={() => handleTrackChange('prev')}
        showSkipControls={true}
        onPlay={() => {
          if (!currentTrackUrl) {
            setCurrentTrackUrl(tracks[0].url)
          }
          setIsPlaying(true)
        }}
        onPause={() => setIsPlaying(false)}
        autoPlay={true}
        onError={(e) => {
          if (currentTrackUrl && e) {
            setError(currentTrackUrl, 'Playback error')
          }
        }}
      />
    </div>
  )
}
