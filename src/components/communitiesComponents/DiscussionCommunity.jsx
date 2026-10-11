import { SendHorizonal } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getDiscussCommunity } from "../../redux/slices/communitySlices";
import DiscussionItem from "../DiscussionItem";

function DiscussionCommunity() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiscussCommunity(id));
  }, [dispatch, id]);

  const { detailCommunity } = useSelector((state) => state.communityState);

  if (!detailCommunity.communityDiscuss) {
    return <div>Loading data community...</div>;
  }

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

      {detailCommunity.communityDiscuss.map((discussion) => (
        <DiscussionItem key={discussion.id} discussion={discussion} />
      ))}
    </div>
  );
}

export default DiscussionCommunity;
