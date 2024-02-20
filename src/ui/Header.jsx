import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import User from "../features/user/User";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-500 px-2 py-3 uppercase sm:px-6 sm:py-4">
      <Link to="/" className="text-sm tracking-widest sm:text-base">
        Fast React Pizza co.
      </Link>
      <SearchOrder />
      <User />
    </header>
  );
}

export default Header;
