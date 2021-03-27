import { Link } from 'react-router-dom'

import SidebarData from './SidebarData'
import { AiOutlineClose } from 'react-icons/ai'
import './Sidebar.scss'

const Sidebar = ({ sidebar, setSidebar }) => (
  <>
    <nav className={sidebar ? 'sidebar-menu active' : 'sidebar-menu'}>
      <ul className="d-flex-column">
        <li className="sidebar-toggle mt-5 cursor-pointer">
          <AiOutlineClose onClick={() => setSidebar(!sidebar)} />
        </li>
        {SidebarData.map((item, index) => (
          <li className={item.className} key={index}>
            <Link to={item.path}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </>
)

export default Sidebar
