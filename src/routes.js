import DashView from './components/Dash'
import LoginView from './components/Login'
import UserTable from './components/dash/UserTable'
import GroupTable from './components/dash/GroupTable'

const routes = [{
	path: '/group',
	component: DashView,
	alias: '/',
	auth: true,
	children: [{
		path: '/dash',
		component: UserTable
	},{
		path: '/group',
		component: GroupTable
	}]
}]

export default routes