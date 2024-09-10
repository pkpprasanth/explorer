import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getProviderDetails } from '../api';

const Container = styled.div`
  margin-left: 260px;
  padding: 20px;
`;

const Logo = styled.img`
  max-width: 100px; /* Adjust as needed */
  max-height: 50px; /* Adjust as needed */
  margin-right: 10px;
`;

const ExploreButton = styled.button`
  margin: auto;
  padding: 10px 20px;
  font-size: 16px;
`;

interface APIServiceDetailsProps {
  providerName: string;
  serviceName: string;
}

const APIServiceDetails: React.FC<APIServiceDetailsProps> = ({ providerName, serviceName }) => {
  const [serviceDetails, setServiceDetails] = useState<any>(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const data = await getProviderDetails(providerName);
        setServiceDetails(data.apis[serviceName]);
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };
    fetchServiceDetails();
  }, [providerName, serviceName]);

  const handleClick = (provider: string) => {
    window.location.reload()
  };
  return (
    <Container>
      {serviceDetails ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {serviceDetails.info['x-logo'] && (
              <Logo src={serviceDetails.info['x-logo'].url} alt="Service Logo" />
            )}
            <h2>{serviceName}</h2>
          </div>
          <div>
            <h3>Description</h3>
            <p>{serviceDetails.info.description}</p>
          </div>
          <div>
            <h3>Contact</h3>
            <p>Name: {serviceDetails.info.contact.name}</p>
            <p>Email: <a href={`mailto:${serviceDetails.info.contact.email}`}>{serviceDetails.info.contact.email}</a></p>
            <p>URL: <a href={serviceDetails.info.contact.url} target="_blank" rel="noopener noreferrer">{serviceDetails.info.contact.url}</a></p>
          </div>
          <div>
            <h3>Swagger URL</h3>
            <a href={serviceDetails.swaggerUrl} target="_blank" rel="noopener noreferrer">{serviceDetails.swaggerUrl}</a>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <br />
      <br />
      <br />
      <ExploreButton onClick={() => handleClick('adobe.com')}>
          Explore web APIs
        </ExploreButton>
    </Container>
  );
};

export default APIServiceDetails;
