import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Moon, Sun, Menu, Search, Star, Calendar, Book, User, Settings } from "lucide-react"
import Link from "next/link"

export default function AstroNav() {
  return (
    <nav className="bg-indigo-950 bg-opacity-90 text-purple-100 p-4 sticky top-0 z-10 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold text-purple-200 flex items-center">
            <Star className="mr-2" />
            AstroGuide
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/daily-horoscope" className="hover:text-purple-300 transition-colors">
              Daily Horoscope
            </Link>
            <Link href="/natal-chart" className="hover:text-purple-300 transition-colors">
              Natal Chart
            </Link>
            <Link href="/compatibility" className="hover:text-purple-300 transition-colors">
              Compatibility
            </Link>
            <Link href="/tarot" className="hover:text-purple-300 transition-colors">
              Tarot
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <form className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-purple-400" />
              <Input
                placeholder="Search the stars..."
                className="pl-8 bg-indigo-900 border-indigo-700 text-purple-100 placeholder-purple-400 w-64"
              />
            </div>
          </form>
          <Button variant="ghost" size="icon" className="text-purple-200 hover:text-purple-100 hover:bg-indigo-800">
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-purple-200 hover:text-purple-100 hover:bg-indigo-800 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-indigo-950 border-indigo-800">
              <DropdownMenuItem className="text-purple-200 focus:bg-indigo-900 focus:text-purple-100">
                <Calendar className="mr-2 h-4 w-4" /> Daily Horoscope
              </DropdownMenuItem>
              <DropdownMenuItem className="text-purple-200 focus:bg-indigo-900 focus:text-purple-100">
                <Star className="mr-2 h-4 w-4" /> Natal Chart
              </DropdownMenuItem>
              <DropdownMenuItem className="text-purple-200 focus:bg-indigo-900 focus:text-purple-100">
                <User className="mr-2 h-4 w-4" /> Compatibility
              </DropdownMenuItem>
              <DropdownMenuItem className="text-purple-200 focus:bg-indigo-900 focus:text-purple-100">
                <Book className="mr-2 h-4 w-4" /> Tarot
              </DropdownMenuItem>
              <DropdownMenuItem className="text-purple-200 focus:bg-indigo-900 focus:text-purple-100">
                <Search className="mr-2 h-4 w-4" /> Search
              </DropdownMenuItem>
              <DropdownMenuItem className="text-purple-200 focus:bg-indigo-900 focus:text-purple-100">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}