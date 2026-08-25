import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";

function CommunityAdmin() {
  const { dataCommunity } = useSelector((state) => state.communityState);
  return (
    <div className="mt-3 grid gap-4">
      {dataCommunity.map((ele) => {
        return (
          <div className="grid grid-cols-[auto_2fr_auto_auto] items-center py-3 px-4 rounded-xl border border-gray-300">
            <img src={ele.image} alt="" className="w-12 h-12 rounded-lg mr-2" />
            <div>
              <p className="font-medium text-sm">{ele.name}</p>
              <p className="text-xs text-manatee">
                {ele.members.length} Members · {ele.upcomingEvents} upcoming events
              </p>
            </div>
            <span className="bg-green-500/20 py-0.5 px-2 rounded-full mr-4 text-xs text-center capitalize">
              Active
            </span>
            <MoreHorizontal className="self-center" />
          </div>
        );
      })}
    </div>
  );
}

export default CommunityAdmin;
