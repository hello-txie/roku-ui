import Keycloak from 'keycloak-js'

export const keycloak = new Keycloak({
  "url": "https://keycloak-rhsso.apps.kmod.gcpopenshift.info/auth",
  "realm": "roku-react",
  "clientId": "roku-react-id"
})
