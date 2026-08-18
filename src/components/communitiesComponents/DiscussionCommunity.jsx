import { SendHorizonal } from "lucide-react";
import dummy from "../../data/dummy.json";
import { useOutletContext } from "react-router";

function DiscussionCommunity() {
  const { nameCommunity } = useOutletContext();
  const dataCommunity = dummy.communities.find(
    (data) => data.name == nameCommunity,
  );

  return (
    <div className="flex flex-col gap-3 mt-5">
      <div className="flex gap-3">
        <img
          src="https://i.pravatar.cc/100?img=5"
          alt="You"
          className="h-8 w-8 rounded-full"
        />
        <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 grow">
          <input
            type="text"
            placeholder="Start a discussion..."
            className="min-w-0 flex-1 border-none text-sm text-gray-700 placeholder:text-gray-400 outline-none"
          />
          <SendHorizonal className="text-orange" />
        </div>
      </div>

      {dataCommunity?.discussions.map((discussion, idx) => (
        <div key={idx} className="flex gap-3">
          <img
            src={discussion.author.avatar}
            alt={discussion.author.name}
            className="h-9 w-9 rounded-full object-cover shrink-0"
          />
          <div
            key={discussion.id}
            className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 grow"
          >
            <div className="min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{discussion.author.name}</span>{" "}
                <span className="text-xs text-gray-400">
                  {discussion.timeAgo}
                </span>
              </p>
              <p className="mt-1 text-sm text-gray-600">{discussion.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DiscussionCommunity;
