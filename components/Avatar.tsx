import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
 UserCircleIcon
} from "@heroicons/react/24/solid";
function Avatar({image} : string) {

  //console.log(image , 'avatar')
  const defaultImage = "https://avatars.dicebear.com/api/open-peeps/placeholder.svg";
  return (
    <div className="relative h-10 w-10 rounded-full border-gray-300 bg-white ">
      <UserCircleIcon
        className="rounded-full"
       
      />


 {image  &&
      <Image
      //    objectFit='contain'
      className="rounded-full"
      layout="fill"
      src={ image}
      alt={image}
    />
      }

     
    </div>
  );
}

export default Avatar;
