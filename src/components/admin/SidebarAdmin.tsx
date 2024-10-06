import React, { useState, useEffect } from 'react';
import { Button, Menu } from 'react-daisyui';
import { NavLink, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { IoLocation } from 'react-icons/io5';
import { MdPostAdd } from 'react-icons/md';
// import { useTranslation } from 'react-i18next';
import DarkModeToggle from '../orther/darkmode/DarkMode';
import { Logo, LogoTitle } from '../../assets/images';

const SidebarAdmin: React.FC<{}> = () => {
  //Translation
  //   const { t } = useTranslation();

  const [activeItem, setActiveItem] = useState('Dashboard');

  const location = useLocation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const menuItems = [
    {
      name: 'Dashboard',
      icon: FaHome,
      link: '/admin',
      toastify: null
    },
    {
      name: 'Địa chỉ',
      icon: IoLocation,
      link: '/admin/location'
      //   toastify: listsData?.data.length
    },
    {
      name: 'Bài viết',
      icon: MdPostAdd,
      link: '/admin/blog'
    }
  ];

  useEffect(() => {
    const pathname = location.pathname;
    const foundItem = menuItems.find(item => pathname === item.link);
    if (foundItem) {
      setActiveItem(foundItem.name);
    }
  }, [location.pathname, menuItems]);

  return (
    <div className="flex h-screen flex-col items-center justify-between bg-white dark:bg-gray-800 xl:fixed xl:w-64 xl:shadow-lg">
      <div className="w-full">
        <div className="mt-8 flex w-full items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <img
              width={60}
              height={60}
              src={Logo}
              className="dark:hidden"
              alt="LacLacTrip ."
            />
            <img
              width={60}
              height={60}
              src={LogoTitle}
              className="hidden dark:block"
              alt="LacLacTrip ."
            />
            <div className="">
              <p className="text-base font-bold text-primary dark:text-white">
                LacLac Trip
              </p>
              <p className="text-[.8rem] font-light dark:text-white">
                Booking Ticket Manager
              </p>
            </div>
          </div>
          <div className="">
            <DarkModeToggle />
          </div>
        </div>
        <div className="relative flex w-full flex-col justify-between bg-white dark:bg-gray-800 dark:text-white">
          <div className="mb-2 mt-5 h-[300px] overflow-y-scroll scrollbar-hide md:h-[400px]">
            <Menu className="flex-grow">
              {menuItems.map(item => {
                const Icon = item.icon;
                return (
                  <Menu.Item key={item.name} className="relative">
                    <NavLink
                      to={item.link}
                      className={`btn flex w-full items-center justify-start border-none shadow-white dark:bg-gray-800 dark:shadow-none ${
                        item.name === activeItem
                          ? 'bg-base-200 font-bold text-primary dark:bg-white'
                          : 'bg-transparent bg-white font-light text-black dark:text-white'
                      } relative pl-4`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          {item.name === activeItem && (
                            <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
                          )}
                          <Icon
                            className={
                              item.name === activeItem
                                ? 'mr-2 h-5 w-5 text-primary'
                                : 'mr-2 h-5 w-5'
                            }
                          />
                          <div className="flex items-center justify-between gap-2">
                            <div className="">
                              <p>{item.name}</p>
                            </div>
                          </div>
                        </div>
                        <div className="">
                          {item.toastify ? (
                            <div className="flex w-[22px] justify-center rounded-md bg-green-500 py-1">
                              <p className="text-[.8rem] font-light text-white"></p>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </NavLink>
                  </Menu.Item>
                );
              })}
            </Menu>
          </div>
        </div>
      </div>
      <div className="mx-2 flex flex-col items-center"></div>
      <div className="flex flex-col items-center">
        <div className="rounded-lg bg-primary p-4 text-center text-white">
          <p className="w-40 text-center text-xs">
            Chọn nút bên dưới để thêm danh mục!
          </p>
          <Button className="my-4 rounded-lg bg-white text-primary">
            +Thêm Danh Mục
          </Button>
        </div>
        <div className="py-4 text-xs text-black">
          <p className="font-bold">Quản trị LacLacTrip </p>
          <p className="font-light">© 2024 đã đăng ký bản quyền</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarAdmin;
