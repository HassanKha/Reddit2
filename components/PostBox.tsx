import React, { useState , useEffect } from "react";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import { LinkIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { useForm, SubmitHandler } from "react-hook-form";
import { ADD_POST } from "./../graphql/mutations";
import { ADD_SUBREDDIT } from "../graphql/mutations";
import createApolloClient from "../apollo-client";
import { SubredditListByTopic , GetAllPosts } from "./../graphql/queries";
import { useQuery , useMutation} from "@apollo/client";
import toast from "react-hot-toast";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

interface Props {
  subreddit?: string
};

function PostBox({subreddit} : Props) {

  const { data: session } = useSession();
  const [profile,setprofile]=useState('')
  const client = createApolloClient();
   const [addPost] = useMutation(ADD_POST , {
    refetchQueries: [
      GetAllPosts,
      'postList'
    ]
   })
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

useEffect(()=>{

  if(session){
    console.log('here')
    setprofile(session.user.image)
  }
},[session])

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading("Creating new post...");
 //const profile = session?.user?.image;
 console.log(profile)
    try {
      const {
        data: { subredditListByTopic },
      } = await client.query({
        query: SubredditListByTopic,
        variables: {
          topic: subreddit || formData.subreddit,
        
        },
      });

      const SubExist = subredditListByTopic?.length > 0;

      const image = formData.postImage || "";
      console.log(subredditListByTopic , 'is found')

      if (!SubExist) {
        const {
          data: { insertSubreddit },
        } = await client.mutate({
          mutation: ADD_SUBREDDIT,
          variables: {
            topic: subreddit || formData.subreddit,
            subredditprofile: profile
          },
        });

console.log(insertSubreddit , 'insert topic')



        const data = await addPost({
          // mutation: ADD_POST,
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id:  insertSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
            postprofile: profile,
          }
        }).then((res)=> res);

        console.log(data , 'insert post')

      } else {
        const data = await addPost({
          // mutation: ADD_POST,
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: subredditListByTopic?.[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
            postprofile: profile,
          },
        });
      }
      //console.log(data , 'insert topic')
      setValue("postTitle", "");
      setValue("postBody", "");
      setValue("postImage", "");
      setValue("subreddit", "");
      toast.success("New Post Created!!!", {
        id: notification,
      });
    } catch (error) {
      console.log(error)
      toast.error("Whoops something went wrong", {
        id: notification,
      });
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="sticky p-1 top-16 rounded-md border border-gray-300 z-50 bg-white"
    >
      <div className="flex items-center space-x-3">
        <Avatar image = {session?.user?.image} />
        <input
          {...register("postTitle", { required: true })}
          className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
          type="text"
          disabled={!session}
 
          placeholder={
            session ? subreddit ? `Create a Post in r/${subreddit}` : "Create a post by entering a title!" : "Sign in to post"
          }
        />
        <PhotoIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 cursor-pointer text-gray-300 ${
            imageBoxOpen && "text-blue-300"
          }`}
        />
        <LinkIcon className={`h-6 text-gray-300`} />
      </div>

      {watch("postTitle") && (
        <div className="flex flex-col py-2">
          {/* BODY */}
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register("postBody")}
              type="text"
              placeholder="Text (optional)"
            />
          </div>
          {
            !subreddit && (
              <div className="flex items-center px-2">
              <p className="min-w-[90px]">SubReddit:</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register("subreddit", { required: true })}
                type="text"
                placeholder="i.e. ReactJS"
              />
            </div>
            )
          }
          {/* <div className="flex items-center px-2">
            <p className="min-w-[90px]">SubReddit:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register("subreddit", { required: true })}
              type="text"
              placeholder="i.e. ReactJS"
            />
          </div> */}

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register("postImage")}
                type="text"
                placeholder="Optional"
              />
            </div>
          )}

          {/* ERRORS */}

          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === "required" && (
                <p>A Post Title is Required</p>
              )}
              {errors.subreddit?.type === "required" && (
                <p>A SubReddit is Required</p>
              )}
            </div>
          )}

          {watch("postTitle") && (
            <button
              type="submit"
              className="w-full bg-blue-400 p-2 text-white rounded-full"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
}

export default PostBox;
