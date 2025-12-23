import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Calendar, IndianRupee, TrendingUp, TrendingDown } from "lucide-react";

type StatItem = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: typeof Users;
  color: string;
};

const stats: StatItem[] = [
  {
    title: "Total Students",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Active Courses",
    value: "48",
    change: "+3",
    trend: "up",
    icon: BookOpen,
    color: "text-secondary",
  },
  {
    title: "Today's Classes",
    value: "24",
    change: "Schedule",
    trend: "neutral",
    icon: Calendar,
    color: "text-accent",
  },
  {
    title: "Revenue",
    value: "₹45,231",
    change: "+8%",
    trend: "up",
    icon: IndianRupee,
    color: "text-secondary",
  },
];

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Welcome section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Admin!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your school today.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  {stat.trend === "up" && (
                    <>
                      <TrendingUp className="w-4 h-4 text-secondary" />
                      <p className="text-xs text-secondary">{stat.change} from last month</p>
                    </>
                  )}
                  {stat.trend === "down" && (
                    <>
                      <TrendingDown className="w-4 h-4 text-destructive" />
                      <p className="text-xs text-destructive">{stat.change} from last month</p>
                    </>
                  )}
                  {stat.trend === "neutral" && (
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates from your school</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "New student enrolled", time: "2 hours ago", type: "success" },
                  { title: "Fee payment received", time: "4 hours ago", type: "success" },
                  { title: "Attendance marked for Class 10A", time: "5 hours ago", type: "info" },
                  { title: "New course added: Advanced Math", time: "1 day ago", type: "info" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "success" ? "bg-secondary" : "bg-primary"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Don't miss these important dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Parent-Teacher Meeting", date: "Tomorrow, 10:00 AM" },
                  { title: "Mid-term Exams", date: "Next Week" },
                  { title: "Sports Day", date: "Dec 15, 2025" },
                  { title: "Annual Function", date: "Dec 20, 2025" },
                ].map((event, index) => (
                  <div key={index} className="flex items-start justify-between pb-3 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </div>
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
