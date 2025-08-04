import { DashboardLayoutContent } from "./DashboardLayoutContent";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <DashboardLayoutContent>{children}</DashboardLayoutContent>
  );
};