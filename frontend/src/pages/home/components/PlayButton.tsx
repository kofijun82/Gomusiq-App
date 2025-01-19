import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play} from "lucide-react";
import { useState } from "react";
import PurchaseModal from './PurchaseModal';



const PlayButton = ({ song }: { song: Song }) => {
	const { currentSong, isPlaying, setCurrentSong, togglePlay, isPopupVisible, hidePurchasePopup, handlePurchase, songToPurchase } = usePlayerStore();
	const isCurrentSong = currentSong?._id === song._id;
	const [playTime, setPlayTime] = useState(0);
	

	const handlePlay = () => {
		if (isCurrentSong) {
			// If the song is already playing, we need to check the play time
			if (playTime < 20) {
				togglePlay(); // Toggle play/pause
			}
		} else {
			// If a new song is selected
			setCurrentSong(song);
			setPlayTime(0); // Reset play time when a new song is played
		}
	};


	return (
		<div>
		<Button
			size={"icon"}
			onClick={handlePlay}
			className={`absolute bottom-3 right-2 bg-orange-500 hover:bg-orange-400 hover:scale-105 transition-all 
				opacity-0 translate-y-2 group-hover:translate-y-0 ${
					isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
				}`}
		>
			{isCurrentSong && isPlaying ? (
				<Pause className='size-5 text-black' />
			) : (
				<Play className='size-5 text-black' />
			)}
		</Button>

 <PurchaseModal 
        isOpen={isPopupVisible} 
        onClose={hidePurchasePopup} 
        songTitle={songToPurchase?.title || ''} 
        onPurchase={handlePurchase} 
      />
    </div>
	);
};
export default PlayButton;
