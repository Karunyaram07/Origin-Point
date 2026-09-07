import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { RoleOverview } from "@/components/dashboard/role-overview";

export default function AcademicianDashboardPage() {
  return (
    <DashboardShell role="academician" title="Dashboard">
      <RoleOverview role="academician" />
    </DashboardShell>
  );
}
