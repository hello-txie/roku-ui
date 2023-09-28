import React from 'react';
import { Card, Label, PageSection, TextVariants, Text, TextContent, FormSelect, FormSelectOption, Button, CardBody } from '@patternfly/react-core';
import { Table, Thead, Tbody, Tr, Th, Td, ExpandableRowContent } from '@patternfly/react-table';
import { CustomCardTitle } from '@app/components/CustomCardTitle'

export const Downloads: React.FunctionComponent = () => {
  const channels = ["Stable"]
  const initialExpandedServerNames = ['Openshift Binary']; // Default to expanded
  const [areAllExpanded, setAreAllExpanded] = React.useState(false);
  const [collapseAllAriaLabel, setCollapseAllAriaLabel] = React.useState('Expand all');
  const [expandedServerNames, setExpandedServerNames] = React.useState(initialExpandedServerNames);
  const [channelSelection, setChannelSelection] = React.useState("")
  const [channelOptions, setChannelOptions] = React.useState([<FormSelectOption key={-1} value="" label="Please Select a Channel"  isPlaceholder/>]);
  const [versionSelection, setVersionSelection] = React.useState("")
  const [versionOptions, setVersionOptions] = React.useState([<FormSelectOption key={-1} value="" label="Please Select a Version"  isPlaceholder/>]);

  React.useEffect(() => {
    const allExpanded = expandedServerNames.length === serverData.length;
    setAreAllExpanded(allExpanded);
    setCollapseAllAriaLabel(allExpanded ? 'Collapse all' : 'Expand all');
    setChannelOptions([...channelOptions, <FormSelectOption key="stable" value="stable" label="stable" />])
    setVersionOptions([...versionOptions, <FormSelectOption key="4.12" value="4.12" label="4.12" />])
  }, [expandedServerNames]);

  const onChannelFocus = () => {
    const element = document.getElementById('toggle-channel');
    element?.focus();
  };

  const onChannelSelect = (_event: React.FormEvent<HTMLSelectElement>, value: string) => {
    onChannelFocus();
    setChannelSelection(value)
  };

  const onVersionFocus = () => {
    const element = document.getElementById('toggle-version');
    element?.focus();
  };

  const onVersionSelect = (_event: React.FormEvent<HTMLSelectElement>, value: string) => {
    onVersionFocus();
    setVersionSelection(value)
  };

  const expandableColumns = ['Name', 'Channel', 'Version', 'Status'];

  const serverData = [
    {
      name: 'Openshift Operator Bundle',
      channel: (
        <FormSelect
          value={channelSelection}
          onChange={onChannelSelect}
          id="toggle-channel"
          name="horizontal-form-title"
          aria-label="Your title"
        >
          {channelOptions}
        </FormSelect>
      ),
      applications: (
        <FormSelect
          value={versionSelection}
          onChange={onVersionSelect}
          id="toggle-version"
          name="horizontal-form-title"
          aria-label="Your title"
        >
          {versionOptions}
        </FormSelect>
      ),
      status: (
        <Button variant="secondary" size="sm">
          Download
        </Button>
      ),
      details: (
        <TextContent>
          <Text component={TextVariants.p}>
            Location<Text component={TextVariants.small}>Boston</Text>
          </Text>
          <Text component={TextVariants.p}>
            Last Modified<Text component={TextVariants.small}>2 hours ago</Text>
          </Text>
          <Text component={TextVariants.p}>
            URL<Text component={TextVariants.small}>http://www.redhat.com/en/office-locations/US-node1</Text>
          </Text>
        </TextContent>
      )
    },
    {
      name: 'Red Hat Certified Operators',
      channel: (
        <FormSelect
          value={channelSelection}
          onChange={onChannelSelect}
          id="toggle-channel"
          name="horizontal-form-title"
          aria-label="Your title"
        >
          {channelOptions}
        </FormSelect>
      ),
      applications: (
        <FormSelect
          value={versionSelection}
          onChange={onVersionSelect}
          id="toggle-version"
          name="horizontal-form-title"
          aria-label="Your title"
        >
          {versionOptions}
        </FormSelect>
      ),
      status: (
        <Button variant="secondary" size="sm">
          Download
        </Button>
      ),
      details: (
        <TextContent>
          <Text component={TextVariants.p}>
            Location<Text component={TextVariants.small}>Boston</Text>
          </Text>
          <Text component={TextVariants.p}>
            Last Modified<Text component={TextVariants.small}>2 hours ago</Text>
          </Text>
          <Text component={TextVariants.p}>
            URL<Text component={TextVariants.small}>http://www.redhat.com/en/office-locations/US-node1</Text>
          </Text>
        </TextContent>
      )
    }
  ];


  const setServerExpanded = (server, isExpanding) => {
    const otherExpandedServerNames = expandedServerNames.filter((r) => r !== server.name);
    setExpandedServerNames(isExpanding ? [...otherExpandedServerNames, server.name] : otherExpandedServerNames);
  };

  const isServerExpanded = (server) => {
    return expandedServerNames.includes(server.name);
  };

  // We want to be able to reference the original data object based on row index. But because an expanded
  // row takes up two row indexes, servers[rowIndex] will not be accurate like it would in a normal table.
  // One solution to this is to create an array of data objects indexed by the displayed row index.

  const onCollapseAll = (_event, _rowIndex, isOpen) => {
    setExpandedServerNames(isOpen ? [...serverData.map((server) => server.name)] : []);
  };

  return (
    <React.Fragment>
        <PageSection
          padding={{
            default: 'noPadding',
            xl: 'padding'
          }}
        >
          <Card component="div">
            <CustomCardTitle 
              title="OpenShift installation" 
              info="Utilities to simplify preparation of Openshift cluster installations." 
            />
            <CardBody>
              <Table aria-label="Collapsible table">
                <Thead>
                  <Tr>
                    <Th
                      expand={{
                        areAllExpanded: !areAllExpanded,
                        collapseAllAriaLabel: collapseAllAriaLabel,
                        onToggle: onCollapseAll
                      }}
                    ></Th>
                    {expandableColumns.map((column) => (
                      <Th key={column}>{column}</Th>
                    ))}
                  </Tr>
                </Thead>
                {serverData.map((server, serverIndex) => (
                  <Tbody key={server.name} isExpanded={isServerExpanded(server)}>
                    <Tr>
                      <Td
                        expand={
                          server.details
                            ? {
                                rowIndex: serverIndex,
                                isExpanded: isServerExpanded(server),
                                onToggle: () => setServerExpanded(server, !isServerExpanded(server))
                              }
                            : undefined
                        }
                      >
                        <ExpandableRowContent>{server.details}</ExpandableRowContent>
                      </Td>
                      <Td>{server?.name}</Td>
                      <Td>{server?.channel}</Td>
                      <Td>{server?.applications}</Td>
                      <Td>{server?.status}</Td>
                    </Tr>
                    <Tr isExpanded={isServerExpanded(server)}>
                      <Td></Td>
                      <Td colSpan={expandableColumns.length}>
                        <ExpandableRowContent>{server?.details}</ExpandableRowContent>
                      </Td>
                    </Tr>
                  </Tbody>
                ))}
              </Table>
            </CardBody>
          </Card>
        </PageSection>
    </React.Fragment>
  );
};
