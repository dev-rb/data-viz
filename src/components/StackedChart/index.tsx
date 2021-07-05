import { axisBottom, axisLeft, max, scaleBand, scaleLinear, select, stack } from 'd3';
import * as React from 'react';
import useResizeObserver from '../../hooks/useResizeObserver';

interface Props {
    data: d3.DSVParsedArray<object> | undefined
}

const colors: { [key: string]: string } = {
    "MALE": "#fa4f9a",
    "FEMALE": "#938548",
    "ETHCTY": "#460a36",
    "NM": "#41ab4f",
    "CNT": "#e7e680",
    "RNK": "#7ebdd7"
}

const StackedChart = ({ data }: Props) => {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const dimensions = useResizeObserver(wrapperRef);

    React.useEffect(() => {
        if (!data) {
            return;
        }
        if (dimensions && wrapperRef.current) {
            const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
            let margin = { top: 20, bottom: 20, left: 40, right: 20 };

            const svg = select(svgRef.current);
            svg.attr("width", width - margin.left - margin.right).attr("height", height - margin.top - margin.bottom).style("background", "transparent");
            const svgWidth = +svg.attr("width");
            const svgHeight = +svg.attr("height");
            const stackGenerator = stack().keys(data.columns);
            const layers = stackGenerator(data.map((val, index) => val as unknown as { [key: string]: number }));
            const extent = [0, max(layers, (layer) => max(layer, (seq) => seq.data[data.columns[2]]))] as unknown as Iterable<number>;
            let maxVal = max(data, (d) => parseInt(d[data.columns[4] as any]!))!;

            const xScale = scaleBand()
                .domain(data.map((val, index) => val[data.columns[0] as any]!))
                .range([0, svgWidth - margin.left - margin.right])
                .padding(0.5);

            const yScale = scaleLinear()
                .domain([0, maxVal])
                .range([svgHeight, 0]);


            const xAxis = axisBottom(xScale) as any;
            const yAxis = axisLeft(yScale) as any;

            const filler = svg.select(".filler")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

            filler.select(".x-axis")
                .style("transform", `translateY(${svgHeight - margin.top - margin.bottom}px)`)
                .call(xAxis);
            filler.select(".y-axis")
                .call(yAxis);

            filler.selectAll(".layer")
                .data(layers)
                .join("g")
                .attr("class", "layer")

                .selectAll("rect")
                .data((layer) => layer)
                .join("rect")
                .attr("fill", (seq) => {
                    // console.log(seq.data[data.columns[1]]);
                    return colors[seq.data[data.columns[1]]];
                })
                .attr("x", (seq) => xScale(seq.data[data.columns[0]].toString()) || 0)
                .attr("width", xScale.bandwidth())
                .attr("y", (seq) => yScale(seq[1]))
                .attr("height", (seq) => {

                    return seq.data[data.columns[4]];
                });


        }
    }, [data, dimensions])

    return (
        <div id="wrapper" ref={wrapperRef} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg ref={svgRef}>
                <text className="title"></text>
                <g className="filler">
                    <g className="x-axis" />
                    <g className="y-axis" />
                </g>

            </svg>
        </div>
    );
}

export default StackedChart;