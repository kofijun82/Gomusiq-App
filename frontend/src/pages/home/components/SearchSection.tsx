import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import PlayButton from "./PlayButton";

interface SearchSectionProps {
	currency: string;
}

const SearchSection = ({ currency }: SearchSectionProps) => {
	const { isLoading, filteredSongs, error, songs, searchQuery } = useMusicStore();

	if (isLoading) return <FeaturedGridSkeleton />;

	if (error) return <p className='text-red-500 mb-4 text-lg'>{error}</p>;

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
			{filteredSongs.map((song) => (
				<div
					key={song._id}
					className='flex items-center bg-zinc-800/50 rounded-md overflow-hidden
         hover:bg-zinc-700/50 transition-colors group cursor-pointer relative'
				>
					<img
						src={song.imageUrl}
						alt={song.title}
						className='w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0'
					/> 
					<div className='flex-1 p-4'>
						<p className='font-medium truncate'>{song.title}</p>
						<p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
						{/* <p className='text-sm text-zinc-300'>Price: {currency} 1.99</p> */}
						<button className='mt-2 bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-indigo-600 transition'>
							Buy &#8373; 1.99
						</button>
					</div>
					<PlayButton song={song} />
				</div>
			))}
		</div>
	);
};

export default SearchSection;
