import { MoreHorizontal, Search } from "lucide-react";

function UsersAdmin() {
  return (
    <>
      <div className="flex py-2.5 px-3 gap-2 my-4 rounded-lg bg-gray-100">
        <Search className="text-manatee" />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full min-w-0 outline-none"
        />
      </div>
      <div className="grid gap-3 rounded-xl border border-gray-300">
        <div className="grid grid-cols-[150px_auto_auto] px-4 py-2 border-b border-b-gray-300">
          <p className="font-semibold text-manatee text-sm">USER</p>
          <p className="font-semibold text-manatee text-sm text-right place-self-center">
            STATUS
          </p>
        </div>
        <div className="grid grid-cols-[150px_auto_auto] px-4 py-2 ">
          <div>
            <p className="font-medium text-sm">Alex Kim</p>
            <p className="text-xs text-manatee">alex.kim@example.com</p>
          </div>
          <div className="self-center place-self-center">
            <span className="bg-green-400/20 rounded-full text-green-500 h-max py-1  px-2.5 text-xs font-medium flex items-center">
              Active
            </span>
          </div>
          <div className="self-center place-self-end">
            <MoreHorizontal />
          </div>
        </div>
        <div className="grid grid-cols-[150px_auto_auto] px-4 py-2">
          <div>
            <p className="font-medium text-sm">Hendra Wijaya</p>
            <p className="text-xs text-manatee">hendra@example.com</p>
          </div>
          <div className="self-center place-self-center">
            <span className="bg-red-400/20 rounded-full text-red-500 h-max py-1  px-2.5 text-xs font-medium flex items-center">
              Suspended
            </span>
          </div>
          <div className="self-center place-self-end">
            <MoreHorizontal />
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersAdmin;
