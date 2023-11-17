import React from 'react';
import styled from 'styled-components';
import StatusType from '../types/status';
import './statusComponent.scss'
import { formatTime } from '../utils/dateUtils'; 

const StyledStatusContainer = styled.div`
  /* Reference the styles defined in StatusComponent.css */
  @import './statusComponent.scss';
`;


const StatusComponent: React.FC<StatusType> = ({ apiName, success, message, hostname, time }) => {
  const dateFormatted = formatTime(time);
  const apiNameUpper = apiName.toUpperCase();
  const [title, description] = message.split(':');

  return (
    <StyledStatusContainer className="status-container">
      <div>
        <h2>{apiNameUpper}</h2>
        {success && (
          <>
            <p className="success">{title}</p>
            <p className='small'>{hostname}</p>
            <p className='small'>{dateFormatted}</p>
          </>
        )}

        {!success && (
          <>
            <p className="error">Error</p>
            <p className='large red'>OUTAGE</p>
            <p className='small red'>{title}</p>
            <p className='small red'>{description}</p>
          </>
        )}
      </div>
    </StyledStatusContainer>
  );
};
  
  export default StatusComponent;