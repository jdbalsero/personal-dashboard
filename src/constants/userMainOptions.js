import PeopleIcon from '@mui/icons-material/People';
import { FaUserAstronaut, FaTasks } from 'react-icons/fa';
import { NewsPage } from '../pages/userContent/news';
import { WeatherPage} from '../pages/userContent/weather';
import { TasksPage } from '../pages/userContent/tasks';

const userMainOptions = [
    { name: 'Weather', component: <WeatherPage/>  ,icon: <PeopleIcon/>, show: true },
    { name: 'News', component: <NewsPage/>  ,icon: <FaUserAstronaut />, show: true },
    { name: 'Tasks', component: <TasksPage />, icon: <FaTasks />, show: true },
];

export { userMainOptions };