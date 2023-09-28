import React from 'react';
import { Button } from '@patternfly/react-core';
import { useKeycloak } from '@react-keycloak/web';

export const SignInButton: React.FunctionComponent = () => {
    const { keycloak } = useKeycloak();
    
    return (
        <Button variant="tertiary" size="lg" onClick={() => keycloak.login()}>
            Sign In
        </Button>
    )
};
