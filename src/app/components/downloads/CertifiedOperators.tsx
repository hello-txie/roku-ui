import React from 'react';
import { Button, CardBody, FormSelect, FormSelectOption, Text, TextContent, TextVariants } from '@patternfly/react-core';
import { Table, Thead, Tr, Th, Tbody, Td, ExpandableRowContent } from '@patternfly/react-table';
import { CustomCardTitle } from '../CustomCardTitle';

export const CertifiedOperators: React.FunctionComponent = () => {
  const initialExpandedServerNames = ['Red Hat Certified Operators']; // Default to expanded
  const [areAllExpanded, setAreAllExpanded] = React.useState(false);
  const [collapseAllAriaLabel, setCollapseAllAriaLabel] = React.useState('Expand all');
  const [expandedServerNames, setExpandedServerNames] = React.useState(initialExpandedServerNames);
	const [operatorSelection, setOperatorSelection] = React.useState("")
  const [operatorOptions, setOperatorOptions] = React.useState([<FormSelectOption key={-1} value="" label="Please Select an Operator"  isPlaceholder/>]);
  const [versionSelection, setVersionSelection] = React.useState("")
  const [versionOptions, setVersionOptions] = React.useState([<FormSelectOption key={-1} value="" label="Please Select a Version"  isPlaceholder/>]);

  React.useEffect(() => {
    const allExpanded = expandedServerNames.length === serverData.length;
    setAreAllExpanded(allExpanded);
    setCollapseAllAriaLabel(allExpanded ? 'Collapse all' : 'Expand all');
    setOperatorOptions([<FormSelectOption key={-1} value="" label="Please Select an Operator"  isPlaceholder/>, <FormSelectOption key="stable" value="stable" label="stable" />])
    setVersionOptions([<FormSelectOption key={-1} value="" label="Please Select a Version"  isPlaceholder/>, <FormSelectOption key="4.12" value="4.12" label="4.12" />])
  }, [expandedServerNames]);

  const onOperatorFocus = () => {
    const element = document.getElementById('toggle-operator');
    element?.focus();
  };

  const onOperatorSelect = (_event: React.FormEvent<HTMLSelectElement>, value: string) => {
    onOperatorFocus();
    setOperatorSelection(value)
  };

  const onVersionFocus = () => {
    const element = document.getElementById('toggle-version');
    element?.focus();
  };

  const onVersionSelect = (_event: React.FormEvent<HTMLSelectElement>, value: string) => {
    onVersionFocus();
    setVersionSelection(value)
  };

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

  const expandableColumns = ['Name', 'Operator', 'Version', 'Download'];

  const serverData = [
    {
      name: 'Red Hat Certified Operators',
      operator: (
        <FormSelect
          value={operatorSelection}
          onChange={onOperatorSelect}
          id="toggle-operator"
          name="horizontal-form-title"
          aria-label="Your title"
        >
          {operatorOptions}
        </FormSelect>
      ),
      version: (
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
      download: (
        <Button variant="secondary" size="sm">
          Download
        </Button>
      ),
      details: (
        <TextContent>
          <Text component={TextVariants.p}>
            Details<Text component={TextVariants.small}>Add more details on this item</Text>
          </Text>
          <Text component={TextVariants.p}>
            Last Updated<Text component={TextVariants.small}>2 hours ago</Text>
          </Text>
        </TextContent>
      )
    }
  ];

	return (
		<React.Fragment>
			<CustomCardTitle 
					title="Certified operators" 
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
								<Td>{server?.operator}</Td>
								<Td>{server?.version}</Td>
								<Td>{server?.download}</Td>
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
		</React.Fragment>
	)
};
