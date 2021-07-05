import * as React from 'react';
import { axisBottom, axisLeft, scaleBand, scaleLinear, select, max } from 'd3';
import useResizeObserver from '../../hooks/useResizeObserver';

/*

BarChart Changeable Settings:
    - Title
    - X axis values
    - Y axis values
    - Chart colors: background, bar colors, axis colors
*/

export interface BarChartColorPalette {
    background: string,
    barColors: string,
    xAxisColor: string,
    yAxisColor: string,
    titleColor: string
}

export interface BarChartSettings {
    title: string,
    xAxis: number,
    yAxis: number,
    colors: BarChartColorPalette
}


interface Props {
    data: d3.DSVRowArray | undefined
}

const BarChart = ({ data }: Props) => {

    const svgRef = React.useRef<SVGSVGElement>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    const [settings, setSettings] = React.useState<BarChartSettings>({ title: "Barchart", xAxis: 0, yAxis: 4, colors: { background: "white", barColors: "green", xAxisColor: "black", yAxisColor: "black", titleColor: "black" } });

    const dimensions = useResizeObserver(wrapperRef);

    React.useEffect(() => {
        if (!dimensions) {
            return;
        }

        if (data === undefined) {
            return;
        }

        if (data && svgRef.current) {
            let margin = { top: 20, bottom: 20, left: 40, right: 20 };

            const svg = select(svgRef.current);
            svg.attr("width", dimensions.width - margin.left - margin.right).attr("height", dimensions.height - margin.top - margin.bottom).style("background", settings.colors.background);
            const width = +svg.attr("width");
            const height = +svg.attr("height");
            const xScale = scaleBand()
                .domain(data.map((val, index) => val[data.columns[settings.xAxis] as any]!))
                .range([0, width - margin.left - margin.right])
                .padding(0.5);
            let maxVal = max(data, (d) => parseInt(d[data.columns[settings.yAxis] as any]!))!;
            const yScale = scaleLinear()
                .domain([0, maxVal])
                .range([height - margin.top - margin.bottom, 0]);

            const xAxis = axisBottom(xScale).ticks(data.length) as any;

            const filler = svg.select(".filler")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

            filler.select(".x-axis")
                .style("transform", `translateY(${height - margin.top - margin.bottom}px)`)
                .call(xAxis);
            // .selectAll("text")
            // .style("text-anchor", "end")
            // .attr("dx", "-0.8em")
            // .attr("dy", ".15em")
            // .attr("transform", "rotate(-65)")
            // .style("font-size", "0.4rem");
            filler.select(".x-axis")
                .selectAll(".domain")
                .attr("stroke", settings.colors.xAxisColor);
            filler.select(".x-axis")
                .selectAll("line")
                .attr("stroke", settings.colors.xAxisColor);
            filler.select(".x-axis")
                .selectAll("text")
                .attr("fill", settings.colors.xAxisColor);


            const yAxis = axisLeft(yScale) as any;

            filler.select(".y-axis")
                .call(yAxis);

            filler.select(".y-axis")
                .selectAll(".domain")
                .attr("stroke", settings.colors.yAxisColor);
            filler.select(".y-axis")
                .selectAll("line")
                .attr("stroke", settings.colors.yAxisColor);
            filler.select(".y-axis")
                .selectAll("text")
                .attr("fill", settings.colors.yAxisColor);


            filler.selectAll(".bar")
                .data(data)
                .join("rect")
                .attr("class", "bar")
                .style("transform", "scale(1, -1)")
                .attr("fill", settings.colors.barColors)
                .attr("x", (val, index) => xScale(val[data.columns[settings.xAxis] as any]!.toString()) || 0)
                .attr("y", -(height - margin.top - margin.bottom))
                .attr("width", xScale.bandwidth())
                .attr("height", (val, index) => (height - margin.top - margin.bottom) - yScale(parseInt(val[data.columns[settings.yAxis] as any]!)));

            svg.select(".title")
                .attr("x", width / 2)
                .attr("y", 20)
                .attr("text-anchor", "middle")
                .style("font-size", "1.5rem")
                .style("text-decoration", "underline")
                .attr("fill", settings.colors.titleColor)
                .text(settings.title);
        }


    }, [svgRef, data, dimensions])

    return (
        <div id="wrapper" ref={wrapperRef} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg ref={svgRef}>
                <text className="title"></text>
                <g className="filler" >
                    <g className="x-axis" />
                    <g className="y-axis" />
                </g>

            </svg>
        </div>
    );
}

export default BarChart;