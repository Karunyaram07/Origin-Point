import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { RoleOverview } from "@/components/dashboard/role-overview";

export default function StudentDashboardPage() {
  return (
    <DashboardShell role="student" title="Dashboard">
      <RoleOverview role="student" />
    </DashboardShell>
  );
}
