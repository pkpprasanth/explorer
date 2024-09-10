import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getProviders, getProviderDetails } from '../api';
import { String } from 'aws-sdk/clients/cloudtrail';

const Sidebar = styled.div`
  width: 250px;
  background-color: #2e3b4e;
  color: white;
  height: 100vh;
  overflow-y: auto;
  position: fixed;
`;

const ProviderItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #1e2a3b;
  }
`;

const ServiceItem = styled.div`
  padding: 8px 15px;
  background-color: #1e2a3b;
  cursor: pointer;
  &:hover {
    background-color: #31455a;
  }
`;

interface ProviderListProps {
  onProviderClick: (providerName: string) => void;
  onServiceClick: (serviceName: string) => void; // New prop to handle service clicks
}

const ProviderList: React.FC<ProviderListProps> = ({ onProviderClick, onServiceClick }) => {
  const [providers, setProviders] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>("");

  useEffect(() => {
    const fetchProviders = async () => {
      const data = await getProviders();
      console.log("data",data);
      
      setProviders(data.data);
    };
    fetchProviders();
  }, []);

  const handleProviderClick = async (provider: string) => {
    onProviderClick(provider);
    setSelectedProvider(provider);

    const details = await getProviderDetails(provider);
    console.log("details",details);
    
    setServices(Object.keys(details.apis)); // Extract service names from paths
  };

  return (
    <Sidebar>
      {selectedProvider ? (
        <>
          {services.map((service) => (
            <ServiceItem key={service} onClick={() => onServiceClick(service)}>
              {service}
            </ServiceItem>
          ))}
        </>
      ) : (
        providers?.map((provider:string) => (
          <ProviderItem key={provider} onClick={() => handleProviderClick(provider)}>
            {provider}
          </ProviderItem>
        ))
      )}
    </Sidebar>
  );
};

export default ProviderList;
