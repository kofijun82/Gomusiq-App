import { SignedOut, UserButton, SignedIn } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };


  return (
    <div
      className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10'
    >
      <div className='flex gap-2 items-center'>
        <img src='/Gomusiq.png' className='size-8' alt='Gomusiq logo' />
        <strong className='text-2xl font-semibold'>Gomusiq</strong>
      </div>

      <div className='flex items-center gap-4'>
        {/* <input
          type='text'
          placeholder='Search for music...'
          value={searchQuery}
          onChange={handleSearchChange}
          className='px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
        /> */}

        <div className="relative w-full max-w-md">
          <input
            type="text"
            onChange={handleSearch}
            className="px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder='Search for music...'
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <i className="bi bi-search "></i>
          </div>
        </div>

        {isAdmin && (
          <Link to={'/admin'} className={cn(buttonVariants({ variant: 'outline' }))}>
            <LayoutDashboardIcon className='size-4 mr-2' />
            Admin Dashboard
          </Link>
        )}

        <SignedIn>
          <Link to={'/user'} className={cn(buttonVariants({ variant: 'outline' }))}>
            <LayoutDashboardIcon className='size-4 mr-2' />
            Library
          </Link>
        </SignedIn>

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
function setSearchQuery(_value: string) {
  throw new Error("Function not implemented.");
}

