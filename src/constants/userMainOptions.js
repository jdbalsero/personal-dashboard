import { FaTasks } from 'react-icons/fa';
import { TiWeatherPartlySunny } from "react-icons/ti";
import { IoNewspaperSharp } from "react-icons/io5";
import { NewsPage } from '../pages/userContent/news';
import { WeatherPage} from '../pages/userContent/weather';
import { TasksPage } from '../pages/userContent/tasks';

const userMainOptions = [
    { name: 'Weather', component: <WeatherPage/>  ,icon: <TiWeatherPartlySunny/>, show: true },
    { name: 'News', component: <NewsPage/>  ,icon: <IoNewspaperSharp />, show: true },
    { name: 'Tasks', component: <TasksPage />, icon: <FaTasks />, show: true },
];

export { userMainOptions };