import React, { useEffect, useState, ReactNode } from 'react';


interface DomainProtectedWidgetProps {
    children: ReactNode;
}

export const DomainProtectedWidget = ({ children }: DomainProtectedWidgetProps) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Allowed domains configuration
    const allowedDomains = [
      'http://localhost:3000' // For development
    ];

    // Get current origin
    const currentOrigin = window.location.origin;

    console.log('Current origin:', currentOrigin);

    // Check if current domain is in allowed list
    const isDomainAllowed = allowedDomains.includes(currentOrigin);

    if (!isDomainAllowed) {
      console.error('Unauthorized domain access');
      // Optionally send a tracking/logging event
      // trackUnauthorizedAccess(currentOrigin);
    }

    setIsAuthorized(isDomainAllowed);
  }, []);

  // Render nothing or a custom unauthorized message if domain is not allowed
  if (!isAuthorized) {
    return (
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f8d7da', 
        color: '#721c24' 
      }}>
        This widget is not authorized for your domain.
      </div>
    );
  }

  // Render children if domain is authorized
  return <>{children}</>;
};
