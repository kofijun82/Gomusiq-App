import { create } from "zustand";
import { Song } from "@/types";
import { useChatStore } from "./useChatStore";

interface PlayerStore {
	currentSong: Song | null;
	isPlaying: boolean;
	queue: Song[];
	currentIndex: number;
	playbackTimer: NodeJS.Timeout | null;
	isPopupVisible: boolean; // State for popup visibility
	songToPurchase: Song | null; // Store the song to purchase
	playbackPosition:number;
	

	initializeQueue: (songs: Song[]) => void;
	playAlbum: (songs: Song[], startIndex?: number) => void;
	setCurrentSong: (song: Song | null) => void;
	togglePlay: () => void;
	playNext: () => void;
	playPrevious: () => void;
	stopPlayback: () => void;
	showPurchasePopup: (song: Song) => void; // Method to show the purchase popup
  	hidePurchasePopup: () => void; // Method to hide the purchase popup
  	handlePurchase: () => void; // Method to handle the purchase action
	setPlaybackPosition: (position: number) => void;
	
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
	currentSong: null,
	isPlaying: false,
	queue: [],
	currentIndex: -1,
	playbackTimer: null,
	isPopupVisible: false,
    isInterfaceDisabled: false,
	songToPurchase: null,
	playbackPosition: 0,
	setPlaybackPosition: (position: number) => set({ playbackPosition: position }),
	
	initializeQueue: (songs: Song[]) => {
		set({
			queue: songs,
			currentSong: get().currentSong || songs[0],
			currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
		});
	},

	playAlbum: (songs: Song[], startIndex = 0) => {
		if (songs.length === 0) return;

		// Clear any existing playback timer
		const { playbackTimer } = get();
		if (playbackTimer) {
		  clearTimeout(playbackTimer);
		}

		const song = songs[startIndex];

		const socket = useChatStore.getState().socket;
		if (socket.auth) {
			socket.emit("update_activity", {
				userId: socket.auth.userId,
				activity: `Playing ${song.title} by ${song.artist}`,
			});
		}
		set({
			queue: songs,
			currentSong: song,
			currentIndex: startIndex,
			isPlaying: true,
		});
	},

	setCurrentSong: (song: Song | null) => {
		if (!song) return;

		const socket = useChatStore.getState().socket;
		if (socket.auth) {
			socket.emit("update_activity", {
				userId: socket.auth.userId,
				activity: `Playing ${song.title} by ${song.artist}`,
			});
		}

		const songIndex = get().queue.findIndex((s) => s._id === song._id);
		set({
			currentSong: song,
			isPlaying: true,
			currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
		});

		if (get().isPlaying)
		{
		const timer = setTimeout(() => {
			get().stopPlayback(); // Stop playback after 20 seconds
			get().showPurchasePopup(song); // Show the purchase popup after 20 seconds
		  }, 20000); // 20 seconds
	  
		  		set({ playbackTimer: timer });
			}	
		},

	togglePlay: () => {
		const willStartPlaying = !get().isPlaying;

    if (willStartPlaying) {
      // Start a timer to show the popup after 20 seconds
      const timer = setTimeout(() => {
        const currentSong = get().currentSong;
		const { playbackTimer } = get();
		if (playbackTimer) {
		  clearTimeout(playbackTimer);
		}
        if (currentSong) {
			get().stopPlayback(); // Stop playback after 20 seconds
          	get().showPurchasePopup(currentSong); // Show the purchase popup
        }
      }, 20000); // 20 seconds

      set({ playbackTimer: timer });
    }		

		const currentSong = get().currentSong;
		const socket = useChatStore.getState().socket;
		if (socket.auth) {
			socket.emit("update_activity", {
				userId: socket.auth.userId,
				activity:
					willStartPlaying && currentSong ? `Playing ${currentSong.title} by ${currentSong.artist}` : "Idle",
			});
		}

		set({
			isPlaying: willStartPlaying,
		});
	},

	stopPlayback: () => {
		const { playbackTimer } = get();
		if (playbackTimer) {
			clearTimeout(playbackTimer); // Clear the timer
		}
		set({ isPlaying: false, playbackTimer: null }); // Stop playback and reset the timer
	},

	playNext: () => {
		const { currentIndex, queue } = get();
		const nextIndex = currentIndex + 1;


		// if there is a next song to play, let's play it
		if (nextIndex < queue.length) {
			const nextSong = queue[nextIndex];

			const socket = useChatStore.getState().socket;
			if (socket.auth) {
				socket.emit("update_activity", {
					userId: socket.auth.userId,
					activity: `Playing ${nextSong.title} by ${nextSong.artist}`,
				});
			}

			set({
				currentSong: nextSong,
				currentIndex: nextIndex,
				isPlaying: true,
			});

			const timer = setTimeout(() => {
				get().stopPlayback(); 
				get().showPurchasePopup(nextSong); 
			}, 20000); // 20 seconds

			set({ playbackTimer: timer });
		} else {
			// no next song
			set({ isPlaying: false });

			const socket = useChatStore.getState().socket;
			if (socket.auth) {
				socket.emit("update_activity", {
					userId: socket.auth.userId,
					activity: `Idle`,
				});
			}
		}
	},
	playPrevious: () => {
		const { currentIndex, queue} = get();
		const prevIndex = currentIndex - 1;

	

		// theres a prev song
		if (prevIndex >= 0) {
			const prevSong = queue[prevIndex];

			const socket = useChatStore.getState().socket;
			if (socket.auth) {
				socket.emit("update_activity", {
					userId: socket.auth.userId,
					activity: `Playing ${prevSong.title} by ${prevSong.artist}`,
				});
			}

			set({
				currentSong: prevSong,
				currentIndex: prevIndex,
				isPlaying: true,
			});

			const timer = setTimeout(() => {
				get().stopPlayback(); 
				get().showPurchasePopup(prevSong);
			}, 20000); // 20 seconds

			set({ playbackTimer: timer });
		} else {
			// no prev song
			set({ isPlaying: false });

			const socket = useChatStore.getState().socket;
			if (socket.auth) {
				socket.emit("update_activity", {
					userId: socket.auth.userId,
					activity: `Idle`,
				});
			}
		}
	},

	showPurchasePopup: (song: Song) => {
		set({ isPopupVisible: true, songToPurchase: song });
	  },
	
	  hidePurchasePopup: () => {
		const { playbackTimer } = get();
		if (playbackTimer) {
			clearTimeout(playbackTimer); // Clear the timer to prevent any further actions
		}
		set({ 
			isPopupVisible: false, 
			songToPurchase: null, 
			playbackPosition: 0, // Reset playback position to the beginning
			playbackTimer: null, // Clear the playback timer
		});
    },
	
	  handlePurchase: () => {
		const song = get().songToPurchase;
		if (song) {
		  console.log(`Purchasing song: ${song.title}`);
		  get().hidePurchasePopup(); // Hide the popup after purchase
		}
	  },

}));
