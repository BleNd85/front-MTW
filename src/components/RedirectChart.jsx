import {Bar} from "react-chartjs-2";

export default function RedirectChart({getChartData, timeUnit, getMaxTicksLimit}) {
    return (
        <div style={{width: "80%", margin: "0 auto"}}>
            <Bar
                data={getChartData()}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "top",
                            labels: {
                                font: {
                                    size: 14,
                                },
                            },
                        },
                        title: {
                            display: true,
                            text: `Redirects per ${timeUnit.charAt(0).toUpperCase() + timeUnit.slice(1)}`,
                            font: {
                                size: 18,
                            },
                        },
                    },
                    scales: {
                        x: {
                            ticks: {
                                maxRotation: 0,
                                minRotation: 0,
                                font: {
                                    size: 12,
                                },
                            },
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            ticks: {
                                maxTicksLimit: getMaxTicksLimit(),
                                font: {
                                    size: 12,
                                },
                            },
                            grid: {
                                borderDash: [5, 5],
                            },
                        },
                    },
                    animation: {
                        duration: 500,
                        easing: "easeInOutExpo",
                    },
                }}
            />
        </div>
    )
}