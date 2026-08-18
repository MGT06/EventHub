import {
  Calendar,
  Bell,
  Users,
  Radio,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import dummy from "../data/dummy.json";

const iconMap = {
  Calendar: Calendar,
  Bell: Bell,
  Users: Users,
  Radio: Radio,
  MessageSquare: MessageSquare,
};

function Notification() {
  return (
    <div className="min-h-screen bg-white px-6 py-8 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 grid lg:grid-cols-4 items-start justify-between gap-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                Notifications
              </h1>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-medium text-white">
                {dummy.notification.filter((data) => data.unread === true).length}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Stay up to date with your events and communities.
            </p>
          </div>

          <button className="flex items-center w-max gap-1.5 rounded-lg lg:col-start-4 border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Sparkles className="h-4 w-4" />
            Mark all as read
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200">
          {dummy.notification.map((n, idx) => {
            const IconComponent = iconMap[n.icon];

            return (
              <div
                key={n.id}
                className={`flex items-start gap-3 px-5 py-4 ${
                  idx !== dummy.notification.length - 1
                    ? "border-b border-gray-100"
                    : ""
                } ${n.unread ? "bg-orange-50/60" : "bg-white"}`}
              >
                {IconComponent ? (
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${n.iconBg}`}
                  >
                    <IconComponent
                      className={`h-4.5 w-4.5 ${n.iconColor}`}
                      strokeWidth={2}
                    />
                  </div>
                ) : (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    ?
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">{n.title}</p>
                  <p className="mt-0.5 text-sm text-gray-500">{n.description}</p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1.5 pl-2">
                  <span className="text-xs text-gray-400">{n.time}</span>
                  {n.unread && (
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Notification;