import {
  Calendar,
  Bell,
  BellOff,
  Users,
  MessageSquare,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useSelector } from "react-redux";
import timeAgo from "../utils/time";

const typeConfig = {
  event_reminder: {
    icon: Bell,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  event_updated: {
    icon: Calendar,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  discussion_reply: {
    icon: MessageSquare,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
  },
  registration: {
    icon: CheckCircle2,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  community: {
    icon: Users,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
};

function Notification() {
  const { notification } = useSelector((state) => state.loggedUserState);

  const unreadCount = notification.filter((n) => n.read_at === null).length;

  return (
    <div className="min-h-screen bg-white px-6 py-8 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 grid lg:grid-cols-4 items-start justify-between gap-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                Notifications
              </h1>
              {unreadCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-xs font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Stay up to date with your events and communities.
            </p>
          </div>

          <button
            disabled={unreadCount === 0}
            className="flex items-center w-max gap-1.5 rounded-lg lg:col-start-4 border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4" />
            Mark all as read
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200">
          {notification.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 px-5 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <BellOff className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  No notifications yet
                </p>
                <p className="mt-0.5 text-sm text-gray-500">
                  Notifications about your events and communities will appear
                  here.
                </p>
              </div>
            </div>
          ) : (
            notification.map((n, idx) => {
              const config = typeConfig[n.type];
              const IconComponent = config?.icon;

              return (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 px-5 py-4 ${
                    idx !== notification.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  } ${n.read_at === null ? "bg-orange-50/60" : "bg-white"}`}
                >
                  {IconComponent ? (
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${config.iconBg}`}
                    >
                      <IconComponent
                        className={`h-4.5 w-4.5 ${config.iconColor}`}
                        strokeWidth={2}
                      />
                    </div>
                  ) : (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      ?
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {n.title}
                    </p>
                    <p className="mt-0.5 text-sm text-gray-500">{n.message}</p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-1.5 pl-2">
                    <span className="text-xs text-gray-400">
                      {timeAgo(n.created_at)}
                    </span>
                    {n.read_at === null && (
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;
