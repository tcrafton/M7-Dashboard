import { Chart, Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

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
  backgroundRanges,
  minScale,
  maxScale,
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
    spanGaps: true,
    scales: {
      y: {
        min: minScale,
        max: maxScale,
        ticks: {
          beginAtZero: true,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: chartTitle,
        font: {
          size: 15,
          weight: 600,
        },
        padding: {
          top: 5,
          bottom: 5,
        },
      },
      // legend: {
      //   display: true,
      //   labels: {
      //     color: 'rgb(255, 99, 132)',
      //     font: {
      //       family: 'Montserrat', // Add your font here to change the font of your legend label
      //     },
      //   },
      // },
      annotation: {
        drawTime: 'afterDraw',
        annotations: [
          {
            id: 'box1',
            type: 'box',
            scaleID: 'y-axis-0',
            yMin: backgroundRanges ? backgroundRanges.MIN_1 : 0,
            yMax: backgroundRanges ? backgroundRanges.MAX_1 : 0,
            backgroundColor: 'rgba(46, 242, 109, 0.2)',
            borderColor: 'rgba(46, 242, 109, 0.2)',
          },
          {
            id: 'box2',
            type: 'box',
            scaleID: 'y-axis-0',
            yMin: backgroundRanges ? backgroundRanges.MIN_2 : 0,
            yMax: backgroundRanges ? backgroundRanges.MAX_2 : 0,
            backgroundColor: 'rgba(254, 242, 16, 0.2)',
            borderColor: 'rgba(254, 242, 16, 0.2)',
          },
          {
            id: 'box3',
            type: 'box',
            scaleID: 'y-axis-0',
            yMin: backgroundRanges ? backgroundRanges.MIN_3 : 0,
            yMax: backgroundRanges ? backgroundRanges.MAX_3 : 0,
            backgroundColor: 'rgba(254, 49, 16, 0.4)',
            borderColor: 'rgba(254, 49, 16, 0.4)',
          },
          {
            id: 'box4',
            type: 'box',
            scaleID: 'y-axis-0',
            yMin:
              backgroundRanges && backgroundRanges.MIN_4
                ? backgroundRanges.MIN_4
                : 0,
            yMax:
              backgroundRanges && backgroundRanges.MIN_4
                ? backgroundRanges.MAX_4
                : 0,
            backgroundColor: 'rgba(254, 49, 16, 0.4)',
            borderColor: 'rgba(254, 49, 16, 0.4)',
          },
        ],
      },
    },
  };

  const getElementAtEvent = (element) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];
    cb(data.labels[index]);
  };

  return (
    <div>
      {/* <h4 style={{ textAlign: 'center', color: 'black' }}>{chartTitle}</h4> */}
      <Line
        data={data}
        options={options}
        getElementAtEvent={getElementAtEvent}
      />
    </div>
  );
};

export default LineChart;
