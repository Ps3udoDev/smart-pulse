'use client'

import Image from 'next/image'
import { useSidebar } from '@/components/ui/sidebar'

export function SidebarBrand() {
  const { state } = useSidebar()
  const collapsed = state === 'collapsed'

  return (
    <div className={`flex items-center ${collapsed ? 'justify-center' : ''}`}>
      <Image
        src="/logo/smart-pulse.png"
        alt="SmartPulse"
        width={180}
        height={28}
        priority
        className={collapsed ? 'hidden' : 'block'}
      />
      <Image
        src="/logo/logo.png"
        alt="SmartPulse"
        width={32}
        height={32}
        priority
        className={collapsed ? 'block' : 'hidden'}
      />
    </div>
  )
}
