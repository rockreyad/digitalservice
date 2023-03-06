import { Icon } from '@chakra-ui/react'
import {
    MdBarChart,
    MdPerson,
    MdHome,
    MdLock,
    MdOutlineShoppingCart,
} from 'react-icons/md'

// Admin Imports
// import MainDashboard from "../app/admin/page";
// import Order from "../app/admin/order/page";

// Auth Imports
import { IRoute } from 'types/navigation'

const routes: IRoute[] = [
    {
        name: 'Main Dashboard',
        path: '/',
        icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
        component: 'MainDashboard',
    },
    {
        name: 'Orders',
        path: '/order',
        icon: (
            <Icon
                as={MdOutlineShoppingCart}
                width="20px"
                height="20px"
                color="inherit"
            />
        ),
        component: 'Order',
        secondary: true,
    },
    {
        name: 'Data Tables',
        icon: (
            <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />
        ),
        path: '/data-tables',
        component: 'DataTables',
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
        component: 'Profile',
    },
    {
        name: 'Sign In',
        path: '/login',
        icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
        component: 'SignInCentered',
    },
]

export default routes
