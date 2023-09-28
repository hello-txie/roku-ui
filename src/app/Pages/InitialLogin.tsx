import React from 'react';
import {
  EmptyState,
  EmptyStateVariant,
  EmptyStateBody,
  EmptyStateActions,
  EmptyStateHeader,
  EmptyStateFooter,
  EmptyStateIcon
} from '@patternfly/react-core';
import CubesIcon from '@patternfly/react-icons/dist/esm/icons/cubes-icon';
import { SignInButton } from '@app/components/SignInButton';

export const InitialLogin: React.FunctionComponent = () => (
  <EmptyState variant={EmptyStateVariant.xl}>
    <EmptyStateHeader titleText="Forbidden" headingLevel="h4" icon={<EmptyStateIcon icon={CubesIcon} />} />
    <EmptyStateBody>
      Please sign in through Keyclock to continue. 
    </EmptyStateBody>
    <EmptyStateFooter>
      <EmptyStateActions>
        <SignInButton />
      </EmptyStateActions>
    </EmptyStateFooter>
  </EmptyState>
);
