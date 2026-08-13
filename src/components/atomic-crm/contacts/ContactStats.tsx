import { useListContext } from "ra-core";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Building, TrendingUp } from "lucide-react";
import type { Contact } from "../types";

export const ContactStats = () => {
  const { data, total } = useListContext<Contact>();

  if (!data || data.length === 0) {
    return null;
  }

  // Calculate unique companies
  const uniqueCompanies = new Set(
    data
      .filter((contact) => contact.company_id)
      .map((contact) => contact.company_id),
  ).size;

  // Calculate new contacts in the last week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const newContactsLastWeek = data.filter((contact) => {
    const firstSeen = new Date(contact.first_seen);
    return firstSeen >= oneWeekAgo;
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <StatCard
        icon={<Users className="h-5 w-5" />}
        title="Total Contacts"
        value={total?.toString() || data.length.toString()}
        iconColor="text-blue-500"
        bgColor="bg-blue-50 dark:bg-blue-950/20"
      />
      <StatCard
        icon={<Building className="h-5 w-5" />}
        title="Companies"
        value={uniqueCompanies.toString()}
        iconColor="text-purple-500"
        bgColor="bg-purple-50 dark:bg-purple-950/20"
      />
      <StatCard
        icon={<TrendingUp className="h-5 w-5" />}
        title="New This Week"
        value={newContactsLastWeek.toString()}
        iconColor="text-green-500"
        bgColor="bg-green-50 dark:bg-green-950/20"
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  iconColor: string;
  bgColor: string;
}

const StatCard = ({
  icon,
  title,
  value,
  iconColor,
  bgColor,
}: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`${bgColor} ${iconColor} p-3 rounded-lg`}>{icon}</div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
