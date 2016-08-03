import React from 'react';

export const BarChart = React.createClass({
    render() {
        return <div>
            <div></div>
            <svg ref={c => this._svg = c}></svg>
        </div>
    },
    shouldComponentUpdate(nextProps) {
        return nextProps.data.length > 0;
    },
    componentWillUpdate(nextProps) {
        var width = 500;
        var height = 300;
        var barWidth = width /nextProps.data.length;
        var scale = d3.scaleLinear()
            .range([0, height])
            .domain([0, d3.max(nextProps.data, d => d.value)]);
        var bar = d3
            .select(this._svg)
            .attr('width', width)
            .attr('height', height)
            .selectAll('g')
            .data(nextProps.data)
            .enter()
            .append('g')
            .attr('transform', (d, i) => 'translate(' + i * barWidth + ', 0)');
        bar
            .append('rect')
            .attr('fill', function(d) {
                return 'rgb(0, 0, ' + (d.value * 10) + ')';
            })
            .attr('y', function(d) { return height - scale(d.value);})
            .attr('x', 0)
            .attr('width', 20)
            .attr('height', function(d) { return scale(d.value) });

        bar
            .append('text')
            .attr('fill', 'white')
            .attr('x', 0)
            .attr('y', height)
            .attr('transform', 'rotate(-90, 0 ,' + 300 + ')')
            .attr('dy', 15)
            .attr('dx', 10)
            //.attr('text-anchor', 'middle')
            .text(function (d) { return d.option });
    }
});

export const PieChart = React.createClass({
    render() {
        return <div>
            <div>Votes sum: {this.dataSum}</div>
            <div className="chart" ref={c => this._chart = c}>
            <svg ref={c => this._svg = c}></svg>
        </div></div>;
    },
    shouldComponentUpdate(nextProps) {
        return typeof (nextProps.data) !== 'undefined';
    },
    componentWillUpdate(nextProps) {
        if(nextProps.data.length === 0) {
            this.dataSum = 'no votes yet';
            d3.select(this._svg)
                .html('');

            return;
        }

        var tooltip = d3.select(this._chart)
            .append('div')
            .attr('class', 'chart-tooltip');

        tooltip.append('div')
            .attr('class', 'chart-label');

        tooltip.append('div')
            .attr('class', 'chart-count');

        tooltip.append('div')
            .attr('class', 'chart-percent');
        var width = 560;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var color = d3.scaleOrdinal(d3.schemeCategory20b);
        var svg = d3.select(this._svg)
            .html("")
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (height / 2) +  ',' + (height / 2) + ')');
        var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);
        var pie = d3.pie()
            .value(function(d) { return d.value; })
            .sort(null);
        var pieData = pie(nextProps.data);
        this.dataSum = pieData.reduce((acc, next) => acc + next.value, 0);
        var path = svg.selectAll('path')
            .data(pieData)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) {
                return color(d.data.option);
            });

        path.on('mouseover', function(d) {
            var total = d3.sum(nextProps.data.map(function(d) {
                return d.value;
            }));
            var percent = Math.round(1000 * d.data.value / total) / 10;
            tooltip.select('.chart-label').html(d.data.option);
            tooltip.select('.chart-count').html(d.data.value);
            tooltip.select('.chart-percent').html(percent + '%');
            tooltip.style('display', 'block');
        });

        path.on('mouseout', function(d) {
            tooltip.style('display', 'none');
        });

        var legendRectSize = 18;
        var legendSpacing = 4;
        var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
                var legendHeight = legendRectSize + legendSpacing;
                var offset =  legendHeight * color.domain().length / 2;
                var horz = height / 2 + legendSpacing;
                var vert = i * legendHeight - offset;
                return 'translate(' + horz + ',' + vert + ')';
            });

        legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color)
            .style('stroke', color);
        legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) {
                return d.toUpperCase() + ' ' + nextProps.data.filter(data => data.option === d).pop().value;
            });
    }
});