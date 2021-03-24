import { AiFillHome } from 'react-icons/ai'
import { MdRestaurantMenu } from 'react-icons/md'
import { IoIosPaper } from 'react-icons/io'
import { FaStore } from 'react-icons/fa'

export const SidebarData = [
  {
    title: 'Dashboard',
    icon: <AiFillHome />,
    path: '/dashboard',
    className: 'sidebar-text',
  },
  {
    title: 'Restaurant Center',
    icon: <FaStore />,
    path: '/dashboard/restaurant',
    className: 'sidebar-text',
  },
  {
    title: 'Restaurant Menu',
    icon: <MdRestaurantMenu />,
    path: '/dashboard/menu',
    className: 'sidebar-text',
  },
  {
    title: 'Restaurant Command',
    icon: <IoIosPaper />,
    path: '/dashboard/command',
    className: 'sidebar-text',
  },
]
