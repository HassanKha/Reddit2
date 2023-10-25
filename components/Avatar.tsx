import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

function Avatar() {
  const { data: session } = useSession();
  return (
    <div className="relative h-10 w-10 rounded-full border-gray-300 bg-white ">
      <Image
        //    objectFit='contain'
        className="rounded-full"
        layout="fill"
        src={!session ? `https://avatars.dicebear.com/api/open-peeps/placeholder.svg` : session?.user?.image}
        alt={session?.user?.image || 'https://avatars.dicebear.com/api/open-peeps/placeholder.svg'}
      />
     
    </div>
  );
}

export default Avatar;
