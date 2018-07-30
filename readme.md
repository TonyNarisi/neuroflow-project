# NeuroFlow Project

### How to Run

1. Download .zip and unzip, or pull down master branch of this repo.
2. In root of directory, run "npm install" from command line to install necessary packages.
3. In root of directory, run "npm run start" from command line to start local server and transpile React code via Babel. On first load, the transpiling will take several seconds.
4. Go to http://localhost:8080 in your browser to view the project.

### Overview

This project uses React as its JavaSript framework and SCSS as a CSS pre-processor. For a local server, it uses webpack-dev-server. For handling the data, the CSV files of the data were converted to JSON locally, via the csv-parse library in the convert_csv_to_json.js file in the project root, and stored in the app/data directory. It uses d3.js for the creation of the graphs, and uses the simple-statistics npm package for calculating the linear regression lines' formulas.

### Reasoning

The project provides a user a number of options for viewing their data:

##### 1. Line Graph vs. Scatterplot with Linear Regression Line
The line graph gives a user a more micro-focused view of their data. They are able to see the spikes, either negative or positive, in their metrics very clearly over time, as well as seeing spans of time where the metrics held steady at certain values. The scatterplot with a linear regression line gives a more macro view, with its purpose being mainly to show the user the general trend of the metric over time. The scatterplot dots still give the user the micro view of the data that led to the general pattern, but the focus of the graph is the linear regression line, and how steeply it has moved either up or down over the given time period.

##### 2. Turn Certain Metrics On or Off
By clicking the buttons at the top of the screen for each metric, a user is able to choose which of the four metrics to keep on screen, down to one. This allows a user to have only the information that they currently want on the screen. On a large enough monitor, this can also be used to view 2 or more specific metrics next to each other.

##### 3. Filter by Month
Because the micro view provided by the line graph can get cramped when the timespan stretches several weeks as it currently does, I added the option to filter out a specific month. This feature isn't a perfect solution (see "Other Next Steps"), but is a good way to zoom in on a specific month.

*Note: Because of long stretches of inactivity by the user, some months only have 1 point of data for certain metrics, which is not enough to generate a line graph or calculate a linear regression. In these instances, a message is displayed in place of the graph section to notify the user of this.*

### Scalability

##### Updating Solution in Real Time
I would use WebSockets to ensure that the data is updated in real-time, by opening a connection to the server that listens for new data being added to the user's account. When this data is received, it would be used to update React's state, which would automatically be fed through the component lifecycle methods to update the page - though I would need to add a rule to the d3 graph creation to update when new data is received. I would also add a small notification (probably a small pop-up in the corner) that tells the user they received new data and that the page updated accordingly, which would automatically fade away after a set time, or could be manually closed.

##### Displaying Years Worth of Data
I think that the scatterplot with regression line is a good method of showing years' worth of data, because its focus is the macro-level view of the data over time. However, I also think that with this much data, other views could be more useful. Two ideas I have for this involve a bar chart, with a bar for each month of data collected. The first bar chart would be a single bar for the month that shows the average rating given for that month, to show a more general flow of the data over time. The second idea is a stacked bar graph. In this situation, each bar would have up to 5 colors in it, with each one assigned to the rating. Each bar would fill up 100% height of the graph, with the 5 inner bars representing the percentage of that rating out of total ratings for the month. This would make it easier to show months/patterns of months where 1 or 2 particular ratings prevailed. Lastly, by finetuning and altering the time filtering (see below), the page could allow a user to select only sections of the data that are useful to them for more micro views.

### Other Next Steps

I had other ideas for this project that I could not fit in within the few hours requested. In future iterations of the same page, these would be some of my top priorities.

##### 1. Responsive Design
Right now, the graphs created by d3 are fixed at 800px wide. In the future, I would determine a user's window size on load and create the graphs at appropriate proportions for their screen size. Additionally, I would use a debounced window resize listener to destroy and re-create the graphs at appropriate sizes for when windows are resized. For small screens, I would also need to take into account how to best fit the data of the graph into a smaller size, which may include some of the features mentioned under the large data size consideration of the above Scalability section.

##### 2. Numeric Data
Right now, the data is only presented visually to the user, but I know that I, and many others, like to quantify data as well. For example, I'd like to have an expandable section where a user can view the actual slope of their linear regression, as well as percentages for the timeframe of how many of each rating they had, or other information.

##### 3. Tooltips
When hovering over a point in the scatterplot or line graph, a user could ideally see the date and time (in a human readable format - MM/DD/YYYY HH:MM), along with its rating, in a floating box next to their cursor. This can help jog the user's memory 

##### 4. Better Time Filtering
As discussed above, I would like to improve the filter by time feature to not just be focused on a single month a user would like to inspect. Rather, I would like to have some preset options, such as "Last Week", "Last Month", "Last 3 Months", etc., in addition to the ability for a user to define their own start and end dates to create custom ranges for viewing their data.
