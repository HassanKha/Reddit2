import { gql, useQuery } from "@apollo/client";

export const ADD_POST = gql`
  mutation MyMutation(
    $body: String!
    $image: String!
    $subreddit_id: ID!
    $title: String!
    $username: String
    $postprofile: String!

  ) {
    insertPost(
      body: $body
      subreddit_id: $subreddit_id
      title: $title
      username: $username
      image: $image
      postprofile: $postprofile
    ) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      postprofile
    }
  }
`;

export const ADD_SUBREDDIT = gql`
  mutation MyMutation($topic: String! , $subredditprofile: String!) {
    insertSubreddit(topic: $topic , subredditprofile: $subredditprofile) {
      id
      topic
      created_at
      subredditprofile
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation MyMutation($username: String!, $post_id: ID!, $text: String! , $commentprofile: String!) {
    insertComment(username: $username, post_id: $post_id, text: $text, commentprofile: $commentprofile) {
      created_at
      id
      post_id
      text
      username
      commentprofile
    }
  }
`;

export const ADD_VOTE = gql`
  mutation MyMutation($username: String, $post_id: ID, $upvote: Boolean) {
    insertVote(username: $username, post_id: $post_id, upvote: $upvote) {
      created_at
      id
      post_id
      upvote
      username
    }
  }
`;
