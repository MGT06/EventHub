import { X } from "lucide-react";
import { Link } from "react-router";

function Modal({isClose}) {  
  return (
    <div className={`fixed inset-0 bg-[#00000030] flex justify-center items-center z-50`}>
      <div className="bg-white rounded-2xl lg:w-2/7">
        <div className="p-6 flex justify-between border-b border-b-gray-200">
          <p className="font-semibold ">Sign in to continue</p>
          <X className="cursor-pointer" onClick={isClose}/>
        </div>
        <div className="py-8 px-6 grid justify-center ">
          <div className="w-7 h-7"></div>
          <p className="text-sm text-manatee">
            Create a free account to register for events, save favourites, join
            communities, and get personalised recommendations.
          </p>
        </div>
        <div className="flex gap-3 justify-end pb-6 px-6">
          <button className="py-2 px-4 bg-gray-200 text-sm font-medium rounded-lg" onClick={isClose}>Keep browsing</button>
          <button className="py-2 px-4 bg-orange text-white text-sm font-medium rounded-lg"><Link to={"/auth/login"}>Sign In</Link></button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
