import React,{useEffect, useRef} from 'react';
import drawBarChart from '../helpers/drawBarChart';

function ChartDashboard(props) {
    const canvas = useRef(null);

    useEffect(() => {
        drawBarChart(canvas);
    },[]);
    
    return (
        <div className="h-screen flex flex-col bg-gray-50 font-body">
            <svg ref={canvas} className="bg-white m-auto self-center rounded-md shadow-md overflow-x-auto" style={{height: 430,width: 1000}}>
            </svg>
        </div>
    );
}

export default ChartDashboard
