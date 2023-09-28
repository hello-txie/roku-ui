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
      <Text component={TextVariants.p}>
        {title}
      </Text>
      <TextContent>
        <Text component={TextVariants.small}>
          {info}
        </Text>
      </TextContent>
     </CardTitle>
  )
}
