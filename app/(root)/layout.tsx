import { ReactNode } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/lib/actions/auth.action'

import SignOutButton from '@/components/SignOutButton'


const Rootlayout = async ({ children } : {children: ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated();

  if(!isUserAuthenticated) redirect('/sign-in');

  return (
    <div className="root-layout">
      <nav className="flex justify-between items-center p-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">InterVueAI</h2>
        </Link>
        
        <div className="flex items-center gap-4">
          {/* Add other navigation items here if needed */}
          <SignOutButton variant="secondary" />
        </div>
      </nav>

      {children}
    </div>
  )
}

export default Rootlayout
