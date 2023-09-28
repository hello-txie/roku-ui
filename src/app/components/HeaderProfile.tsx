import React from 'react'
import { Toolbar, ToolbarContent, ToolbarGroup, ToolbarItem, Dropdown, MenuToggleElement, MenuToggle, Avatar, DropdownList, DropdownItem } from '@patternfly/react-core';
import imgAvatar from '@app/bgimages/avatarImg.svg';
import { SignInButton } from '@app/components/SignInButton';
import { useKeycloak } from '@react-keycloak/web';

export const HeaderProfile: React.FunctionComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [userName, setUserName] = React.useState("")
  const { keycloak } = useKeycloak();

  if(keycloak.authenticated) {
    keycloak.loadUserProfile().then((profile) => {
      setUserName(profile.username || "")
    });
  }

  const clearAndRedirect = () => {
    sessionStorage.clear();
    window.location.href = "/";
    keycloak.logout({redirectUri: location.origin}); 
  }

  const onDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onDropdownSelect = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const userDropdownItems = [
    <>
      <DropdownItem key="group 2 logout" onClick={clearAndRedirect}>Logout</DropdownItem>
    </>
  ];

  return (
    <Toolbar id="toolbar" isFullHeight isStatic>
      <ToolbarContent>
        <ToolbarGroup
          variant="icon-button-group"
          align={{ default: 'alignRight' }}
          spacer={{ default: 'spacerNone', md: 'spacerMd' }}
        >
          {
            keycloak.authenticated ?
            <ToolbarItem visibility={{ default: 'hidden', md: 'visible' }}>
              <Dropdown
                isOpen={isDropdownOpen}
                onSelect={onDropdownSelect}
                onOpenChange={(isOpen: boolean) => setIsDropdownOpen(isOpen)}
                popperProps={{ position: 'right' }}
                toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                  <MenuToggle
                    ref={toggleRef}
                    onClick={onDropdownToggle}
                    isFullHeight
                    isExpanded={isDropdownOpen}
                    icon={<Avatar src={imgAvatar} alt="avatar" />}
                  >
                    { userName }
                  </MenuToggle>
                )}
              >
                <DropdownList>{userDropdownItems}</DropdownList>
              </Dropdown>
            </ToolbarItem>
            :
            <SignInButton />
          }
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );
};
