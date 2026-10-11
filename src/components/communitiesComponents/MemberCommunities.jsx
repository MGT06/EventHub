import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getMembersCommunity } from "../../redux/slices/communitySlices";

function MemberCommunities() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembersCommunity(id));
  }, [dispatch, id]);

  const { detailCommunity } = useSelector((state) => state.communityState);

  if (!detailCommunity.communityMembers) {
    return <div>Loading data community...</div>;
  }
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-5">
        {detailCommunity.communityMembers.map((member) => {
          return (
            <div
              key={member.id}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3"
            >
              {member.avatar_url ? (
                <img
                  src={member.avatar_url}
                  alt={member.name}
                  className="h-9 w-9 rounded-full object-cover shrink-0"
                />
              ) : (
                <div
                  className="hidden lg:flex items-center justify-center rounded-full h-8 w-8 cursor-pointer bg-orange text-white capitalize"
                >
                  {member.name.charAt(0)}
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">
                  {member.name}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {member.position}
                </p>
              </div>
            </div>
          );
        })}

        <button className="lg:col-span-3 rounded-xl border border-gray-200 bg-gray-50 py-3 text-sm text-gray-400 hover:bg-gray-100">
          +841 more members
        </button>
      </div>
    </>
  );
}

export default MemberCommunities;
