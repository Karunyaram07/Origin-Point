import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { RoleOverview } from "@/components/dashboard/role-overview";

export default function InstitutionDashboardPage() {
  return (
    <DashboardShell role="institution" title="Dashboard">
      <RoleOverview role="institution" />
    </DashboardShell>
  );
}
