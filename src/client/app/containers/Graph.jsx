import React, { Component } from 'react';
import * as d3 from 'd3';
import { timeParse, timeFormat } from 'd3-time-format';
import { linearRegression, linearRegressionLine } from 'simple-statistics';
// import moment from 'moment-timezone';
import { prettyPrint } from '../helpers.js';
// import { timezone } from '../constants.js';

class Graph extends Component {
	constructor() {
		super();

		this.state = {
			width: 800,
			height: 260,
			margin: {
				top: 10,
				bottom: 60,
				left: 40,
				right: 10
			}
		}

		this.addLineGraph = this.addLineGraph.bind(this);
		this.addRegressionLine = this.addRegressionLine.bind(this);
		this.findRegressionData = this.findRegressionData.bind(this);
		this.initGraph = this.initGraph.bind(this);
	}

	componentDidMount() {
		this.initGraph();
	}

	formatTime(timestamp) {
		let parseTime = d3.timeParse('%b-%d-%Y-%H');

		let date = new Date(parseInt(timestamp));
		let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		let day = date.getDate();
		let month = months[date.getMonth()];
		let year = date.getFullYear();
		let hours = date.getHours();

		return parseTime(`${ month }-${ day }-${ year }-${ hours }`);
	}

	addRegressionLine(group, regressionData, line) {
		let props = this.props;

		group.append('path')
			.data([regressionData])
			.attr('class', `${ props.category }-regression regression`)
			.attr('d', line);
	}

	addLineGraph(group, data, line) {
		let props = this.props;

		group.append('path')
			.data([data])
			.attr('class', `${ props.category }-line standard-line`)
			.attr('d', line);
	}

	addScatterPlotPoints(group, data, x, y) {
		let props = this.props;

	  group.selectAll('.point')
	  	.data(data)
	  	.enter().append('circle')
	  	.attr('class', `${ props.category }-point data-point`)
	  	.attr('r', 1.75)
	  	.attr('cy', d => y(d.rating))
	  	.attr('cx', d => x(d.timestamp))
	}

	addLeftAxis(group, y) {
		group.append('g')
		  .call(d3.axisLeft(y).ticks(5, 'd'))
   		.append('text')
   		.attr('fill', '#333')
   		.attr('transform', 'rotate(-90)')
   		.attr('y', 0)
   		.attr('dy', '-25px')
   		.attr('dx', '-95px')
   		.attr('text-anchor', 'middle')
   		.text("Rating");
	}

	addBottomAxis(group, target, x, innerHeight, innerWidth) {
		let axisDateFormat = d3.timeFormat('%d %b');

		group.append('g')
			.attr('class', 'xaxis')
		  .attr("transform", `translate(0,${ innerHeight })`)
   		.call(d3.axisBottom(x).tickFormat(axisDateFormat));

    target.selectAll('.xaxis text')
      .attr('transform', function(d) {
      	let bBoxHeight = this.getBBox().height;
				return `translate(${ bBoxHeight * -2 },${ bBoxHeight })rotate(-45)`;
      });

		target.append('text')
      .attr('text-anchor', 'middle')
			.attr('transform', `translate(${ (innerWidth + 50)/2 },${ innerHeight + 60 })`)  // centre below axis
			.text("Date");
	}

	filterUniqueData(data) {
		let uniqueDict = {};
		let uniqueData = [];

		for (let dataNum = data.length, i = 0; i < dataNum; i++) {
			let record = data[i];
			if (!uniqueDict[record.timestamp]) {
				uniqueDict[record.timestamp] = [record.rating];
				uniqueData.push(record);
			} else if (uniqueDict[record.timestamp].indexOf(record.rating) === -1) {
				uniqueDict[record.timestamp] = uniqueDict[record.timestamp].concat([record.rating]);
				uniqueData.push(record);
			}
		}

		return uniqueData;
	}

	findLinearRegression(data) {
		let dataset = data.map(elm => {
			return [elm.origTimestamp, elm.rating];
		})

		return linearRegressionLine(linearRegression(dataset));
	}

	findRegressionData(data, x) {
		let regressionLine = this.findLinearRegression(data);
		let regressionData = x.domain().map(xVal => {
			return {
				timestamp: new Date(xVal),
				rating: regressionLine(+xVal)
			}
		})

		return regressionData;
	}

	initGraph() {
		let props = this.props;
		let state = this.state;
		let margin = state.margin;

		let innerWidth = state.width - margin.left - margin.right;
		let innerHeight = state.height - margin.top - margin.bottom;

		// First, format the time from the data into something that D3 can read, as a day
		// Then, use the day format to filter only unique values
		let data = props.data.map(elm => {
			return {
				rating: parseInt(elm.rating),
				origTimestamp: parseInt(elm.timestamp),
				timestamp: this.formatTime(elm.timestamp)
			}
		})

		data = this.filterUniqueData(data);

		let target = d3.select(`#${ props.category }-line`);

		let x = d3.scaleTime().rangeRound([0, innerWidth]);
		let y = d3.scaleLinear().rangeRound([innerHeight, 0]);

		let line = d3.line()
			.x(data => x(data.timestamp))
			.y(data => y(data.rating))

		x.domain(d3.extent(data, elm => elm.timestamp));
		y.domain([0,5]);

		let regressionData = this.findRegressionData(data, x);

		let group = target.append('g')
	    .attr('transform', `translate(${ margin.left },${ margin.top })`);

		this.addLineGraph(group, data, line)
		this.addRegressionLine(group, regressionData, line);
		this.addScatterPlotPoints(group, data, x, y);
		this.addLeftAxis(group, y);
   	this.addBottomAxis(group, target, x, innerHeight, innerWidth);
	}

	render() {
		let props = this.props;
		let state = this.state;
		return(
			<div>
				<h2 className="text-center">{ prettyPrint(props.category) }</h2>
				<svg
					id={ `${ props.category }-line` }
					width={ state.width }
					height={ state.height }
					className={ `${ props.type}-graph` }>
				</svg>
			</div>
		)
	}
}

export default Graph;