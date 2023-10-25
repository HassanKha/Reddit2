import Head from "next/head";
import Header from "./../components/Header";
import PostBox from "./../components/PostBox";
import Feed from "./../components/Feed";
import { Toaster } from "react-hot-toast";
import { SubredditPaginatedList } from "../graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
import SubredditRow from "./../components/SubredditRow";

export default function Home() {
  const { data, error } = useQuery(SubredditPaginatedList, {
    variables: {
      first: 10,
    },
  });

  const subreddits: Subreddit[] = data?.subredditPaginatedList;
  //console.log(data, error);
  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Toaster />
      <Head>
        <title>Reddit</title>
      </Head>
      <PostBox />
      <div className="flex">
        <Feed />
        <div className="rounded-md border border-gray-300 sticky top-36 mx-5 hidden bg-white lg:inline h-fit min-w-[300px]">
          <p className="text-md mb-1 p-4 pb-3 font-bold">Top Communities</p>
          <div>
            {subreddits?.map((subreddit, i) => (
              <SubredditRow key={subreddit.id} index={i} topic={subreddit.topic} subredditprofile={subreddit.subredditprofile} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
