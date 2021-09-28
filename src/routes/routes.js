import ItemsDashboard from '../components/ItemsDashboard/ItemsDashboard'

var ThemeRoutes = [
    {
        path: '/dashboard/items',
        name: 'Items',
        icon: 'mdi mdi-view-dashboard',
        component: ItemsDashboard
    },
    {
        path: '/dashboard/mealplan',
        name: 'MealPlans',
        icon: 'mdi mdi-hospital-building',
        component: ItemsDashboard
    }
];
export default ThemeRoutes;