const { innerWidth, innerHeight } = window;
const w = innerWidth * 0.7;
const h = innerHeight * 0.7;
const svg = d3
  .select(".heat")
  .append("svg")
  .attr("height", h)
  .attr("width", w);

const margin = 40;
const width = w - 2 * margin;
const height = h - 2 * margin;
const days = Array(30).fill(0).map((_, index) => index +1);
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const g = svg.append("g");

const yScale = d3
  .scaleBand()
  .range([0, height])
  .domain(months)
  .padding(0.15);

g.append("g")
  .attr("transform", `translate(${margin}, ${margin})`)
  .call(d3.axisLeft(yScale));

const xScale = d3
  .scaleBand()
  .range([0, width])
  .domain(days)
  .padding(0.1);

g.append("g")
  .attr("transform", `translate( ${margin}, ${height + margin})`)
  .call(d3.axisBottom(xScale));

const data = months.reduce(
  (all, month) => [...all, ...days.map(day => ({ month, day, color:Math.random()*50 }))],
  []
);

const sequentialScale = d3.scaleSequential()
        .domain([0, 50])
        .interpolator(d3.interpolateGnBu);


g.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", d => xScale(d.day) + margin)
  .attr("y", d => yScale(d.month) + margin)
  .attr("height", yScale.bandwidth())
  .attr("width", xScale.bandwidth())
  .attr("fill", "#111")
  .transition()
        .attr('fill', d => sequentialScale(d.color)).delay(500).duration(d => d.color * 100);
