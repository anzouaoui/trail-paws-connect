
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import BottomNavigation from './components/BottomNavigation';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import TrackPage from './pages/TrackPage';
import StatsPage from './pages/StatsPage';
import ProfilePage from './pages/ProfilePage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import EditActivityPage from './pages/EditActivityPage';
import ActivityRatingPage from './pages/ActivityRatingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import SettingsPage from './pages/SettingsPage';
import NotificationsPage from './pages/NotificationsPage';
import NotificationSettingsPage from './pages/NotificationSettingsPage';
import MessagesPage from './pages/MessagesPage';
import ChatDetailPage from './pages/ChatDetailPage';
import FriendRequestsPage from './pages/FriendRequestsPage';
import DogProfilesPage from './pages/DogProfilesPage';
import DogProfileFormPage from './pages/DogProfileFormPage';
import DogHealthRecordsPage from './pages/DogHealthRecordsPage';
import HealthAlertsPage from './pages/HealthAlertsPage';
import RunnerProfilePage from './pages/RunnerProfilePage';
import PostDetailPage from './pages/PostDetailPage';
import SubscriptionPage from './pages/SubscriptionPage';
import AdvancedAnalyticsPage from './pages/AdvancedAnalyticsPage';
import CompareActivitiesPage from './pages/CompareActivitiesPage';
import DeviceIntegrationPage from './pages/DeviceIntegrationPage';
import AddDevicePage from './pages/AddDevicePage';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/activity/:id" element={<ActivityDetailPage />} />
          <Route path="/activity/:id/edit" element={<EditActivityPage />} />
          <Route path="/activity/:id/rate" element={<ActivityRatingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/notification-settings" element={<NotificationSettingsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/chat/:id" element={<ChatDetailPage />} />
          <Route path="/friend-requests" element={<FriendRequestsPage />} />
          <Route path="/dogs" element={<DogProfilesPage />} />
          <Route path="/dog-profile/new" element={<DogProfileFormPage />} />
          <Route path="/dog-profile/:id/edit" element={<DogProfileFormPage />} />
          <Route path="/dog-health/:id" element={<DogHealthRecordsPage />} />
          <Route path="/health-alerts" element={<HealthAlertsPage />} />
          <Route path="/runner-profile" element={<RunnerProfilePage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/analytics" element={<AdvancedAnalyticsPage />} />
          <Route path="/compare" element={<CompareActivitiesPage />} />
          <Route path="/devices" element={<DeviceIntegrationPage />} />
          <Route path="/devices/add" element={<AddDevicePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNavigation />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
