import { NavLink, useLocation } from 'react-router';
import MobileNavbar from './mobile-navbar';

type NavbarProps = {
  navbarEntries: any;
};

const Navbar = ({ navbarEntries }: NavbarProps) => {
  const pathname = useLocation().pathname.substring(1);
  const navbarEntriesWithoutFirst = navbarEntries.slice(1);

  return (
    <div className='w-full z-10 bg-white shadow-md sticky top-0 h-24'>
      <div className='container max-w-[1240px] mx-auto flex justify-between px-5 py-2'>
        <div className='flex'>
          <NavLink
            to={`./${navbarEntries[0]?.slug}`}
            className={({ isActive }) =>
              `my-auto mr-5 flex flex-col items-center hover:cursor-pointer${isActive ? ' pointer-events-none' : ''}`
            }
          >
            <p className='whitespace-nowrap text-primary typo-headline-xl'>911 RS</p>
            <p className='whitespace-nowrap typo-display-xs font-bold'>ALTE 11ER GARAGE</p>
            <p className='typo-display-xs'>ARBON</p>
          </NavLink>
        </div>
        <div className='touch:hidden flex'>
          {navbarEntriesWithoutFirst.map((e: any, i: any) => (
            <NavLink
              key={i}
              to={`./${e.slug}`}
              className={({ isActive }) => `mb-6 ml-12 mt-auto hover:cursor-pointer${isActive ? ' text-primary pointer-events-none' : ''}`}
            >
              <p
                className={`typo-headline-md transition-all duration-150 ease-in hover:scale-105 ${pathname === e.slug && 'text-primary'}`}
              >
                {e.navigation_title.toUpperCase()}
              </p>
            </NavLink>
          ))}
        </div>
        <div className='block mouse:hidden'>
          <MobileNavbar navbarEntries={navbarEntriesWithoutFirst} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
