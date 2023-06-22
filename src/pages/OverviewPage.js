import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LineChart, StackedChart, Loading } from '../components';
import { CARBON_API_URL, POTROOM_API_URL } from '../utils/constants';

const OverviewPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const [carbonMetrics, setCarbonMetrics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${POTROOM_API_URL}GetDashboardMetrics`);
      const data = await response.json();
      setMetrics(data);
      setIsLoading(false);
    };

    const fetchCarbonData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${CARBON_API_URL}GetCarbonDashboardMetrics`
      );
      const data = await response.json();
      setCarbonMetrics(data);
      setIsLoading(false);
    };

    fetchData();
    fetchCarbonData();
  }, []);

  const chartList = [
    {
      TYPE: 'LINE',
      DATASOURCE: metrics,
      PARAM_1: 'AEPPD_L1',
      PARAM_2: 'AEPPD_L2',
      PARAM_NAME_1: 'Line 1',
      PARAM_NAME_2: 'Line 2',
      TITLE: 'AE/PD',
      DATA_RANGES: {
        MIN_1: 0,
        MAX_1: 0.25,
        MIN_2: 0.25,
        MAX_2: 0.5,
        MIN_3: 0.5,
        MAX_3: 1.5,
      },
      minScale: 0,
      maxScale: 1.5,
    },
    {
      TYPE: 'LINE',
      DATASOURCE: metrics,
      PARAM_1: 'POTS_L1',
      PARAM_2: 'POTS_L2',
      PARAM_NAME_1: 'Line 1',
      PARAM_NAME_2: 'Line 2',
      TITLE: 'Operating Pots',
      DATA_RANGES: {
        MIN_1: 160,
        MAX_1: 170,
        MIN_2: 140,
        MAX_2: 160,
        MIN_3: 130,
        MAX_3: 140,
      },
      minScale: 130,
      maxScale: 170,
    },
    {
      TYPE: 'LINE',
      DATASOURCE: metrics,
      PARAM_1: 'AMPS_L1',
      PARAM_2: 'AMPS_L2',
      PARAM_NAME_1: 'Line 1',
      PARAM_NAME_2: 'Line 2',
      TITLE: 'Celtrol Amps',
      DATA_RANGES: {
        MIN_1: 178,
        MAX_1: 185,
        MIN_2: 175,
        MAX_2: 178,
        MIN_3: 165,
        MAX_3: 175,
      },
      minScale: 165,
      maxScale: 185,
    },
    {
      TYPE: 'LINE',
      DATASOURCE: metrics,
      PARAM_1: 'VOLTS_PER_CELL_L1',
      PARAM_2: 'VOLTS_PER_CELL_L2',
      PARAM_NAME_1: 'Line 1',
      PARAM_NAME_2: 'Line 2',
      TITLE: 'Volts Per Cell',
      DATA_RANGES: {
        MIN_1: 4.4,
        MAX_1: 4.6,
        MIN_2: 4.6,
        MAX_2: 4.8,
        MIN_3: 4.8,
        MAX_3: 5.1,
      },
      minScale: 4.4,
      maxScale: 5.1,
    },
    {
      TYPE: 'LINE',
      DATASOURCE: metrics,
      PARAM_1: 'DOWNTIME_L1',
      PARAM_2: 'DOWNTIME_L2',
      PARAM_NAME_1: 'Line 1',
      PARAM_NAME_2: 'Line 2',
      TITLE: 'Downtime',
      DATA_RANGES: {
        MIN_1: 0,
        MAX_1: 10,
        MIN_2: 10,
        MAX_2: 30,
        MIN_3: 30,
        MAX_3: 100,
      },
      minScale: 0,
      maxScale: 100,
    },
    {
      TYPE: 'LINE',
      DATASOURCE: metrics,
      PARAM_1: 'AVG_Fe_L1',
      PARAM_2: 'AVG_Fe_L2',
      PARAM_NAME_1: 'Line 1',
      PARAM_NAME_2: 'Line 2',
      TITLE: '%Fe',
      DATA_RANGES: {
        MIN_1: 0,
        MAX_1: 0.15,
        MIN_2: 0.15,
        MAX_2: 0.2,
        MIN_3: 0.2,
        MAX_3: 0.4,
      },
      minScale: 0,
      maxScale: 0.4,
    },
    {
      TYPE: 'STACKED',
      DATASOURCE: metrics,
      PARAM_1: 'BDEPTHS_HIGH_6_5TARGET_L1',
      PARAM_2: 'BDEPTHS_HIGH_6_5TARGET_L2',
      PARAM_3: 'BDEPTHS_LOW_6_5TARGET_L1',
      PARAM_4: 'BDEPTHS_LOW_6_5TARGET_L2',
      PARAM_NAME_1: 'Line 1 >= 7.5',
      PARAM_NAME_2: 'Line 2 >= 7.5',
      PARAM_NAME_3: 'Line 1 <= 5.5',
      PARAM_NAME_4: 'Line 2 <= 5.5',
      TITLE: 'Bath Depths',
      DATA_RANGES: {
        MIN_1: 0,
        MAX_1: 20,
        MIN_2: 20,
        MAX_2: 40,
        MIN_3: 40,
        MAX_3: 150,
      },
      minScale: 0,
      maxScale: 150,
    },
    {
      TYPE: 'STACKED',
      DATASOURCE: metrics,
      PARAM_1: 'HIGH_MDEPTHS_L1',
      PARAM_2: 'HIGH_MDEPTHS_L2',
      PARAM_3: 'LOW_MDEPTHS_L1',
      PARAM_4: 'LOW_MDEPTHS_L2',
      PARAM_NAME_1: 'Line 1 > 8',
      PARAM_NAME_2: 'Line 2 > 8',
      PARAM_NAME_3: 'Line 1 < 6',
      PARAM_NAME_4: 'Line 2 < 6',
      TITLE: 'Metal Depths',
      DATA_RANGES: {
        MIN_1: 0,
        MAX_1: 20,
        MIN_2: 20,
        MAX_2: 40,
        MIN_3: 40,
        MAX_3: 60,
      },
      minScale: 0,
      maxScale: 60,
    },
    {
      TYPE: 'LINE',
      DATASOURCE: carbonMetrics,
      PARAM_1: 'ANODES_IN_STORAGE',
      PARAM_NAME_1: 'Anodes',
      TITLE: 'Rodded Anode Inventory',
      DATA_RANGES: {
        MIN_1: 500,
        MAX_1: 700,
        MIN_2: 300,
        MAX_2: 500,
        MIN_3: 0,
        MAX_3: 300,
      },
      minScale: 0,
      maxScale: 700,
    },
    {
      TYPE: 'LINE',
      DATASOURCE: metrics,
      PARAM_1: 'GreenInventory_End',
      PARAM_NAME_1: 'Anodes',
      TITLE: 'Green Inventory',
      DATA_RANGES: {
        MIN_1: 2500,
        MAX_1: 3500,
        MIN_2: 1000,
        MAX_2: 2500,
        MIN_3: 0,
        MAX_3: 1000,
      },
      minScale: 0,
      maxScale: 3500,
    },
    {
      TYPE: 'LINE',
      DATASOURCE: metrics,
      PARAM_1: 'BakedSawed_End',
      PARAM_NAME_1: 'Anodes',
      TITLE: 'Baked Sawed Inventory',
      DATA_RANGES: {
        MIN_1: 2000,
        MAX_1: 3000,
        MIN_2: 500,
        MAX_2: 2000,
        MIN_3: 0,
        MAX_3: 500,
      },
      minScale: 0,
      maxScale: 3000,
    },
  ];

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="box">
          {metrics &&
            chartList.map((chart, index) => {
              return (
                <div key={index}>
                  {chart.TYPE === 'LINE' ? (
                    <LineChart
                      line1Data={chart.DATASOURCE.reduce((acc, curr) => {
                        acc.push(curr[chart.PARAM_1]);
                        return acc;
                      }, [])}
                      line2Data={
                        chart.PARAM_2
                          ? chart.DATASOURCE.reduce((acc, curr) => {
                              acc.push(curr[chart.PARAM_2]);
                              return acc;
                            }, [])
                          : ''
                      }
                      label1={chart.PARAM_NAME_1}
                      label2={chart.PARAM_2 ? chart.PARAM_NAME_2 : ''}
                      chartTitle={chart.TITLE}
                      chartLabels={chart.DATASOURCE.reduce((acc, curr) => {
                        acc.push(curr.SHIFTDATE);
                        return acc;
                      }, [])}
                      backgroundRanges={chart.DATA_RANGES}
                      minScale={chart.minScale}
                      maxScale={chart.maxScale}
                    />
                  ) : (
                    <StackedChart
                      line1Data={chart.DATASOURCE.reduce((acc, curr) => {
                        acc.push(curr[chart.PARAM_1]);
                        return acc;
                      }, [])}
                      line2Data={chart.DATASOURCE.reduce((acc, curr) => {
                        acc.push(curr[chart.PARAM_2]);
                        return acc;
                      }, [])}
                      line3Data={chart.DATASOURCE.reduce((acc, curr) => {
                        acc.push(curr[chart.PARAM_3]);
                        return acc;
                      }, [])}
                      line4Data={chart.DATASOURCE.reduce((acc, curr) => {
                        acc.push(curr[chart.PARAM_4]);
                        return acc;
                      }, [])}
                      label1={chart.PARAM_NAME_1}
                      label2={chart.PARAM_NAME_2}
                      label3={chart.PARAM_NAME_3}
                      label4={chart.PARAM_NAME_4}
                      chartTitle={chart.TITLE}
                      chartLabels={chart.DATASOURCE.reduce((acc, curr) => {
                        acc.push(curr.SHIFTDATE);
                        return acc;
                      }, [])}
                      backgroundRanges={chart.DATA_RANGES}
                      minScale={chart.minScale}
                      maxScale={chart.maxScale}
                    />
                  )}
                </div>
              );
            })}
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .box {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 5px;
    margin-top: 1em;
  }

  .box > div {
    width: 85%;
    height: 0%;
    background: white;
  }
`;

export default OverviewPage;
