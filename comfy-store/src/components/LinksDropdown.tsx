import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { links } from '@/utils'
import { AlignLeft, Armchair } from 'lucide-react'
import { Button } from './ui/button'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '@/hooks'

function LinksDropdown() {
  const user = useAppSelector((state) => state.userState.user)

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="lg:hidden">
          <Button variant="outline" size="icon">
            <AlignLeft />
            <span className="sr-only"> Toggle Links</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-52 lg:hidden"
          align="start"
          sideOffset={25}
        >
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
          {links.map((link) => {
            // restricted routes
            const restrictedRoutes =
              link.href === 'checkout' || link.href === 'orders'

            if (restrictedRoutes && !user) return null
            return (
              <DropdownMenuItem key={link.label}>
                <NavLink
                  to={link.href}
                  className={(isActive) => {
                    return `capitalize w-full ${isActive ? 'text-primary' : ''}`
                  }}
                >
                  {link.label}
                </NavLink>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
export default LinksDropdown
