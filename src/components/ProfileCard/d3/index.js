import * as d3 from "d3";

const LINEAR_GRADIENT_ID = "graph-gradient";

const margins = { top: 10, right: 30, bottom: 30, left: 50 };
const width = 330 - (margins.left + margins.right);
const height = 210 - (margins.top + margins.bottom);

const getFormattedData = (data) =>
  data.map((i, index) => ({
    id: index + 1,
    date: d3.timeParse("%d-%m-%Y")(i.date),
    value: i.value,
  }));

const condition = (classes1, classes2, t) => (t ? classes1 : classes2);

function d3graph(data, toggleTheme) {
  const formattedData = getFormattedData(data);

  const x = d3
    .scaleTime()
    .domain(d3.extent(formattedData, (i) => i.date))
    .range([0, width]);

  const x2 = d3
    .scaleTime()
    .domain([0, d3.max(formattedData, (i) => i.date)])
    .range([0, width]);

  const x1 = d3.scaleTime().domain(0).range(0);

  const y = d3
    .scaleLinear()
    .domain(d3.extent(formattedData, (data) => +data.value))
    .range([height, 0]);

  const tooltip = d3
    .select(".graph-container")
    .append("div")
    .style("opacity", "0")
    .attr(
      "class",
      `tooltip ${condition(
        "bg-dark-100 text-white border-dark-100",
        "bg-white text-black-100 border-light",
        toggleTheme
      )}`
    );

  const tooltipDown = d3
    .select(".graph-container")
    .append("div")
    .style("opacity", "0")
    .attr(
      "class",
      `triangle-down bg-transparent ${condition(
        "triangle-down-light",
        "triangle-down-dark",
        toggleTheme
      )}`
    );

  const handleMouseOver = (event, data) => {
    tooltip
      .html(data.value)
      .style("top", event.pageY - 70 + "px")
      .style("left", event.pageX - 20 + "px")
      .style("opacity", "1");
    tooltipDown
      .style("top", event.pageY - 29 + "px")
      .style("left", event.pageX - 10 + "px")
      .style("opacity", "1");
  };

  const handleMouseLeave = () => {
    tooltip.transition().duration(300).style("opacity", "0");

    tooltipDown.transition().duration(300).style("opacity", "0");
  };

  const svgMain = d3.select("#rounds-graph");
  svgMain.selectAll("*").remove();

  const defs = svgMain
    .append("defs")
    .append("linearGradient")
    .attr("id", LINEAR_GRADIENT_ID)
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "100%");
  defs
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#007AFF")
    .attr("stop-opacity", "0.5");
  defs
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", condition("#FFFFFF", "#007AFF", toggleTheme))
    .attr("stop-opacity", "0.0");

  const svg = svgMain
    .append("g")
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

  svg
    .append("g")
    .attr("transform", "translate(-5,0)")
    .attr("stroke", condition("", "#46555F", toggleTheme))
    .call(d3.axisLeft(y).scale(y).ticks(5).tickSize(0).tickPadding([10]))
    .call((g) => g.select(".domain").remove())
    .selectAll("line")
    .data(formattedData)
    .attr("x1", (d) => x1(d.date))
    .attr("x2", (d) => x2(d.date))
    .style("stroke", condition("#DADEE2", "#46555F", toggleTheme))
    .style("stroke-width", "1px")
    .style("stroke-dasharray", "5,5");

  svg
    .append("path")
    .datum(formattedData)
    .attr("class", "fill-area")
    .attr("fill", "url(#" + LINEAR_GRADIENT_ID + ")")
    .attr("stroke", "#69b3a2")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .area()
        .x((d) => x(d.date))
        .y0(height)
        .y1((d) => y(d.value))
    );

  svg
    .append("path")
    .datum(formattedData)
    .attr("fill", "none")
    .attr("stroke", "#007AFF")
    .attr("stroke-width", 1)
    .attr(
      "d",
      d3
        .line()
        .x((d) => x(d.date))
        .y((d) => y(d.value))
    );

  const circles = svg
    .selectAll("circles")
    .data(formattedData)
    .enter()
    .append("circle")
    .attr("id", (d) => "circle-" + d.id)
    .attr("fill", "#FFFFFF")
    .attr("stroke", "#007AFF")
    .attr("cx", (d) => x(d.date))
    .attr("cy", (d) => y(d.value))
    .attr("r", 6)
    .style("cursor", "pointer");

  circles.on("mouseover", handleMouseOver).on("mouseleave", handleMouseLeave);
}

export default d3graph;
