import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { RoleOverview } from "@/components/dashboard/role-overview";

export default function IndustryDashboardPage() {
  return (
    <DashboardShell role="industry" title="Dashboard">
      <RoleOverview role="industry" />
    </DashboardShell>
  );
}
