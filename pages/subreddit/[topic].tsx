import React from "react";
import { useRouter } from "next/router";
import Avatar from "./../../components/Avatar";
import PostBox from './../../components/PostBox';
import Feed from "../../components/Feed"

import { useSession } from 'next-auth/react';
function Subreddit() {
  const {
    query: { topic },
  } = useRouter();
console.log(useRouter())
const { data: session }  = useSession()
  return (
    <div className={`h-24 bg-red-400 p-8`}>
      <div className="-mx-8 mt-10 bg-white">
        <div className="mx-auto flex max-w-5xl space-x-4 pb-3 items-center ">
          <div className="-mt-5 ml-2">
            <Avatar image={session?.user?.image} />
          </div>

          <div>
            <h1 className="text-3xl font-semibold">
              Welcome to the r/{topic} subreddit
            </h1>
            <p className="text-sm text-gray-400">r/{topic}</p>
          </div>
        </div>
      </div>

<div className='mx-auto max-w-5xl mt-5 pb-10'>
    <PostBox subreddit={topic as string} />
    <Feed topic={topic as string} />
</div>

    </div>
  );
}

export default Subreddit;
