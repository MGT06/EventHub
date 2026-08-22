import {
  Calendar,
  ChartNoAxesColumn,
  Eye,
  PencilLine,
  Plus,
  TrendingUp,
  UserRound,
} from "lucide-react";
import dummy from "../../data/dummy.json";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Link } from "react-router";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);


const labels = ["Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const values = [21, 38, 34, 56, 29, 48];

const dataChart = {
  labels,
  datasets: [
    {
      data: values,
      backgroundColor: "#FF5F2259",
      hoverBackgroundColor: "#ff5f22",
      borderRadius: 4,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, 
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: { beginAtZero: true },
  },
};

function DashboardOrganizer() {
  return (
    <section className="py-8 px-4 lg:px-29.5">
      <div>
        <h2 className="font-bold text-2xl">Organizer Dashboard</h2>
        <p className="text-sm text-manatee mt-0.5">
          Manage your events and track performance.
        </p>
        <button className="flex py-2 px-4 bg-orange gap-2 rounded-lg text-white text-sm font-medium items-center mt-5">
          <Plus width={20} />
          <p className="">Create Event</p>
        </button>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl p-5 border border-gray-300 ">
          <div className="flex justify-between items-center">
            <p className="font-medium text-manatee text-xs">TOTAL EVENTS</p>
            <Calendar width={16} className="text-manatee" />
          </div>
          <p className="mt-3 font-bold text-2xl">2</p>
          <p className="text-manatee text-xs">All time</p>
        </div>
        <div className="rounded-xl p-5 border border-gray-300">
          <div className="flex justify-between items-center">
            <p className="font-medium text-manatee text-xs">TOTAL ATTENDEES</p>
            <UserRound width={16} className="text-manatee" />
          </div>
          <p className="mt-3 font-bold text-2xl">103</p>
          <p className="text-manatee text-xs">Across all events</p>
        </div>
        <div className="rounded-xl p-5 border border-gray-300">
          <div className="flex justify-between items-center">
            <p className="font-medium text-manatee text-xs">AVG FILL RATE</p>
            <TrendingUp width={16} className="text-manatee" />
          </div>
          <p className="mt-3 font-bold text-2xl">57%</p>
          <p className="text-manatee text-xs">Capacity utilization</p>
        </div>
        <div className="rounded-xl p-5 border border-gray-300">
          <div className="flex justify-between items-center">
            <p className="font-medium text-manatee text-xs">EVENT VIEWS</p>
            <Eye width={16} className="text-manatee" />
          </div>
          <p className="mt-3 font-bold text-2xl">3,241</p>
          <p className="text-manatee text-xs">Last 30 days</p>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-6">
        <h3 className="font-semibold text-lg ">Your Events</h3>
        <div className="mt-4 lg:flex gap-6">
          <div className="grid gap-3 h-max lg:grow">
            {dummy.event.slice(0, 2).map((data) => {
              return (
                <div
                  key={data.id}
                  className="rounded-xl border border-gray-300 p-4 flex gap-4"
                >
                  <img
                    src={data.image}
                    alt=""
                    className="w-20 h-16 rounded-lg"
                  />
                  <div className="grow grid gap-3">
                    <div>
                      <p className="text-sm font-semibold">{data.title}</p>
                      <p className="text-xs text-manatee mt-1">
                        {data.date} · {data.location}
                      </p>
                    </div>
                    <span className="py-0.5 px-2 w-max text-xs font-medium h-max bg-green-500/20 rounded-full">
                      {data.status === "open" && "Active"}
                    </span>
                    <div>
                      <div className="flex justify-between">
                        <p className="text-manatee text-xs">
                          {data.attendees} Atendees
                        </p>
                        <p className="text-manatee text-xs">
                          {data.capacity} Capacity
                        </p>
                      </div>
                      <div></div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex gap-2 px-3 py-1.5 items-center border border-gray-300 rounded-lg">
                        <PencilLine width={16} />
                        <p className="font-medium text-sm">Edit</p>
                      </button>
                      <div className="py-1.5 px-3 flex items-center gap-2">
                        <Eye width={16} />
                        <p className="text-xs font-medium">48 attendees</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid gap-4">
            <div className="p-5 rounded-xl border border-gray-300">
              <div className="flex gap-2 items-center">
                <ChartNoAxesColumn width={16} />
                <p className="font-semibold text-sm">
                  Registrations (6 months)
                </p>
              </div>
              <div className="overflow-hidden">
                <Bar data={dataChart} options={options} />
              </div>
            </div>
            <div className="border border-gray-300 rounded-xl p-5">
              <p className="font-semibold text-sm">Quick Actions</p>
              <div className="grid gap-3 mt-3 ">
                <Link
                  to={"/create-event"}
                  className="py-1.5 px-3 bg-orange flex gap-2 items-center justify-center rounded-lg text-white"
                >
                  <Plus width={16} />
                  <p className="font-medium text-sm">Create New Event</p>
                </Link>
                <button className="py-1.5 px-3 bg-gray-200 flex gap-2 items-center justify-center rounded-lg text-center">
                  <Eye width={16} />
                  <p className="font-medium text-sm">Preview as Attendee</p>
                </button>
              </div>
            </div>
            <div className="border border-gray-300 rounded-xl p-5">
              <p className="font-semibold text-sm">Upcoming Events</p>
              <div className="grid gap-3 mt-3 ">
                {dummy.event.slice(0, 2).map((data) => {
                  return (
                    <div
                      key={data.id}
                      className="flex justify-between items-center gap-4"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <div className="grow">
                        <p className="font-medium text-xs">{data.title}</p>
                        <p className="text-manatee text-[10px]">{data.date}</p>
                      </div>
                      <p className="text-manatee text-xs">
                        {data.attendees}/{data.capacity}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardOrganizer;
