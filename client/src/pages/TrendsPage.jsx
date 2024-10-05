import React, { useState, useEffect } from 'react';
import '../App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import LineChart from '../charts/LineChart';
import { Button } from '@mui/material';

function TrendsPage() {
    const location = useLocation();
    const sensorItem = location.state?.sensorItemProps;
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const GoToPageHome = () => { navigate('/') };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://`); 
                if (response.ok) {
                    const json = await response.json();
                    setData(json);
                } else {
                    console.error('Ошибка HTTP: ' + response.status);
                }
            } catch (error) {
                console.error('Ошибка при запросе:', error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
    }, [data])
  
    return (
        <div className='App-header'>
            <h3>           
                 {sensorItem.Station_name}
            </h3>
            <LineChart plcData={ data }/>
        </div>

    )
}
export default TrendsPage
