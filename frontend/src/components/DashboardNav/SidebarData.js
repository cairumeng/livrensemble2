import { AiFillHome, AiOutlineTags, AiOutlineFileDone } from 'react-icons/ai'
import { MdRestaurantMenu, MdFiberNew } from 'react-icons/md'
import { IoIosPaper } from 'react-icons/io'
import { FaStore } from 'react-icons/fa'

const SidebarData = [
  {
    title: 'Dashboard',
    icon: <AiFillHome />,
    path: '/dashboard',
    className: 'sidebar-text',
  },
  {
    title: 'Restaurant Center',
    icon: <FaStore />,
    path: '/dashboard/restaurants',
    className: 'sidebar-text',
  },
  {
    title: 'Dish Category',
    icon: <AiOutlineTags />,
    path: '/dashboard/dish-categories',
    className: 'sidebar-text',
  },
  {
    title: 'Menu',
    icon: <MdRestaurantMenu />,
    path: '/dashboard/menus',
    className: 'sidebar-text',
  },
  {
    title: 'Commands to deal',
    icon: <MdFiberNew />,
    path: '/dashboard/restaurant-new-commands',
    className: 'sidebar-text',
  },
  {
    title: 'Past commands',
    icon: <AiOutlineFileDone />,
    path: '/dashboard/restaurant-old-commands',
    className: 'sidebar-text',
  },

  {
    title: 'All commands',
    icon: <IoIosPaper />,
    path: '/dashboard/restaurant-commands',
    className: 'sidebar-text',
  },
]

export default SidebarData
