import React,{useRef,useEffect} from 'react';
import drawPieChart from '../helpers/drawPieChart';

function PieDashboard(props) {
    const canvas = useRef(null);

    useEffect(() => {
        drawPieChart(canvas)
    }, [])

    return (
        <div className="h-screen bg-gray-50 flex flex-col font-body">
            <svg ref={canvas} className="bg-white m-auto shadow-md self-center rounded-md overflow-x-auto" style={{width: 900,height: 550}}>
            </svg>
        </div>
    )
}

export default PieDashboard
