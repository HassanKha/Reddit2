interface Comment {
    created_at:string
  id: number 
  post_id: number
  text: string
  username: string
  commentprofile: string
}


interface Subreddit {
    created_at: string
  id: number 
  topic: string
  subredditprofile: string
}


interface Vote {
    created_at: string
    id: number
    post_id: number
    upvote: boolean
    username: string
  }
  

  interface Post {

    body: string
    created_at: string
    id: number
    image: string
    subreddit_id: number
    title: string
    username: string
    votes : Vote[]
    comments: Comment[]
    subreddit : Subreddit[]
    postprofile: string
}