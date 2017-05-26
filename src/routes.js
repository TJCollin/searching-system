import DashView from './components/Dash'
import LoginView from './components/Login'
import UserTable from './components/dash/UserTable'
import GroupTable from './components/dash/GroupTable'
import Report from './components/dash/Report'


const routes = [{
	path: '/group',
	component: DashView,
	alias: '/',
	auth: true,
	children: [{
		path: '/user',
		component: UserTable
	},{
		path: '/group',
		component: GroupTable
	},{
		path: '/report',
		component: Report
	}]
}]

export default routes