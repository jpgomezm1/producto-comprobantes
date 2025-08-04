import { OnboardingProvider } from "@/components/onboarding/OnboardingProvider";
import { DashboardLayoutContent } from "./DashboardLayoutContent";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <OnboardingProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </OnboardingProvider>
  );
};