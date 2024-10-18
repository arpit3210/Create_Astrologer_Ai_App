"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Star, Moon, Sun, Sparkles } from "lucide-react"
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
  name: z.string().min(2, "Your cosmic essence requires at least 2 characters"),
  dateOfBirth: z.string().min(1, "The celestial tapestry awaits your birth date"),
  timeOfBirth: z.string().min(1, "The cosmic clock yearns for your moment of arrival"),
  placeOfBirth: z.string().min(2, "Your earthly anchor point is crucial for astral navigation"),
})

type FormValues = z.infer<typeof formSchema>

export default function CosmicBirthChart() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dateOfBirth: "",
      timeOfBirth: "",
      placeOfBirth: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setLoading(true)
    try {
      const response = await fetch("/api/astrological-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error)
      
      localStorage.setItem('astroReading', JSON.stringify({
        reading: data.reading,
        userDetails: values
      }))
      
      router.push('/chatWithAstro')
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-950 to-purple-950 p-4">
      <Card className="w-full max-w-md mx-auto bg-opacity-30 bg-black backdrop-blur-md border-purple-500 text-purple-100 shadow-lg shadow-purple-500/20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-purple-200 flex items-center justify-center">
            <Moon className="mr-2 h-6 w-6 text-yellow-200 animate-pulse" />
            Cosmic Birth Chart
            <Sun className="ml-2 h-6 w-6 text-yellow-400 animate-pulse" />
          </CardTitle>
          <CardDescription className="text-center text-purple-300">
            Unveil the secrets of your celestial blueprint and discover your cosmic destiny
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-200">Astral Identity</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name as whispered by the stars" 
                        {...field} 
                        className="bg-indigo-900 bg-opacity-50 border-purple-600 text-purple-100 placeholder-purple-400 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                      />
                    </FormControl>
                    <FormMessage className="text-pink-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-200">
                      <Star className="inline-block mr-2 mb-1" />
                      Celestial Birth Date
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                        className="bg-indigo-900 bg-opacity-50 border-purple-600 text-purple-100 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                      />
                    </FormControl>
                    <FormMessage className="text-pink-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-200">
                      <Moon className="inline-block mr-2 mb-1" />
                      Moment of Cosmic Alignment
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="time" 
                        {...field} 
                        className="bg-indigo-900 bg-opacity-50 border-purple-600 text-purple-100 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                      />
                    </FormControl>
                    <FormMessage className="text-pink-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="placeOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-200">
                      <Sparkles className="inline-block mr-2 mb-1" />
                      Earthly Nexus
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Where your stardust first coalesced" 
                        {...field} 
                        className="bg-indigo-900 bg-opacity-50 border-purple-600 text-purple-100 placeholder-purple-400 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                      />
                    </FormControl>
                    <FormMessage className="text-pink-400" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-purple-700 hover:bg-purple-600 text-purple-100 transition-all duration-300 transform hover:scale-105" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Aligning Celestial Energies...
                  </>
                ) : (
                  <>
                    <Star className="mr-2 h-4 w-4 animate-pulse" />
                    Unveil My Cosmic Destiny
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}