
import { BirthDetailsForm } from "@/components/birth-details-form"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">AI Vedic Astrologer</h1>
        <BirthDetailsForm />
      </div>
    </main>
  )
}



// import AstrologyWebsite from "./AstrologyWebsite"

// export default function Home() {
//   return (
//     <h1 className="text-3xl font-bold underline">
//     <AstrologyWebsite/>
//     </h1>
//   )
// }

// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton
// } from '@clerk/nextjs'
// import './globals.css'
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <body>
//           <SignedOut>
//             <SignInButton />
//           </SignedOut>
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//           {children}
//         </body>
//       </html>
//     </ClerkProvider>
//   )
// }