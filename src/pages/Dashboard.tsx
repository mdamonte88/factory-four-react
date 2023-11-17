import { useState, useEffect } from 'react';
import StatusContainer from '../components/StatusContainer';
import StatusType from '../types/status';
import '../styles/main.scss';
import '../styles/responsive.scss';
import styled from 'styled-components';
import apiNames from '../constants/apiConstants';
import getStatues from '../services/apiService'


const StyledDashboardContainer = styled.div`
  margin: auto 2.95%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  align-items: flex-start;
  gap: 30px;
  min-height: 100vh;
  padding: 10vh 0 0 0;
  box-sizing: border-box;
`;

const Dashboard = () => {
  const [statuses, setStatuses] = useState<StatusType[]>([]);

  const updateStatuses = async () => {
    const statusPromises = apiNames.map(async (apiName) => {
      return getStatues(apiName);
    });
  
    try {
      const results = await Promise.all(statusPromises);
      /* 
      const updatedStatuses = await Promise.allSettled(statusPromises);
      debugger

      const fulfilledStatuses = updatedStatuses
        .filter((result): result is PromiseFulfilledResult<StatusType> => result.status === 'fulfilled' || result.status === 'rejected')
        .map((result) => result.value );
      */
      
      setStatuses(results);
    } catch (error) {
      console.error('Error fetching statuses:', error);
    }
  };

  useEffect(() => {

    updateStatuses();
    const timeToUpdate = Number(process.env.REACT_APP_TIME_UPDATE) || 10000;
    const intervalId = setInterval(updateStatuses, timeToUpdate);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <StyledDashboardContainer>
      {statuses.map((status) => (
        <StatusContainer
          key={status.apiName}
          apiName={status.apiName}
          success={status.success}
          message={status.message}
          hostname={status.hostname}
          time={status.time}
        />
      ))}
    </StyledDashboardContainer>
  );
};

export default Dashboard;
