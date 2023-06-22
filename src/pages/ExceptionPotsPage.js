import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CustomModal, LineChart, Loading } from '../components';
import { POTROOM_API_URL } from '../utils/constants';

const ExceptionPotsPage = () => {
  const modal = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [potroomExceptions, setPotroomExceptions] = useState([]);
  const [exceptionHistory, setExceptionHistory] = useState([]);
  const [selectedPotMetric, setSelectedPotMetric] = useState({});

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(`${POTROOM_API_URL}GetCurrentPotExceptions`);
      const data = await response.json();
      setPotroomExceptions(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const potHistoryParams = [
    {
      CHART: 'HIGH_TEMP',
      QUERY_PARAM: 'TEMPERATURE',
      METRIC: 'HIGH_TEMPS',
      TITLE: 'TEMPERATURES > 980',
    },
    {
      CHART: 'HIGH_TEMP_2',
      QUERY_PARAM: 'TEMPERATURE',
      METRIC: 'HIGH_TEMPS_2',
      TITLE: 'TEMPERATURES > 1000',
    },
    {
      CHART: 'LOW_TEMP',
      QUERY_PARAM: 'TEMPERATURE',
      METRIC: 'LOW_TEMPS',
      TITLE: 'TEMPERATURES < 941',
    },
    {
      CHART: 'LOW_AVG_SEARCH',
      QUERY_PARAM: 'CELTROL_DATA',
      METRIC: 'LOW_AVG_SEARCH',
      TITLE: 'SEARCH AVG < 20',
    },
    {
      CHART: 'HIGH_AES',
      QUERY_PARAM: 'CELTROL_DATA',
      METRIC: 'HIGH_AES',
      TITLE: 'AE > 2',
    },
    {
      CHART: 'LOW_BASEFEED',
      QUERY_PARAM: 'CELTROL_DATA',
      METRIC: 'LOW_BASEFEED',
      TITLE: 'BASE FEED <= 2:30',
    },
    {
      CHART: 'LOW_SEARCH_TOTAL',
      QUERY_PARAM: 'CELTROL_HISTORY',
      METRIC: 'LOW_SEARCH_TOTAL',
      TITLE: 'TOTAL SEARCHES < 10',
    },
    {
      CHART: 'HIGH_DUMPS',
      QUERY_PARAM: 'CELTROL_HISTORY',
      METRIC: 'HIGH_DUMPS',
      TITLE: 'DUMPS > 500',
    },
    {
      CHART: 'HIGH_BDEPTH',
      QUERY_PARAM: 'BATH_DEPTH',
      METRIC: 'HIGH_BDEPTH',
      TITLE: 'BATH > 8',
    },
    {
      CHART: 'LOW_BDEPTH',
      QUERY_PARAM: 'BATH_DEPTH',
      METRIC: 'LOW_BDEPTH',
      TITLE: 'BATH < 6',
    },
    {
      CHART: 'HIGH_MDEPTH',
      QUERY_PARAM: 'METAL_DEPTH',
      METRIC: 'HIGH_MDEPTH',
      TITLE: 'METAL > 8',
    },
    {
      CHART: 'LOW_MDEPTH',
      QUERY_PARAM: 'METAL_DEPTH',
      METRIC: 'LOW_MDEPTH',
      TITLE: 'METAL < 6',
    },
    {
      CHART: 'HIGH_FE',
      QUERY_PARAM: 'FE',
      METRIC: 'HIGH_FE',
      TITLE: 'FE > .20',
    },
  ];

  const showHistory = async (param) => {
    setSelectedPotMetric(potHistoryParams.filter((p) => p.CHART === param)[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${POTROOM_API_URL}GetPotExceptionHistoryByRoom?numDays=30&param=${selectedPotMetric.QUERY_PARAM}`
      );
      const data = await response.json();
      setExceptionHistory(data);
    };

    if (Object.keys(selectedPotMetric).length > 0) {
      fetchData();
      modal.current.open();
    }
  }, [selectedPotMetric]);

  return (
    <Wrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <h4 className="sectionHeading">Potroom Exception Pots</h4>
          <table className="potExceptionTable">
            <thead>
              <tr>
                <td></td>
                <td colSpan="3">Temperatures</td>
                <td colSpan="5">Feed</td>
                <td colSpan="4">Liquid</td>
                <td colSpan="1">Purity</td>
              </tr>
              <tr>
                <td>Room</td>
                <td onClick={() => showHistory('HIGH_TEMP')}>Temp &gt; 980</td>
                <td onClick={() => showHistory('HIGH_TEMP_2')}>
                  Temp &gt; 1000
                </td>
                <td onClick={() => showHistory('LOW_TEMP')}>Temp &lt; 941</td>
                <td onClick={() => showHistory('LOW_AVG_SEARCH')}>
                  Search &lt; 20
                </td>
                <td onClick={() => showHistory('LOW_SEARCH_TOTAL')}>
                  Total Search &lt; 10
                </td>
                <td onClick={() => showHistory('HIGH_AES')}>AE &gt; 2</td>
                <td onClick={() => showHistory('HIGH_DUMPS')}>
                  Dumps &gt; 500
                </td>
                <td onClick={() => showHistory('LOW_BASEFEED')}>
                  Base Feed &lt;= 2:30
                </td>
                <td onClick={() => showHistory('LOW_BDEPTH')}>Bath &lt; 6</td>
                <td onClick={() => showHistory('HIGH_BDEPTH')}>Bath &gt; 8</td>
                <td onClick={() => showHistory('LOW_MDEPTH')}>Metal &lt; 6</td>
                <td onClick={() => showHistory('HIGH_MDEPTH')}>Metal &gt; 8</td>
                <td onClick={() => showHistory('HIGH_FE')}>Fe &gt; .20</td>
              </tr>
            </thead>
            <tbody>
              {potroomExceptions &&
                potroomExceptions.map((param, index) => {
                  return (
                    <tr key={index}>
                      <td>{param.ROOM}</td>
                      <td>{param.HIGH_TEMPS}</td>
                      <td>{param.HIGH_TEMPS_2}</td>
                      <td>{param.LOW_TEMPS}</td>
                      <td>{param.LOW_AVG_SEARCH}</td>
                      <td>{param.LOW_SEARCH_COUNT}</td>
                      <td>{param.HIGH_AES}</td>
                      <td>{param.HIGH_DUMP_COUNT}</td>
                      <td>{param.LOW_BASE_FEED}</td>
                      <td>{param.LOW_BATH_DEPTHS}</td>
                      <td>{param.HIGH_BATH_DEPTHS}</td>
                      <td>{param.LOW_METAL_DEPTHS}</td>
                      <td>{param.HIGH_METAL_DEPTHS}</td>
                      <td>{param.HIGH_FE}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <span className="note">Click column heading for 30 history</span>
        </div>
      )}

      <CustomModal ref={modal}>
        <div
          style={{
            position: 'relative',
            margin: 'auto',
            width: '70vw',
            backgroundColor: 'white',
          }}
        >
          {exceptionHistory && (
            <LineChart
              className="chart"
              line1Data={exceptionHistory.reduce((acc, curr) => {
                acc.push(curr[selectedPotMetric.METRIC + '_A']);
                return acc;
              }, [])}
              line2Data={exceptionHistory.reduce((acc, curr) => {
                acc.push(curr[selectedPotMetric.METRIC + '_B']);
                return acc;
              }, [])}
              line3Data={exceptionHistory.reduce((acc, curr) => {
                acc.push(curr[selectedPotMetric.METRIC + '_C']);
                return acc;
              }, [])}
              line4Data={exceptionHistory.reduce((acc, curr) => {
                acc.push(curr[selectedPotMetric.METRIC + '_D']);
                return acc;
              }, [])}
              label1={'A Room'}
              label2={'B Room'}
              label3={'C Room'}
              label4={'D Room'}
              chartTitle={selectedPotMetric.TITLE}
              chartLabels={exceptionHistory.reduce((acc, curr) => {
                acc.push(curr.ENTRYDATE);
                return acc;
              }, [])}
              cb={(x) => console.log(x)}
            />
          )}
        </div>
      </CustomModal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .sectionHeading {
    font-weight: bold;
    margin-left: 1em;
  }

  .potExceptionTable {
    width: 90%;
    margin-left: 2em;
    margin-bottom: 1em;
  }

  .potExceptionTable > thead > tr > td {
    font-weight: bolder;
    text-align: center;
    vertical-align: middle;
    border: 1px solid black;
  }

  .potExceptionTable > tbody > tr > td {
    text-align: center;
    border: 1px solid black;
  }

  .chart {
    background-color: yellow;
  }

  .note {
    padding: 2.5em;
    font-weight: 600;
  }

  @media print {
    .note {
      visibility: hidden;
    }
  }
`;

export default ExceptionPotsPage;
