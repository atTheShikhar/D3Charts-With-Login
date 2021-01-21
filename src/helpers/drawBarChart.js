import * as d3 from 'd3';

const url = "https://api.github.com/repositories/19438/issues";

const drawBarChart = (canvas) => {
    //Selects the canvas
    const svgCanvas = d3.select(canvas.current)

    //Renders the actual data
    const renderChart = data => {
        const padding = {
            top: 20,
            right: 20,
            bottom: 70,
            left: 60
        }
        const chartArea = {
            width: 1000 - padding.left - padding.right,
            height: 400 - padding.top - padding.bottom
        }

        //Y Scale
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, (d, i) => d["comments"])])
            .range([chartArea.height, 0]).nice();
        svgCanvas.append("g")
            .attr("transform", `translate(${padding.left},${padding.top})`)
            .call(d3.axisLeft(yScale))
        svgCanvas.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("x", 0 - (chartArea.height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .attr("fill", "gray")
            .text("Comments");


        //X scale
        const xScale = d3.scaleBand()
            .domain(data.map((d) => d["created_at"]))
            .range([0, chartArea.width])
            .padding(.1);
        svgCanvas.append("g")
            .attr(
                'transform', `translate(${padding.left},${chartArea.height + padding.top})`
            )
            .call(d3.axisBottom(xScale)).selectAll("text")
            .style('text-anchor', 'end')
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");
        svgCanvas.append("text")
            .attr("transform", "translate(" + (chartArea.width / 2) + " ," + (chartArea.height + padding.top + 80) + ")")
            .style("text-anchor", "middle")
            .attr("fill", "gray")
            .text("Date");

        //Uncomment this for grid
        // svgCanvas.append("g")
        //     .attr("class","grid")
        //     .attr(
        //         "transform",`translate(${padding.left},${padding.top})`
        //     ).style("border-color","red")
        //     .call(d3.axisLeft(yScale)
        //             .tickSize(-(chartArea.width))
        //             .tickFormat("")
        //             )

        //Gradient
        const defs = svgCanvas.append('defs');
        const bgGradient = defs.append('linearGradient')
            .attr('id', 'bg-gradient')
            .attr('gradientTransform', 'rotate(90)');

        bgGradient.append('stop')
            .attr('stop-color', '#00EAF9')
            .attr('offset', '0%');

        bgGradient.append('stop')
            .attr('stop-color', '#0028AF')
            .attr('offset', '100%');

        svgCanvas.selectAll("rect")
            .data(data)
            .enter().append("rect")
            .attr("x", d => xScale(d.created_at) + padding.left)
            .attr("width", xScale.bandwidth())
            //Starting at 0
            .attr("y", d => yScale(0) + padding.top)
            .attr("height", d => chartArea.height - yScale(0))
            .style("fill", "url(#bg-gradient)")

        //Animation
        svgCanvas.selectAll("rect")
            .transition()
            .duration(400)
            //Grow to the normal size
            .attr("y", function (d) { return yScale(d.comments) + padding.top; })
            .attr("height", function (d) { return chartArea.height - yScale(d.comments); })
            .delay(function (d, i) { return (i * 100) })
    }

    // Fetcing and parsing the required data
    d3.json(url).then(data => {
        const newData = data.map((val) => {
            const d = {
                "created_at": val["created_at"].substring(0, 10),
                "comments": val["comments"]
            }
            return d;
        });
        const orderedData = newData.reverse()
        // console.log(orderedData)
        renderChart(orderedData);
    }).catch(err => console.log("Error fetching data..\n"+err));

}

export default drawBarChart;