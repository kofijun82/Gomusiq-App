import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect, useState } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";

const HomePage = () => {
	const {
		fetchFeaturedSongs,
		fetchMadeForYouSongs,
		fetchTrendingSongs,
		isLoading,
		madeForYouSongs,
		featuredSongs,
		trendingSongs,
		fetchSongs
	} = useMusicStore();

	const { initializeQueue } = usePlayerStore();
	const [greeting, setGreeting] = useState("Hi");
	const [currency, setCurrency] = useState("USD");

	useEffect(() => {
		fetchFeaturedSongs();
		fetchMadeForYouSongs();
		fetchTrendingSongs();
		fetchSongs();
	}, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, fetchSongs]);

	useEffect(() => {
		if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
			const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
			initializeQueue(allSongs);
		}
	}, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

	useEffect(() => {
		// Fetch time from the internet
		const fetchTime = async () => {
			try {
				const response = await fetch("https://worldtimeapi.org/api/ip");
				const data = await response.json();
				const hour = new Date(data.datetime).getHours();

				if (hour < 12) {
					setGreeting("Good Morning");
				} else if (hour < 18) {
					setGreeting("Good Afternoon");
				} else {
					setGreeting("Good Evening");
				}
			} catch (error) {
				console.error("Error fetching time:", error);
				// Fallback to local system time if API fails
				const hour = new Date().getHours();
				if (hour < 12) {
					setGreeting("Good Morning");
				} else if (hour < 18) {
					setGreeting("Good Afternoon");
				} else {
					setGreeting("Good Evening");
				}
			}
		};

		fetchTime();
	}, []);

	useEffect(() => {
		// Fetch location-based currency
		const fetchCurrency = async () => {
			try {
				const response = await fetch("https://ipapi.co/currency/");
				const currency = await response.text();
				setCurrency(currency.trim());
			} catch (error) {
				console.error("Error fetching currency:", error);
			}
		};

		fetchCurrency();
	}, []);

	return (
		<main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900'>
			<Topbar />
			<ScrollArea className='h-[calc(100vh-180px)]'>
				<div className='p-4 sm:p-6'>
					<h1 className='text-2xl sm:text-3xl font-bold mb-6'>{greeting}</h1>
					   <FeaturedSection currency={currency} />

					<div className='space-y-8'>
						<SectionGrid title='Made For You' songs={madeForYouSongs} isLoading={isLoading} currency={currency} />
						<SectionGrid title='Trending' songs={trendingSongs} isLoading={isLoading} currency={currency} />
					</div>
				</div>
			</ScrollArea>
		</main>
	);
};
export default HomePage;
