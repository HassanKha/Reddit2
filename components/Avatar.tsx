import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
 UserCircleIcon
} from "@heroicons/react/24/solid";
function Avatar() {
  const { data: session } = useSession();
  return (
    <div className="relative h-10 w-10 rounded-full border-gray-300 bg-white ">
      <UserCircleIcon
        //    objectFit='contain'
        className="rounded-full"
        layout="fill"
        src={ session?.user?.image}
        alt={ session?.user?.image}
      />

      {session && 
      <Image
      //    objectFit='contain'
      className="rounded-full"
      layout="fill"
      src={ session?.user?.image}
      alt={session?.user?.image}
    />
      }
     
    </div>
  );
}

export default Avatar;
