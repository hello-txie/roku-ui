import * as React from 'react';
import { 
  CardTitle,
  Text, 
  TextContent, 
  TextVariants
} from '@patternfly/react-core';

interface ICustomCardTitle {
    title: string,
    info?: string
}

export const CustomCardTitle: React.FunctionComponent<ICustomCardTitle> = ({title, info}) => {
  return (
     <CardTitle>
      <TextContent>
        <Text component={TextVariants.h2}>
          {title}
        </Text>
        <Text component={TextVariants.h6}>
          {info}
        </Text>
      </TextContent>
     </CardTitle>
  )
}
