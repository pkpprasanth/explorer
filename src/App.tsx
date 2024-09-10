import React, { useState } from 'react';
import styled from 'styled-components';
import ProviderList from './components/ProviderList';
import APIServiceDetails from './components/APIServiceDetails';

const AppContainer = styled.div`
  display: flex;
`;

const ExploreButton = styled.button`
  margin: auto;
  padding: 10px 20px;
  font-size: 16px;
  margin-top:25%
`;

const App: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleProviderClick = (provider: string) => {
    setSelectedProvider(provider);
    setSelectedService(null); // Reset service when changing provider
  };

 

  const handleServiceClick = (service: string) => {
    console.log("service",service);
    
    setSelectedService(service);
  };

  return (
    <AppContainer>
      {!selectedProvider ? (
        <ExploreButton onClick={() => handleProviderClick('adobe.com')}>
          Explore web APIs
        </ExploreButton>
      ) : (
        <ProviderList onProviderClick={handleProviderClick} onServiceClick={handleServiceClick} />
      )}
      {selectedProvider && selectedService && (
        <><APIServiceDetails providerName={selectedProvider} serviceName={selectedService} />
        </>
      )}
    </AppContainer>
  );
};

export default App;
