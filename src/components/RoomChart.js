import { Line } from 'react-chartjs-2';

const LineChart = ({
  line1Data,
  line2Data,
  line3Data,
  line4Data,
  label1,
  label2,
  label3,
  label4,
  chartTitle,
  chartLabels,
  yScale,
  cb,
}) => {
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: label1,
        data: line1Data,
        fill: false,
        backgroundColor: 'rgb(41,162,204)',
        borderColor: 'rgb(41,162,204)',
      },
    ],
  };

  if (label2) {
    data.datasets.push({
      label: label2,
      data: line2Data,
      fill: false,
      backgroundColor: 'rgb(211,30,30)',
      borderColor: 'rgb(211,30,30)',
    });
  }

  if (label3) {
    data.datasets.push({
      label: label3,
      data: line3Data,
      fill: false,
      backgroundColor: 'rgb(124,168,43)',
      borderColor: 'rgb(124,168,43)',
    });
  }

  if (label4) {
    data.datasets.push({
      label: label4,
      data: line4Data,
      fill: false,
      backgroundColor: 'rgb(239,133,53)',
      borderColor: 'rgb(239,133,53)',
    });
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: yScale,
    },
    spanGaps: true,
  };

  const getElementAtEvent = (element) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];
    cb(data.labels[index]);
  };

  return (
    <div>
      <h4 style={{ textAlign: 'center', color: 'black' }}>{chartTitle}</h4>
      <Line
        data={data}
        options={options}
        getElementAtEvent={getElementAtEvent}
      />
    </div>
  );
};

export default LineChart;
