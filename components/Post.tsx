import React, { useState , useEffect } from "react";
import Avatar from "./Avatar";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatBubbleLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import TimeAgo from "react-timeago";
import { Jelly } from "@uiball/loaders";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useQuery } from "@apollo/client";
import { VoteListByPostID } from "./../graphql/queries";
import { useMutation } from "@apollo/client";
import { ADD_VOTE } from "../graphql/mutations";

interface Props {
  post: Post;
  loading: boolean;
}

function Post({ post, Loading }: Props) {
  if (Loading)
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#FF4501" />
      </div>
    );
  const { data: session } = useSession();
  const [vote, setVote] = useState<boolean>();
  const { data, loading } = useQuery(VoteListByPostID, {
    variables: {
      post_id: post?.id,
    },
  });
  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [VoteListByPostID, "voteListByPostID"],
  });

  const upVote = async (isUpvote: boolean) => {
    if (!session) {
      toast("You'll need to sign in to Vote!");
      return;
    }

    if(vote && isUpvote) return ;
    if(vote === false && !isUpvote) return;

    await addVote({
      variables: {
        post_id:post.id,
        upvote: isUpvote,
        username: session?.user?.name
      }
    })
  };

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.voteListByPostID
    const displayNumber = votes?.reduce(
      (total,vote) => (vote.upvote ? (total+=1): (total -=1)),0)
    
      if(votes?.length === 0 ) return 0;
      if(displayNumber === 0 ) {
        return votes[0]?.upvote ? 1 : -1
      }
      return displayNumber;
  }

  useEffect(()=> {
    const votes: Vote[] = data?.voteListByPostID

    const vote = votes?.find(vote => vote.username == session?.user.name)?.upvote

    setVote(vote)
  }, [data])

  return (
    <Link href={`/post/${post?.id}`}>
      <div className="rounded-md hover:border hover:border-gray-600 flex shadow-sm cursor-pointer border bg-white border-gray-300">
        {/* Votes */}
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon
            onClick={() => upVote(true)}
            className={`voteButtons hover:text-red-400 ${vote && 'text-blue-400'}`}
          />
          <p className="text-xs font-bold text-black">{displayVotes(data)}</p>
          <ArrowDownIcon
            onClick={() => upVote(false)}
            className={`voteButtons hover:text-blue-400 ${vote === false && 'text-red-400'}`}
          />
        </div>
        <div className="p-3 pb-1">
          {/* Header  */}
          <div className="flex items-center space-x-2">
            <Avatar />
            <p className="text-sm text-gray-400">
              <Link
                href={`subreddit/${post?.subreddit[0]?.topic}`}
                className="font-bold text-black hover:text-blue-400 hover:underline"
              >
                r/{post?.subreddit[0]?.topic}
              </Link>{" "}
              * Posted by u/
              {post?.username}{" "}
              <span>
                <TimeAgo date={post?.created_at} />
              </span>
            </p>
          </div>
          {/* Body  */}
          <div className="py-4">
            <h2 className="text-xl font-semibold ">{post?.title}</h2>
            <p className="mt-2 text-sm font-light">{post?.body}</p>
          </div>
          {/* image */}
          <img className="w-full" src={post?.image} alt={post?.image} />
          {/* Footer */}
          <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />
              <p className="">{post?.comments?.length} Comments </p>
            </div>

            <div className="postButtons">
              <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">
                {post?.comments?.length} Award{" "}
              </p>
            </div>

            <div className="postButtons">
              <div className="h-6 w-6" />
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">
                {post?.comments?.length} Share{" "}
              </p>
            </div>

            <div className="postButtons">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">{post?.comments?.length} Save </p>
            </div>

            <div className="postButtons">
              <EllipsisHorizontalIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
