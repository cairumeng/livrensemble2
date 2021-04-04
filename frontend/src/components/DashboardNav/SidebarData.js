import { AiFillHome, AiOutlineTags } from 'react-icons/ai'
import { MdRestaurantMenu } from 'react-icons/md'
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
    title: 'Restaurant Menu',
    icon: <MdRestaurantMenu />,
    path: '/dashboard/menus',
    className: 'sidebar-text',
  },
  {
    title: 'Restaurant Command',
    icon: <IoIosPaper />,
    path: '/dashboard/restaurant-commands',
    className: 'sidebar-text',
  },
]

export default SidebarData
