import {Logo, LinksDropdown, ModeToggle, NavLinks, CartButton} from '.'

function Navbar() {
  return (
    <div className=" bg-muted py-4">
      <div className="align-element flex justify-between items-center">
        <Logo />
        <LinksDropdown />
        <NavLinks />
        <div className="flex justify-center items center gap-x-4">
          <ModeToggle />
          <CartButton />
        </div>
      </div>
    </div>
  )
}
export default Navbar
