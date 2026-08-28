import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";

function EventAdmin() {
  const { dataEvent } = useSelector((state) => state.eventState);
  return (
    <div className="mt-3 grid gap-4">
      {dataEvent.map((ele) => {
        return (
          <div key={ele.id} className="grid grid-cols-[auto_2fr_auto_auto] items-center py-3 px-4 rounded-xl border border-gray-300">
            <img src={ele.coverImage} alt="" className="w-12 h-12 rounded-lg mr-2" />
            <div>
              <p className="font-medium text-sm">{ele.title}</p>
              <p className="text-xs text-manatee">{ele.date} · {ele.location}</p>
            </div>
            <span className="bg-green-500/20 py-0.5 px-2 rounded-full mr-4 text-xs text-center capitalize">{ele.status === "open" ? "Active" : ele.status}</span>
            <MoreHorizontal className="self-center"/>
          </div>
        );
      })}
    </div>
  );
}

export default EventAdmin;
