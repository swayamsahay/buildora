"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:px-6">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-6 dark:text-slate-50">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-600 mb-12 dark:text-slate-400">
            Have questions about our services or need support? Fill out the form and we'll get back to you as soon as possible.
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-50">Visit Us</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  123 Innovation Drive<br />
                  San Francisco, CA 94103
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-50">Email Us</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  hello@buildora.com<br />
                  support@buildora.com
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-50">Call Us</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  +1 (555) 123-4567<br />
                  Mon-Fri, 9am - 6pm PST
                </p>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>
              We usually respond within 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="john@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  className="min-h-[150px]"
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
