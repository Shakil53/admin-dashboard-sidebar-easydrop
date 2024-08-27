import { useState } from 'react';
import { FaBars, FaTimes, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';
import companyIcon from '../assets/logo/companyLogo.png';
import companyName from '../assets/logo/company-name.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSetActive = (index, hasSubmenu) => {
    // Toggle submenu only, don't close the sidebar
    setOpenSubMenu(openSubMenu === index ? null : index);

    // If there's no submenu or the screen is larger than mobile, close the sidebar
    if (!hasSubmenu && isOpen) {
      setIsOpen(false);
    }
  };

  const handleSubmenuClick = () => {
    // Close the sidebar when a submenu item is clicked
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const menuItems = [
    { name: 'Dashboard', submenu: null, to: '/admin-dashboard/dashboard' },
    {
      name: 'Order',
      submenu: [
        { name: 'SubOrder', to: '/order/team-a' },
        { name: 'SubOrder', to: '/order/team-b' },
      ],
    },
    {
      name: 'Product',
      submenu: [
        { name: 'List', to: '/admin-dashboard/product/list' },
        { name: 'Category', to: '/product/category' },
      ],
    },
    {
      name: 'User',
      submenu: [
        { name: 'User-1', to: '/user/user-1' },
        { name: 'User-2', to: '/user/user-2' },
      ],
    },
    { name: 'Payment Request', submenu: null, to: '/payment-request' },
    { name: 'Delivery Charge', submenu: null, to: '/payment-request' },
    { name: 'Boost Requests', submenu: null, to: '/boost-request' },
    { name: 'Commission', submenu: null, to: '/commission' },
  ];

  return (
    <div className="flex h-screen">
      {/* Mobile menu button */}
      <div className="md:hidden p-4">
        <button onClick={toggleSidebar} className="text-gray-800">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-[#f8fafc] text-black w-64 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="p-4">
          <NavLink to="/" className="text-lg font-bold">
            <span><img className='mx-auto h-5 sm:h-10' src={companyIcon} alt="Company Icon" /></span>
            <span><img className='mx-auto h-4 sm:h-8' src={companyName} alt="Company Name" /></span>
          </NavLink>
        </div>
        <nav className="mt-10">
          {menuItems.map((item, index) => (
            <div key={index}>
              <NavLink
                to={item.to || '#'}
                className={`flex items-center justify-between py-2.5 px-4 rounded ${
                  !item.submenu && location.pathname === item.to ? 'bg-[#139FAD] text-white' : ''
                }`}
                onClick={() => handleSetActive(index, !!item.submenu)}
              >
                <span>{item.name}</span>
                {item.submenu && (
                  <span>
                    {openSubMenu === index ? <FaChevronDown /> : <FaChevronRight />}
                  </span>
                )}
              </NavLink>
              {item.submenu && openSubMenu === index && (
                <div className="pl-6">
                  {item.submenu.map((subItem, subIndex) => (
                    <NavLink
                      to={subItem.to}
                      key={subIndex}
                      className={`block py-2 px-4 rounded ${
                        location.pathname === subItem.to ? 'bg-[#139FAD] text-white' : 'hover:bg-gray-200'
                      }`}
                      onClick={handleSubmenuClick} // Close sidebar on submenu click
                    >
                      {subItem.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
