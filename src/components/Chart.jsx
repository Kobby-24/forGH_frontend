import { BarChart } from "@mui/x-charts/BarChart";

const TaxChart = ({ baseTax, addedTax }) => {
  const data = [
    { name: "Base Tax", value: baseTax },
    { name: "Added Tax", value: addedTax },
  ];

  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: data.map(d => d.name) }]}
      series={[{ data: data.map(d => d.value) }]}
      width={400}
      height={300}
    />
  );
};

export default TaxChart;
