export type UserRole =
  | 'Super Admin'
  | 'Sales Admin'
  | 'Marketing Partner'
  | 'Franchise'
  | 'EPC Contractor'
  | 'Installation Vendor'
  | 'Survey Engineer'
  | 'Finance'
  | 'Service Engineer'
  | 'Customer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department: string;
  branch: string;
  permissions: string[];
}

export interface NavigationItem {
  title: string;
  href: string;
  icon: string;
  badge?: string;
  allowedRoles?: UserRole[];
  children?: NavigationItem[];
}

export interface SystemHealthSummary {
  status: 'HEALTHY' | 'UNHEALTHY';
  timestamp: string;
  services: {
    database: { status: string; type: string };
    redis: { status: string; type: string };
    syncGateway: { status: string; type: string };
  };
}

export interface MetricCardData {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  subtext: string;
}
