import { NavbarWrapper } from './navbar-wrapper';
import { NavMenu } from './menu';
import { SearchButton } from './search-button';
import { CartButton } from './cart-button';

export function Navbar() {
  return (
    <NavbarWrapper>
      <NavMenu />
      <div className="ml-auto space-x-1 py-2">
        <SearchButton />
        <CartButton />
      </div>
    </NavbarWrapper>
  );
}
