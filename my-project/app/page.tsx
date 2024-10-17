
import { CosmicBirthChart } from "@/components/CosmicBirthChart"

export default function Home() {
  return (
    <main>
      <div>
        <CosmicBirthChart />
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