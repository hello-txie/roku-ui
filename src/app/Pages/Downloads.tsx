import React from 'react';
import { 
  Card, 
  PageSection
 } from '@patternfly/react-core';
import { OperatorBundle } from '@app/components/downloads/OperatorBundle';
import { CertifiedOperators } from '@app/components/downloads/CertifiedOperators';

export const Downloads: React.FunctionComponent = () => {
  return (
    <React.Fragment>
        <PageSection
          padding={{
            default: 'noPadding',
            xl: 'padding'
          }}
        >
          <Card component="div">
            <OperatorBundle />
            <br />
            <CertifiedOperators />
          </Card>
        </PageSection>
    </React.Fragment>
  );
};
