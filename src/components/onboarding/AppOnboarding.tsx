import { useAppOnboarding } from '@/hooks/useAppOnboarding';
import { WelcomeStep } from './steps/WelcomeStep';
import { ProfileSetupStep } from './steps/ProfileSetupStep';
import { VideoTutorialStep } from './steps/VideoTutorialStep';
import { DashboardStatsStep } from './steps/DashboardStatsStep';
import { DashboardTableStep } from './steps/DashboardTableStep';
import { CompletionStep } from './steps/CompletionStep';

export const AppOnboarding = () => {
  const { currentStep, isActive } = useAppOnboarding();

  if (!isActive) return null;

  switch (currentStep) {
    case 'welcome':
      return <WelcomeStep />;
    case 'profile-setup':
      return <ProfileSetupStep />;
    case 'video-tutorial':
      return <VideoTutorialStep />;
    case 'dashboard-stats':
      return <DashboardStatsStep />;
    case 'dashboard-table':
      return <DashboardTableStep />;
    case 'completion':
      return <CompletionStep />;
    default:
      return null;
  }
};