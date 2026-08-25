import { Routes, Route, Navigate } from "react-router";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import AuthLayout from "../layout/AuthLayout";
import Explore from "../pages/shared/Explore";
import Event from "../pages/shared/Event";
import DetailEvent from "../components/DetailEvent";
import Communities from "../pages/shared/Communities";
import CommunitieDetailLayout from "../layout/CommunitieDetailLayout";
import EventCommunityList from "../components/communitiesComponents/EventCommunityList";
import MemberCommunities from "../components/communitiesComponents/MemberCommunities";
import DiscussionCommunity from "../components/communitiesComponents/DiscussionCommunity";
import MyEventLayout from "../layout/MyEventLayout";
import UpComingEvent from "../components/myEventComponents/UpComingEvent";
import PastEvent from "../components/myEventComponents/PastEvent";
import ProfileLayout from "../layout/ProfileLayout";
import EventProfile from "../components/profileCommponents/EventProfile";
import CommunitiesProfil from "../components/profileCommponents/CommunitiesProfil";
import SavedList from "../components/SavedList";
import Notification from "../components/Notification";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../components/NotFound";
import DashboardOrganizer from "../pages/organizer/DashboardOrganizer";
import LayoutCreateEvent from "../layout/LayoutCreateEvent";
import BasicInformation from "../components/OrganizerComponents/BasicInformation";
import DateLocationCapacity from "../components/OrganizerComponents/DateLocationCapacity";
import SpeakersReview from "../components/OrganizerComponents/SpeakersReview";
import DashboardAdminLayout from "../layout/DashboardAdminLayout";
import OverviewAdmin from "../components/AdminComponents/OverviewAdmin";
import UsersAdmin from "../components/AdminComponents/UsersAdmin";
import EventAdmin from "../components/AdminComponents/EventAdmin";
import CommunityAdmin from "../components/AdminComponents/CommunityAdmin";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth/" element={<AuthLayout />}>
        <Route index element={<Navigate to="/auth/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot" element={<ForgotPassword />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Explore />} />
        <Route path="event">
          <Route index element={<Event />} />
          <Route path="detail">
            <Route path=":id" element={<DetailEvent />} />
          </Route>
        </Route>
        <Route path="communities">
          <Route index element={<Communities />} />
          <Route path="detail">
            <Route path=":id" element={<CommunitieDetailLayout />}>
              <Route index element={<EventCommunityList />} />
              <Route path="members" element={<MemberCommunities />} />
              <Route path="discussion" element={<DiscussionCommunity />} />
            </Route>
          </Route>
        </Route>

        <Route element={<ProtectedRoute roles={["attendee", "organizer"]} />}>
          <Route path="my-events" element={<MyEventLayout />}>
            <Route index element={<UpComingEvent />} />
            <Route path="past" element={<PastEvent />} />
            <Route path="saved" element={<SavedList />} />
          </Route>
          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<EventProfile />} />
            <Route path="communities" element={<CommunitiesProfil />} />
            <Route path="saved" element={<SavedList />} />
          </Route>
          <Route path="notification" element={<Notification />} />
        </Route>

        <Route element={<ProtectedRoute roles={["organizer"]} />}>
          <Route path="dashboard-organizer" element={<DashboardOrganizer />} />
          <Route path="create-event" element={<LayoutCreateEvent />}>
            <Route index element={<BasicInformation />} />
            <Route path="details" element={<DateLocationCapacity />} />
            <Route path="speaker-review" element={<SpeakersReview />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute roles={["admin"]} />}>
          <Route path="dashboard-admin" element={<DashboardAdminLayout />}>
              <Route index element={<OverviewAdmin />} />
              <Route path="users" element={<UsersAdmin />}/>
              <Route path="event" element={<EventAdmin />}/>
              <Route path="community" element={<CommunityAdmin />}/>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
