import React from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import { useSession } from "next-auth/react";

import  Link from 'next/link';
interface Props {
  topic: string;
  index: number;
  subredditprofile: string
}

function SubredditRow({ index, topic , subredditprofile }: Props) {



  return (
    <div className=" last:rounded-b flex items-center space-x-2 border-t bg-white px-4 py-2">
      <p>{index + 1}</p>
      <ChevronUpIcon className="h-4 w-4 text-green-400 flex-shrink-0" />
      <Link href={`/subreddit/${topic}`}><Avatar image={subredditprofile}  /> </Link>
      <p className='flex-1 truncate'>r/{topic}</p>
      <Link href={`/subreddit/${topic}`}>
      <div className='cursor-pointer rounded-full bg-blue-500 px-3 text-white '>
        View
      </div>
      </Link>
    </div>
  );
}

export default SubredditRow;
