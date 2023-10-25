import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

function Avatar() {
  const { data: session } = useSession();
  const defaultImage = "https://avatars.dicebear.com/api/open-peeps/placeholder.svg";
  return (
    <div className="relative h-10 w-10 rounded-full border-gray-300 bg-white ">
      <Image
        //    objectFit='contain'
        className="rounded-full"
        layout="fill"
        src={!session ? defaultImage : session?.user?.image.toString()}
        alt={session?.user?.image.toString() || defaultImage}
      />
     
    </div>
  );
}

export default Avatar;
