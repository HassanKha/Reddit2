import React, { useState, useEffect } from "react";

import { GetAllPosts, GetpostsbyTopic } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import Post from "./Post";

type Props = {
  topic?: string;
};

export default function Feed({ topic }: Props) {
  console.log(topic, 'feed');
  const { data, error , loading } = topic
    ? useQuery(GetpostsbyTopic, {
        variables: {
          topic: topic,
        },
      })
    : useQuery(GetAllPosts);
  const postList = topic ? data?.postListbysubredditTopic : data?.postList;

  return (
    <div className="mt-5 space-y-4">
      {postList?.map((post : Post) => (
        <Post key={post.id} post={post} Loading={loading}  />
      ))}
    </div>
  );
}
