import * as d3 from 'd3';

const url = "https://api.github.com/repositories/19438/issues";
const drawPieChart = (canvas) => {
    const svgCanvas = d3.select(canvas.current);

    //Rendering the actual piechart
    const renderPie = data => {
        const padding = {
            top: 20,
            bottom: 20,
            right: 20,
            left: 80
        };
        const chartArea = {
            width: 900 - padding.left - padding.right,
            height: 500 - padding.bottom - padding.top
        };
        const radius = Math.min(chartArea.width, chartArea.height) / 2;

        //Generate different colors for each pie
        const colorRange = data.map((d, i) => {
            return d3.interpolatePlasma(i / data.length);
        })
        const colors = d3.scaleOrdinal()
            .domain(data)
            .range(colorRange)

        //Generates startAngle and stopAngle of pie for each data
        const pie = d3.pie()
            .sort(null)
            .value(d => d.comments)
            (data);

        //Generates arc data
        const segments = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)

        //Starts pie rendering
        svgCanvas.append('g')
            .attr("transform", `translate(${chartArea.height / 2 + padding.left},${chartArea.height / 2 + padding.top})`)
            .selectAll("path").data(pie)
            .enter().append("path")
            //Animation
            .transition().delay(function (d, i) {
                return i * 200;
            }).duration(200)
            .attrTween('d', function (d) {
                var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
                return function (t) {
                    d.endAngle = i(t);
                    return segments(d)
                }
            })
            //Styling
            .attr("fill", (d) => colors(d.index))
            .attr("stroke", "white")
            .attr("stroke-width", "0.5px")
            .style("opacity", 1)


        //Adding value labels
        d3.select("g")
            .selectAll("text").data(pie)
            .enter().append('text')
            .each(function (d) {
                const center = d3.arc().innerRadius(0).outerRadius(400).centroid(d);
                d3.select(this)
                    .attr("x", center[0])
                    .attr("y", center[1])
                    .text(d.data.comments)
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 13)
                    .attr("text-anchor", "middle")
                    .attr("font-weight", "bold")
                    .attr("fill", "white")
            })

        //Adding legends to show the colors used for different issue no.
        const legends = svgCanvas.append('g')
            .attr("transform", `translate(${chartArea.width - padding.left},0)`)
            .selectAll(".legends").data(pie);

        const legend = legends.enter().append("g")
            .classed("legends", true)
            .attr("transform", (d, i) => `translate(0,${(i + 1) * 22})`);
        //legend color box
        legend.append("rect")
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", (d) => colors(d.index));
        //legend text
        legend.append("text")
            .text((d) => d.data.issue_number)
            .attr("fill", (d) => colors(d.index))
            .attr("x", 25)
            .attr("y", 15)
            .attr("font-size", 15)
            .attr("font-weight", "bold")

        svgCanvas.append("text")
            .attr("transform", `translate(${chartArea.width / 2 - padding.left},${(chartArea.height + 3 * padding.top)})`)
            .style("text-anchor", "middle")
            .attr("fill", "gray")
            .text("Comments");

        svgCanvas.append("text")
            .attr("transform", `translate(${chartArea.width - 3 * padding.right},${(chartArea.height + 3 * padding.top)})`)
            .style("text-anchor", "middle")
            .attr("fill", "gray")
            .text("Issue Numbers");
    }

    //fetcing data
    d3.json(url).then(data => {
        //Extract only issue no. and comments
        let newData = data.map((val) => {
            const d = {
                "issue_number": val["number"],
                "comments": val["comments"]
            }
            return d;
        });
        //Filter all issues with 0 comments
        newData = newData.filter((d) => {
            return d.comments > 0;
        });
        const orderedData = newData.reverse();
        // console.log(orderedData)
        renderPie(orderedData);
    }).catch(err => console.log("Error fetching data.. "+err))
}

export default drawPieChart;