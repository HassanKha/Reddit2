import React from "react";
import { useRouter } from "next/router";
import { GetpostByID } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import Post from "../../components/Post";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../graphql/mutations";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import toast from "react-hot-toast";
import Avatar from "../../components/Avatar";
import TimeAgo from "react-timeago";




type FormData = {
  comment: string;


};

function PostPage() {
  const router = useRouter();
  loadDevMessages();
  loadErrorMessages();
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GetpostByID, "getpostByID"],
  });

  const { data: session } = useSession();

  const { data, loading } = useQuery(GetpostByID, {
    variables: {
      id: router?.query?.postId,
    },
  });

  const post: Post = data?.getpostByID[0];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit ( async (data) => {
    const notification = toast.loading("Creating new Comment...");

    const { data: insertComment } = await addComment({
      variables: {
        post_id: router?.query?.postId,
        text: data.comment,
        username: session?.user?.name,
        commentprofile: session?.user?.image,
      },
    });

    setValue("comment", "");
    toast.success("New Comment Created!!!", {
      id: notification,
    });
  });

  //console.log(post);
  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post key={post?.id} post={post} Loading={loading} />
      <div className=" pl-16 -mt-1 rounded-b-md border p-5 border-t-0 border-gray-300 bg-white">
        <p className="text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>
        <form
          onSubmit={onSubmit}
          className="flex max-w-5xl space-y-2 flex-col "
        >
          <textarea
            {...register("comment")}
            disabled={!session}
            placeholder={
              session ? "what are your thoughts ? " : "Sign in to comment"
            }
            className="h-24 rounded-md border border-gray-200 outline-none p-2 pl-4 disabled:bg-gray-50  "
          />
          <button
          disabled={!session}
            type="submit"
            className="rounded-full bg-red-500 p-3 font-semibold text-white disabled:bg-gray-200"
          >
            Comment
          </button>
        </form>
      </div>
      <div className="-my-5 rounded-b-md border-t-0 border-gray-300 bg-white py-5 px-10">
        <hr className="py-2" />
        {post?.comments.map((comment) => (
          <div className="relative flex items-center space-x-2 space-y-5" key={comment?.id}>
            <hr className='absolute z-0 top-10 h-16 border left-7' />
            <div className='z-50' >
              <Avatar image={comment.commentprofile}  />
            </div>
            <div className='flex flex-col'>
              <p className='py-2 text-xs text-gray-400'>
                <span className='font-semibold text-gray-600' >{comment?.username}</span>{" "}
                <TimeAgo date={comment?.created_at} />
              </p>
              <p>{comment?.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostPage;
