
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import BottomNavigation from "./components/BottomNavigation";
import OnboardingPage from "./pages/OnboardingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import TrackPage from "./pages/TrackPage";
import StatsPage from "./pages/StatsPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import DogProfilesPage from "./pages/DogProfilesPage";
import DogProfileFormPage from "./pages/DogProfileFormPage";
import RunnerProfilePage from "./pages/RunnerProfilePage";
import ActivityDetailPage from "./pages/ActivityDetailPage";
import MessagesPage from "./pages/MessagesPage";
import ChatDetailPage from "./pages/ChatDetailPage";
import AdvancedAnalyticsPage from "./pages/AdvancedAnalyticsPage";
import CompareActivitiesPage from "./pages/CompareActivitiesPage";
import HealthAlertsPage from "./pages/HealthAlertsPage";
import DeviceIntegrationPage from "./pages/DeviceIntegrationPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Navigate to="/onboarding" replace />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/track" element={<TrackPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/dogs" element={<DogProfilesPage />} />
              <Route path="/dog/:id" element={<DogProfileFormPage />} />
              <Route path="/runner-profile" element={<RunnerProfilePage />} />
              <Route path="/activity/:id" element={<ActivityDetailPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/messages/:id" element={<ChatDetailPage />} />
              {/* Premium feature routes */}
              <Route path="/analytics" element={<AdvancedAnalyticsPage />} />
              <Route path="/analytics/:metric" element={<AdvancedAnalyticsPage />} />
              <Route path="/compare" element={<CompareActivitiesPage />} />
              <Route path="/health-alerts" element={<HealthAlertsPage />} />
              <Route path="/devices" element={<DeviceIntegrationPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Routes>
              {["/home", "/explore", "/track", "/stats", "/profile", "/messages"].map((path) => (
                <Route
                  key={path}
                  path={path}
                  element={<BottomNavigation />}
                />
              ))}
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
