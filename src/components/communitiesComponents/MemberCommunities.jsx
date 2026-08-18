import dummy from "../../data/dummy.json";
import { useOutletContext } from "react-router";

function MemberCommunities() {
  const { nameCommunity } = useOutletContext();
  const dataCommunity = dummy.communities.find(
    (data) => data.name == nameCommunity,
  );
  console.log(dataCommunity)
  console.log(dataCommunity.memberList)
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-5">
        {dataCommunity.memberList.map((member) => {
          return (<div key={member.id} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
            <img
              src={member.avatar}
              alt={member.name}
              className="h-9 w-9 rounded-full object-cover shrink-0"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-900">
                {member.name}
              </p>
              <p className="truncate text-xs text-gray-500">{member.role}</p>
            </div>
          </div>)
        })}

        <button className="lg:col-span-3 rounded-xl border border-gray-200 bg-gray-50 py-3 text-sm text-gray-400 hover:bg-gray-100">
          +841 more members
        </button>
      </div>
    </>
  );
}

export default MemberCommunities;
