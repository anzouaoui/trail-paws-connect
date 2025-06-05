
import React from 'react';
import { FirebaseAuthProvider } from '@/contexts/FirebaseAuthContext';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
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
import UserProfilePage from './pages/UserProfilePage';
import ChallengeRegistrationPage from './pages/ChallengeRegistrationPage';
import ChallengeDetailPage from './pages/ChallengeDetailPage';
import NotFound from './pages/NotFound';
import PrivacySecurityPage from './pages/PrivacySecurityPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import HelpSupportPage from './pages/HelpSupportPage';
import LiveChatPage from './pages/LiveChatPage';
import TrackingStartGuide from './pages/TrackingStartGuide';
import DogProfileManagementGuide from './pages/DogProfileManagementGuide';
import PremiumFeaturesGuide from './pages/PremiumFeaturesGuide';
import SyncTroubleshootingGuide from './pages/SyncTroubleshootingGuide';
import TrainingTipsPage from './pages/TrainingTipsPage';
import './App.css';
import EventDetailPage from './pages/EventDetailPage';
import EventRegistrationPage from './pages/EventRegistrationPage';
import TrailDetailPage from './pages/TrailDetailPage';
import EmailSupportPage from './pages/EmailSupportPage';
import PhoneSupportPage from './pages/PhoneSupportPage';
import CommunityPage from './pages/CommunityPage';

function AppContent() {
  const location = useLocation();
  const hideNavigation = ['/login', '/signup', '/onboarding'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background w-full">
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
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
        <Route path="/privacy-security" element={<PrivacySecurityPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/notification-settings" element={<NotificationSettingsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/chat/:id" element={<ChatDetailPage />} />
        <Route path="/friend-requests" element={<FriendRequestsPage />} />
        <Route path="/dogs" element={<DogProfilesPage />} />
        <Route path="/dog-profile/new" element={<DogProfileFormPage />} />
        <Route path="/dog-profile/:id/edit" element={<DogProfileFormPage />} />
        <Route path="/dog-health/:id" element={<DogHealthRecordsPage />} />
        <Route path="/health-records" element={<DogHealthRecordsPage />} />
        <Route path="/health-alerts" element={<HealthAlertsPage />} />
        <Route path="/runner-profile" element={<RunnerProfilePage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/user-profile/:id" element={<UserProfilePage />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/analytics" element={<AdvancedAnalyticsPage />} />
        <Route path="/compare" element={<CompareActivitiesPage />} />
        <Route path="/devices" element={<DeviceIntegrationPage />} />
        <Route path="/devices/add" element={<AddDevicePage />} />
        <Route path="/challenge/:id" element={<ChallengeDetailPage />} />
        <Route path="/challenge/:id/register" element={<ChallengeRegistrationPage />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path="/event/:id/register" element={<EventRegistrationPage />} />
        <Route path="/trail/:id" element={<TrailDetailPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/help-support" element={<HelpSupportPage />} />
        <Route path="/live-chat" element={<LiveChatPage />} />
        <Route path="/email-support" element={<EmailSupportPage />} />
        <Route path="/tracking-guide" element={<TrackingStartGuide />} />
        <Route path="/dog-management-guide" element={<DogProfileManagementGuide />} />
        <Route path="/premium-features-guide" element={<PremiumFeaturesGuide />} />
        <Route path="/sync-troubleshooting" element={<SyncTroubleshootingGuide />} />
        <Route path="/training-tips" element={<TrainingTipsPage />} />
        <Route path="/phone-support" element={<PhoneSupportPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideNavigation && <BottomNavigation />}
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <FirebaseAuthProvider>
        <AppContent />
      </FirebaseAuthProvider>
    </Router>
  );
}

export default App;
