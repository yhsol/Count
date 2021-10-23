import { ResponsiveBar } from "@nivo/bar";
import { ChartData } from "./count.types";

const CountBarChart = ({ data }: { data: ChartData }) => (
  <ResponsiveBar
    data={data}
    keys={["spent", "rest"]}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    padding={0.3}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "nivo" }}
    borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={null}
    axisLeft={null}
    enableLabel={false}
    enableGridY={false}
    enableGridX={false}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={function (e) {
      return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
    }}
  />
);

export default CountBarChart;
