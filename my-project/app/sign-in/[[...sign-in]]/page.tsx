"use client"

import { useState } from "react"
import { useSignIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Loader2, Star, Moon, Sun, Mail, Lock } from "lucide-react"

export default function CosmicSignIn() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return

    setLoading(true)
    setError("")

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      })

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId })
        router.push("/CosmicBirthChart")
      } else if (result.status === "needs_identifier") {
        setError("Please provide a valid email address.")
      } else if (result.status === "needs_first_factor" || result.status === "needs_second_factor") {
        setError("Two-factor authentication is required. Please check your email for the verification code.")
      } else if (result.status === "needs_new_password") {
        setError("Your account requires a new password. Please follow the instructions sent to your email.")
      } else {
        // Handle other statuses if necessary
        setError("An unknown error occurred. Please try again later.")
      }
    } catch (err) {
      if (err instanceof Error) {
        setError("Your account does not exist. Please sign up.")
      } else {
        setError("A celestial disturbance occurred. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/CosmicBirthChart",
        redirectUrlComplete: "/CosmicBirthChart"
      })
    } catch (err) {
      console.error("Error during Google sign in", err)
      setError("A cosmic anomaly prevented Google sign-in. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-950 to-purple-950 p-4">
      <Card className="w-full max-w-md mx-auto bg-opacity-30 bg-black backdrop-blur-md border-purple-500 text-purple-100 shadow-lg shadow-purple-500/20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-purple-200 flex items-center justify-center">
            <Moon className="mr-2 h-6 w-6 text-yellow-200 animate-pulse" />
            Cosmic Gateway
            <Sun className="ml-2 h-6 w-6 text-yellow-400 animate-pulse" />
          </CardTitle>
          <CardDescription className="text-center text-purple-300">
            Choose your celestial path to enter the astral realm
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleGoogleSignIn}
            className="w-full bg-white text-gray-800 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>

          <div className="flex items-center space-x-2 justify-center">
            {/* <Separator className="flex-grow bg-purple-700" /> */}
            <span className="text-purple-300 text-sm">OR</span>
            {/* <Separator className="flex-grow bg-purple-700" /> */}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-200">
                <Mail className="inline-block mr-2 mb-1" />
                Astral Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your-cosmic-self@stars.universe"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-indigo-900 bg-opacity-50 border-purple-600 text-purple-100 placeholder-purple-400 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-200">
                <Lock className="inline-block mr-2 mb-1" />
                Celestial Passphrase
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Your secret star alignment"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-indigo-900 bg-opacity-50 border-purple-600 text-purple-100 placeholder-purple-400 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              />
            </div>
            {error && <p className="text-pink-400 text-sm">{error}</p>}
            <Button 
              type="submit" 
              className="w-full bg-purple-700 hover:bg-purple-600 text-purple-100 transition-all duration-300 transform hover:scale-105" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Aligning Cosmic Energies...
                </>
              ) : (
                <>
                  <Star className="mr-2 h-4 w-4 animate-pulse" />
                  Enter the Astral Plane
                </>
              )}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <a href="/sign-up" className="text-purple-300 hover:text-purple-200 transition-colors">
              New to the cosmos? Create your stellar account
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
