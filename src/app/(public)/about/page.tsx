import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:px-6">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-50">
          About Us
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
          We are a team of passionate developers and designers dedicated to building the best web experiences.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2 lg:gap-16 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6 dark:text-slate-50">
            Our Mission
          </h2>
          <p className="text-lg text-slate-600 mb-6 dark:text-slate-400">
            Our mission is to empower businesses with cutting-edge technology. We believe in writing clean, maintainable code and designing intuitive user interfaces that solve real problems.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Founded in 2024, Buildora has helped hundreds of startups launch their products faster and more efficiently. We specialize in React, Next.js, and modern web technologies.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Card className="bg-slate-50 dark:bg-slate-900 border-none">
            <CardContent className="pt-6 text-center">
              <Users className="h-10 w-10 text-blue-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">50+</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Team Members</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-50 dark:bg-slate-900 border-none">
            <CardContent className="pt-6 text-center">
              <Target className="h-10 w-10 text-blue-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">100+</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Projects Delivered</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-50 dark:bg-slate-900 border-none sm:col-span-2">
            <CardContent className="pt-6 text-center">
              <Award className="h-10 w-10 text-blue-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">15+</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Awards Won</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-12 dark:text-slate-50">
          Our Team
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { name: "Alex Morgan", role: "CEO & Founder" },
            { name: "Jessica Lee", role: "Head of Design" },
            { name: "David Chen", role: "Lead Engineer" },
          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="h-32 w-32 rounded-full bg-slate-200 mb-4 flex items-center justify-center text-2xl font-bold text-slate-500">
                {member.name[0]}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{member.name}</h3>
              <p className="text-slate-500 dark:text-slate-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
