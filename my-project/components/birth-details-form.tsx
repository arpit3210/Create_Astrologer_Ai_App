"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  dateOfBirth: z.string(),
  timeOfBirth: z.string(),
  placeOfBirth: z.string().min(2, "Place of birth is required"),
})

export function BirthDetailsForm() {
  const [reading, setReading] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dateOfBirth: "",
      timeOfBirth: "",
      placeOfBirth: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const response = await fetch("/api/astrological-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setReading(data.reading)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Your Birth Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time of Birth</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="placeOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place of Birth</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter place of birth" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Reading...
                </>
              ) : (
                "Get Astrological Reading"
              )}
            </Button>
          </form>
        </Form>

        {reading && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Your Astrological Reading</h3>
            <div className="prose max-w-none whitespace-pre-wrap">
              {reading}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}