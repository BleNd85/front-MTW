import useFetching from "../components/hooks/useFetching";
import URLService from "../api/URLService";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend} from "chart.js";
import Loader from "../components/ui/loader/Loader";
import InputButton from "../components/ui/button/InputButton";
import classes from "./style.module.css"
import RedirectChart from "../components/RedirectChart";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function LinkDetails() {
    const {short} = useParams();
    const [timestamps, setTimestamps] = useState([]);
    const [dailyClicks, setDailyClicks] = useState({});
    const [timeUnit, setTimeUnit] = useState('day');
    const [fetchTimestamps, isLoading, isError] = useFetching(async () => {
        const data = await URLService.getRedirects(short);
        setTimestamps(data);
    });

    useEffect(() => {
        if (short) {
            fetchTimestamps();
        }
    }, [short]);

    useEffect(() => {
        if (timestamps.length > 0) {
            aggregateClicksByTimeUnit();
        }
    }, [timestamps, timeUnit]);

    const aggregateClicksByTimeUnit = () => {
        const counts = timestamps.reduce((acc, timestamp) => {
            const date = new Date(timestamp);
            let timeKey;
            if (timeUnit === 'day') {
                timeKey = date.toISOString().split("T")[0];
            } else if (timeUnit === 'hour') {
                timeKey = `${date.toISOString().split("T")[0]} ${String(date.getHours()).padStart(2, '0')}:00`;
            } else if (timeUnit === 'minute') {
                timeKey = `${date.toISOString().split("T")[0]} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            }
            acc[timeKey] = (acc[timeKey] || 0) + 1;
            return acc;
        }, {});
        setDailyClicks(counts);
    };

    const getChartData = () => {
        const labels = Object.keys(dailyClicks);
        const data = Object.values(dailyClicks);

        return {
            labels,
            datasets: [
                {
                    label: `Redirects per ${timeUnit.charAt(0).toUpperCase() + timeUnit.slice(1)}`,
                    data,
                    backgroundColor: "rgba(255, 206, 86, 0.6)",
                    borderColor: "rgba(255, 206, 86, 1)",
                    borderWidth: 2,
                    borderRadius: 5,
                    hoverBackgroundColor: "rgba(255, 206, 86, 0.8)",
                },
            ],
        };
    };

    const handleTimeUnitChange = (unit) => {
        setTimeUnit(unit);
    };

    const getMaxTicksLimit = () => {
        if (timeUnit === 'hour') return 24;
        if (timeUnit === 'day') return 31;
        if (timeUnit === 'minute') return 60;
        return undefined;
    };

    return (
        <div className={"registration-page"}>
            {isLoading && <Loader/>}
            {isError && <p>Error loading data</p>}
            <div className={classes.linksCard}>
                {timestamps.length > 0 ? <>
                    <div className={classes.buttonContainer}>
                        <InputButton onClick={() => handleTimeUnitChange('day')}>Day</InputButton>
                        <InputButton onClick={() => handleTimeUnitChange('hour')}>Hour</InputButton>
                        <InputButton onClick={() => handleTimeUnitChange('minute')}>Minute</InputButton>
                    </div>
                    <RedirectChart
                        getChartData={getChartData}
                        timeUnit={timeUnit}
                        getMaxTicksLimit={getMaxTicksLimit}/>
                </> : <h2 style={{alignSelf: "center", justifySelf: "center"}}>No Redirects Yet</h2>}
            </div>
        </div>
    );
}
