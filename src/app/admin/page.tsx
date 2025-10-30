
"use client";

import {
  FileUp,
  ListVideo,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function AdminDashboard() {
  // Dummy data - will be replaced with real data fetching
  const progressData = [
    { email: "user1@example.com", course: "Quantum Physics", progress: 80 },
    { email: "user2@example.com", course: "Quantum Physics", progress: 40 },
    { email: "user3@example.com", course: "Electronics", progress: 100 },
    { email: "user4@example.com", course: "AI & ML", progress: 25 },
    { email: "user5@example.com", course: "History of Rome", progress: 75 },
    { email: "user1@example.com", course: "Electronics", progress: 60 },
  ];

  const chartData = [
    { name: "Quantum Physics", users: 150 },
    { name: "Electronics", users: 120 },
    { name: "AI & ML", users: 200 },
    { name: "History", users: 80 },
    { name: "Rocket Science", users: 50 },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
      // Logic to parse and upload the excel sheet will be added here
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,250</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Courses
                </CardTitle>
                <ListVideo className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">
                  +5 since last week
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Course Completions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Enrollment Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">73%</div>
                <p className="text-xs text-muted-foreground">
                  +2% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>User Progress</CardTitle>
                <CardDescription>
                  An overview of user progress across different courses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead className="text-right">Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {progressData.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="font-medium">{data.email}</div>
                        </TableCell>
                        <TableCell>{data.course}</TableCell>
                        <TableCell className="text-right">
                          {data.progress}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>
                  Upload an Excel file to add new courses or update content.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center gap-4 p-6">
                <div className="w-full flex justify-center">
                    <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600"
                    >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileUp className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and
                        drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                        XLSX, XLS (MAX. 5MB)
                        </p>
                    </div>
                    <Input id="file-upload" type="file" className="hidden" accept=".xlsx, .xls" onChange={handleFileUpload} />
                    </label>
                </div>
                <Button className="mt-4 w-full">Upload Content</Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Format: "Topic Name", "Youtube Video Link", "Short Description"
                </p>
              </CardContent>
            </Card>
          </div>
           <Card>
              <CardHeader>
                <CardTitle>Top Courses</CardTitle>
                <CardDescription>
                  Most popular courses by user enrollment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={chartData}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Bar
                      dataKey="users"
                      fill="currentColor"
                      radius={[4, 4, 0, 0]}
                      className="fill-primary"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}
