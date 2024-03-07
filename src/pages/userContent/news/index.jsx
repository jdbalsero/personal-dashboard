import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { ContentHeader } from '../../../components/Shared/ContentHeader'
import { TableNews } from './TableNews';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './news.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function NewsPage() {
    const Categories = ['General', 'World', 'Business', 'Entertainment', 'Science', 'Sports', 'Health', 'Technology'];
    const { setActiveBlur } = useContext(GlobalContext);
    const [news, setNews] = useState([])
    const [value, setValue] = React.useState(Categories[0]);
    const [inputValue, setInputValue] = React.useState('');

    const showNews = async (category=null) => {
        const API_BASE_URL = category === null ? 
        `https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=${process.env.REACT_APP_GNEWSAPI_KEY}`
        : `https://gnews.io/api/v4/top-headlines?lang=en&category=${category}&apikey=${process.env.REACT_APP_GNEWSAPI_KEY}`;
        try {
            const response = await fetch(API_BASE_URL).then(response => {
              return response;
            });
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            let data = await response.json();
            setNews(data.articles);
        } catch (error) {
            console.error(error);
            setActiveBlur(true);
            MySwal.fire({
                icon: 'error',
                title: 'Oops ...',
                text: 'There was an error searching news, please check your filter selection and try again.',
                showConfirmButton: false,
                timer: 1700,
                backdrop: true,
                customClass: {
                    popup: 'popup-sweet',
                    title: 'title-sweet',
                    htmlContainer: 'text-sweet',
                    confirmButton: 'confirm-button-sweet',
                    denyButton: 'deny-button-sweet',
                }
            }).finally(() => {setActiveBlur(false)});
        }
      }

    useEffect(() => {
        showNews();
    }, [])

    return <div className="data-news-container">
        <ContentHeader text="News" />
        <div className="search-section">
            <Autocomplete
                disablePortal
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    showNews(String(newValue).toLowerCase());
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                className='input-search'
                options={Categories}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="News Category" />}
            />
        </div>
        <TableNews data={news} fetchData={showNews} />
    </div>
}

export { NewsPage }