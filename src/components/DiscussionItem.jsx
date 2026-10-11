import timeAgo from "../utils/time";

function DiscussionItem({ discussion, depth = 0 }) {
  const { author, replies } = discussion;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <img
          src={author.avatar_url}
          alt={author.name}
          className={`rounded-full object-cover shrink-0 ${
            depth === 0 ? "h-9 w-9" : "h-7 w-7"
          }`}
        />
        <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 grow">
          <div className="min-w-0">
            <p className="text-sm text-gray-900">
              <span className="font-medium">{author.name}</span>{" "}
              <span className="text-xs text-gray-400">
                {timeAgo(discussion.created_at)}
              </span>
            </p>
            <p className="mt-1 text-sm text-gray-600 wrap-break-word">
              {discussion.message}
            </p>
          </div>
        </div>
      </div>

      {replies?.length > 0 && (
        <div
          className={`flex flex-col gap-3 ${
            depth < 3 ? "ml-4 border-l-2 border-gray-100 pl-4 sm:ml-8" : ""
          }`}
        >
          {replies.map((reply) => (
            <DiscussionItem
              key={reply.id}
              discussion={reply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DiscussionItem;
