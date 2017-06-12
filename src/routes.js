import DashView from './components/Dash'
import LoginView from './components/Login'
import UserTable from './components/dash/UserTable'
import GroupTable from './components/dash/GroupTable'
import Report from './components/dash/Report'
import List from './components/dash/List'
import ReportDB from './components/dash/ReportDB'


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
	},{
		path: '/list',
		component: List
	},{
		path: '/reportDB',
		component: ReportDB
	}]
}]

export default routes