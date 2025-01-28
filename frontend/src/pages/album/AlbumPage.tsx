import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const formatDuration = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

type AlbumPageProps = {
	currency: string;
};

const AlbumPage = ({ currency }: AlbumPageProps) => {
	const { albumId } = useParams();
	const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
	const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
	  setIsOpen(!isOpen);
	};

	useEffect(() => {
		if (albumId) fetchAlbumById(albumId);
	}, [fetchAlbumById, albumId]);

	if (isLoading) return null;

	const handlePlayAlbum = () => {
		if (!currentAlbum) return;

		const isCurrentAlbumPlaying = currentAlbum?.songs.some((song) => song._id === currentSong?._id);
		if (isCurrentAlbumPlaying) togglePlay();
		else {
			// start playing the album from the beginning
			playAlbum(currentAlbum?.songs, 0);
		}
	};

	const handlePlaySong = (index: number) => {
		if (!currentAlbum) return;

		playAlbum(currentAlbum?.songs, index);
	};

	return (
		<div className='h-full'>
			<ScrollArea className='h-full rounded-md'>
				{/* Main Content */}
				<div className='relative min-h-full'>
					{/* bg gradient */}
					<div
						className='absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
						 to-zinc-900 pointer-events-none'
						aria-hidden='true'
					/>

					{/* Content */}
					<div className='relative z-10'>
						{/* <div className='flex p-6 gap-6 pb-8'>
							<img
								src={currentAlbum?.imageUrl}
								alt={currentAlbum?.title}
								className='w-[240px] h-[240px] shadow-xl rounded'
							/>
							<div className='flex flex-col justify-end'>
								<p className='text-sm font-medium'>Album</p>
								<h1 className='text-7xl font-bold my-4'>{currentAlbum?.title}</h1>
								<div className='flex items-center gap-2 text-sm text-zinc-100'>
									<span className='font-medium text-white'>{currentAlbum?.artist}</span>
									<span>• {currentAlbum?.songs.length} songs</span>
									<span>• {currentAlbum?.releaseYear}</span>
								</div>
							</div>
						</div> */}

						<div className="flex flex-col sm:flex-row p-6 gap-6 pb-8">
							{/* Album Image */}
							<div className="relative w-[180px] sm:w-[240px] h-[180px] sm:h-[240px] shadow-xl rounded">
								<img
									src={currentAlbum?.imageUrl}
									alt={currentAlbum?.title}
									className="w-full h-full object-cover rounded"
								/>

								  {/* Play Button */}
								<div className="absolute bottom-1 right-1">
									<Button
									onClick={handlePlayAlbum}
									size="icon"
									className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 
										hover:scale-105 transition-all"
									>
									{isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? (
										<Pause className="h-7 w-7 text-black" />
									) : (
										<Play className="h-7 w-7 text-black" />
									)}
									</Button>
								</div>

							</div>

							{/* Album Details */}
							<div className="flex flex-col justify-end sm:text-left">
								<p className="text-sm font-medium">Album</p>
								<h1 className="text-3xl sm:text-7xl font-bold my-4">{currentAlbum?.title}</h1>
								<div className="flex flex-col sm:flex-row sm:items-start gap-2 text-sm text-zinc-100">
									<span className="font-medium text-white">{currentAlbum?.artist}</span>
									<span className="hidden sm:inline">•</span> {/* Hidden in mobile */}
									<span>{currentAlbum?.songs.length} songs</span>
									<span className="hidden sm:inline">•</span> {/* Hidden in mobile */}
									<span>{currentAlbum?.releaseYear}</span>
								</div>
							</div>
						</div>

						{/* play button */}
						<div className='px-6 pb-4 flex items-center gap-6'>
							<Button
								onClick={handlePlayAlbum}
								size='icon'
								className='w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all'
							>
								{isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? (
									<Pause className='h-7 w-7 text-black' />
								) : (
									<Play className='h-7 w-7 text-black' />
								)}
							</Button>


							<div className="relative inline-block text-left">
      {/* Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 
          hover:scale-105 transition-all focus:outline-none"
        aria-expanded={isOpen}
      >
        <i className="bi bi-plus-circle text-white text-2xl"></i>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-zinc-900 border border-zinc-800 z-50"
        >
          <ul className="py-2 text-sm text-zinc-200">
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                Add to Playlist
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                Add to Favorites
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                Share
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
						</div>




						{/* Table Section */}
						<div className="bg-black/20 backdrop-blur-sm p-4 rounded-md">
						{/* Scrollable Container */}
						<div className="overflow-x-auto">
							<table className="table-auto w-full text-sm text-zinc-400">
							{/* Table Header */}
							<thead>
								<tr className="bg-black/30 text-white">
								<th className="px-6 py-2 text-left w-[32px]">#</th>
								<th className="px-6 py-2 text-left">Title</th>
								<th className="px-6 py-2 text-center">
									<Clock className="h-4 w-4 inline-block" />
								</th>
								<th className="px-6 py-2 text-right">Price</th>
								</tr>
							</thead>

							{/* Table Body */}
							<tbody>
								{currentAlbum?.songs.map((song, index) => {
								const isCurrentSong = currentSong?._id === song._id;
								return (
									<tr
									key={song._id}
									onClick={() => handlePlaySong(index)}
									className="cursor-pointer hover:bg-white/5 group"
									>
									{/* Row Index */}
									<td className="px-6 py-2 text-center whitespace-nowrap">
										{isCurrentSong && isPlaying ? (
										<div className="text-green-500">♫</div>
										) : (
										<span className="group-hover:hidden">{index + 1}</span>
										)}
										{!isCurrentSong && (
										<Play className="h-4 w-4 hidden group-hover:inline-block" />
										)}
									</td>

									{/* Song Title and Artist */}
									<td className="px-6 py-2 flex items-center gap-4 whitespace-nowrap">
										<img
										src={song.imageUrl}
										alt={song.title}
										className="w-10 h-10 rounded-md"
										/>
										<div>
										<div className="font-medium text-white">{song.title}</div>
										<div>{song.artist}</div>
										</div>
									</td>

									{/* Song Duration */}
									<td className="px-6 py-2 text-center whitespace-nowrap">
										{formatDuration(song.duration)}
									</td>

									{/* Song Price */}
									<td className="px-6 py-2 text-right whitespace-nowrap">
										<Button className="bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-indigo-600">
										&#8373; 1.99
										</Button>
									</td>
									</tr>
								);
								})}
							</tbody>
							</table>
						</div>
						</div>
					</div>
				</div>
			</ScrollArea>
		</div>
	);
};
export default AlbumPage;