import { useControls } from '../hooks/state/useControls'
import alert from '../components/assets/alert-circle.svg'
type PlaylistTableProps = {
  songs: {
    url: string
    name: string
    album: string
    duration: number
    artist: string
    year: number
  }[]
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' + secs : secs}`
}
export const PlaylistTable = ({ songs }: PlaylistTableProps) => {
  const { isPlaying, setIsPlaying, setCurrentTrackUrl, currentTrackUrl, error, clearError } = useControls()
  return (
    <div className="bg-gradient-to-b from-purple-900 to-black text-white p-6 rounded-lg w-full max-w-5xl">
      <div className="w-full text-left table-auto mb-6">
        <button
          className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200"
          onClick={() => {
            const audio = document.querySelector('audio') as HTMLAudioElement | null
            if (!audio) return
            if (isPlaying) {
              audio.pause()
            } else {
              audio.play().catch((err) => {
                console.error('Playback error:', err)
              })
            }
          }}
        >
          {isPlaying ? '||' : '▶'}
        </button>
      </div>

      <table className="w-full text-left">
        <thead className="border-b border-gray-600 text-sm text-gray-300">
          <tr>
            <th className="w-10">#</th>
            <th className="w-1/2">Title</th>
            <th>Album</th>
            <th className="text-right">⏱</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-200">
          {songs.map((song, index) => {
            return (
              <tr
                key={song.url}
                className={`border-b border-gray-600 cursor-pointer transition-colors duration-200 ${
                  currentTrackUrl === song.url ? 'bg-gray-800' : 'hover:bg-gray-700'
                }`}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setCurrentTrackUrl(song.url)
                  setIsPlaying(true)
                  clearError()
                }}
              >
                <td className="py-2 pr-1.5">
                  {currentTrackUrl === song.url && error?.url === song.url ? (
                    <img src={alert} alt="" className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </td>

                <td
                  className={`p-2 truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px] ${
                    currentTrackUrl === song.url && error?.url === song.url && 'text-red-400'
                  }`}
                >
                  {currentTrackUrl === song.url && error?.url === song.url ? error.message : song.name}
                </td>
                <td
                  className={`p-2 truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-[100px] ${
                    currentTrackUrl === song.url && error?.url === song.url && 'text-red-400'
                  }`}
                >
                  {song.album}
                </td>
                <td
                  className={`p-4${
                    currentTrackUrl === song.url && error?.url === song.url && 'text-red-400'
                  } text-right`}
                >
                  {formatDuration(song.duration)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
