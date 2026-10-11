import { MoreHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommunities } from "../../redux/slices/adminSlice";

function CommunityAdmin() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCommunities());
  }, [dispatch]);

  const { dataDashboard } = useSelector((state) => state.adminState);

  if (!dataDashboard.communities) {
    return <div>Loading data admin...</div>;
  }
  return (
    <div className="mt-3 grid gap-4">
      {dataDashboard.communities.map((ele) => {
        return (
          <div className="grid grid-cols-[auto_2fr_auto_auto] items-center py-3 px-4 rounded-xl border border-gray-300">
            <img src={ele.image_url} alt="" className="w-12 h-12 rounded-lg mr-2" />
            <div>
              <p className="font-medium text-sm">{ele.community_name}</p>
              <p className="text-xs text-manatee">
                {ele.total_members} Members · {ele.upcoming_events} upcoming
                events
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
