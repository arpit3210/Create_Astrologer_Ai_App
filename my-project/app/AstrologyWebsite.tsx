import React from 'react'
import { Star, Sun, Moon, ChevronDown, Facebook, Instagram, Twitter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'

export default function AstrologyWebsite() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900 text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/cosmos-bg.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/70"></div>
        <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-amber-300">Your Personal AI Astrologer</h1>
          <p className="text-xl md:text-2xl font-light">Unlock the Secrets of Your Stars</p>
          <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
            Get Started
          </Button>
          <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
           Sign Out 
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8">
          <ChevronDown className="w-8 h-8 text-white animate-bounce" />
        </div>
      </section>

      {/* Input Form Section */}
      <section className="py-16 bg-indigo-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">Enter Your Details</h2>
          <form className="max-w-2xl mx-auto space-y-6">
            <Input type="text" placeholder="Your Name" className="bg-white/10 border-white/20 text-white placeholder-white/50" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input type="date" placeholder="Birth Date" className="bg-white/10 border-white/20 text-white placeholder-white/50" />
              <Input type="time" placeholder="Birth Time" className="bg-white/10 border-white/20 text-white placeholder-white/50" />
              <Input type="text" placeholder="Place of Birth" className="bg-white/10 border-white/20 text-white placeholder-white/50" />
            </div>
            <Textarea placeholder="Your question or area of focus (optional)" className="bg-white/10 border-white/20 text-white placeholder-white/50" />
            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-md text-lg transition-all duration-300 transform hover:scale-105">
              Submit
            </Button>
          </form>
        </div>
      </section>

      {/* Astrological Insights Preview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">Your Astrological Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Sun className="w-6 h-6 mr-2 text-amber-400" />
                  Planetary Positions
                </h3>
                <p className="text-white/80">Your sun sign is in Leo, indicating strong leadership qualities and creativity.</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Moon className="w-6 h-6 mr-2 text-blue-300" />
                  Zodiac Chart
                </h3>
                <p className="text-white/80">Your moon is in Pisces, suggesting deep emotional intuition and artistic tendencies.</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Star className="w-6 h-6 mr-2 text-yellow-300" />
                  Key Predictions
                </h3>
                <p className="text-white/80">This month brings opportunities for career growth and new partnerships.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-indigo-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img src="/avatar1.jpg" alt="User" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold">Priya Sharma</h4>
                    <p className="text-sm text-white/60">Delhi, India</p>
                  </div>
                </div>
                <p className="text-white/80">"This AI astrologer provided insights that were surprisingly accurate and helpful in my career decisions."</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img src="/avatar2.jpg" alt="User" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold">Rahul Patel</h4>
                    <p className="text-sm text-white/60">Mumbai, India</p>
                  </div>
                </div>
                <p className="text-white/80">"I was skeptical at first, but the personalized readings have been spot-on. Highly recommended!"</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-indigo-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/60 text-sm mb-4 md:mb-0">
              © 2024 Your AI Astrologer. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <Link href="/privacy-policy" className="text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-use" className="text-white/60 hover:text-white transition-colors">Terms of Use</Link>
              <Link href="/contact-us" className="text-white/60 hover:text-white transition-colors">Contact Us</Link>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}