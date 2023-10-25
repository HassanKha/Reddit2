import React from "react";
import Image from "next/image";
import RedditIcon from "../images/RedditIcon.png";
import {
  HomeIcon,
  ChevronDownIcon,
  BeakerIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftEllipsisIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  BellIcon,
  GlobeAltIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import  Link  from 'next/link';
function Header() {
  const { data: session } = useSession();
  return (
    <div className="items-center sticky z-50 top-0 flex bg-white px-4 py-2 shadow-sm">
      <div className="relative h-10 w-10 flex-shrink-0 cursor-pointer">
        <Link href='/'>
        <Image src={RedditIcon} layout="fill" alt={RedditIcon} />
        </Link>
      </div>
      <div className="flex items-center mx-7 xl:min-w-[300px] ">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden lg:inline flex-1">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* Search Box */}

      <form className="px-3 py-1 flex flex-1 bg-gray-100 items-center space-x-2 border-gray-200 rounded-sm ">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
        <input
          type="text"
          className="flex-1 bg-transparent outline-none"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden />
      </form>

      <div className="mx-5 hidden lg:inline-flex  items-center space-x-2 text-gray-500">
        <SparklesIcon className="icon" />
        <GlobeAltIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatBubbleLeftEllipsisIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerWaveIcon className="icon" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <Bars3Icon className="icon" />
      </div>
      {/* SignIn & Signout BTM */}

      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden cursor-pointer items-center space-x-2 border p-2 border-gray-100 lg:flex"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              layout="fill"
              alt="redditicon"
              // objectFit='contain'
            />
          </div>
          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400">Sign Out</p>
          </div>
          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden cursor-pointer items-center space-x-2 border p-2 border-gray-100 lg:flex"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              layout="fill"
              alt="redditicon"
              // objectFit='contain'
            />
          </div>
          <p className="text-gray-400">Sign In</p>
        </div>
      )}
    </div>
  );
}

export default Header;
