"use client";

import { createContext, useContext, useState, useCallback } from "react";

const ROLES = {
  student: {
    id: "student",
    label: "Student",
    description: "Assess skills, find internships, build your portfolio",
    icon: "GraduationCap",
  },
  industry: {
    id: "industry",
    label: "Industry",
    description: "Post opportunities, find & hire matched talent",
    icon: "Building2",
  },
  academician: {
    id: "academician",
    label: "Academician",
    description: "FDPs, consultancy, and collaborative research",
    icon: "BookOpen",
  },
  institution: {
    id: "institution",
    label: "Institution",
    description: "Monitor analytics, track placement readiness",
    icon: "Landmark",
  },
};

const RoleContext = createContext({
  role: null,
  roleConfig: null,
  setRole: () => {},
  roles: ROLES,
});

/**
 * @param {{ children: React.ReactNode, defaultRole?: string | null }} props
 */
export function RoleProvider({ children, defaultRole = null }) {
  const [role, setRoleState] = useState(defaultRole);

  const setRole = useCallback((newRole) => {
    if (newRole && !ROLES[newRole]) {
      console.warn(`Invalid role: "${newRole}". Valid roles: ${Object.keys(ROLES).join(", ")}`);
      return;
    }
    setRoleState(newRole);
  }, []);

  const roleConfig = role ? ROLES[role] : null;

  return (
    <RoleContext.Provider value={{ role, roleConfig, setRole, roles: ROLES }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}

export { ROLES };
