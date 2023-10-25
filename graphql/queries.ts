import { gql, useQuery } from "@apollo/client";

export const SubredditListByTopic = gql`
  query Myquery($topic: String!) {
    subredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

export const GetAllPosts = gql`
  query Myquery {
    postList {
      body
      comments {
        created_at
        id
        post_id
        text
        username
      }
      created_at
      id
      image
      subreddit {
        created_at
        id
        topic
      }
      subreddit_id
      title
      username
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }
`;

export const GetpostsbyTopic = gql`
 query Myquery($topic: String!) {
  postListbysubredditTopic(topic: $topic) {
      body
      comments {
        created_at
        id
        post_id
        text
        username
      }
      created_at
      id
      image
      subreddit {
        created_at
        id
        topic
      }
      subreddit_id
      title
      username
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
    }
  }

`
export const GetpostByID = gql`
 query Myquery($id: ID!) {
  getpostByID(id: $id) {
    body
    created_at
    id
    image
    subreddit_id
    title
    username
    comments {
      created_at
      id
      post_id
      text
      username
    }
    subreddit {
      created_at
      id
      topic
    }
    votes {
      created_at
      id
      post_id
      upvote
      username
    }
    }
  }

`

export const VoteListByPostID = gql`
 query Myquery($post_id: ID!) {
  voteListByPostID(post_id: $post_id) {
    created_at
    id
    upvote
    username
    post_id
    }
  }

`

export const SubredditPaginatedList = gql`
 query Myquery($first: Int!) {
  subredditPaginatedList(first: $first) {
    created_at
      id
      topic
    }
  }

`