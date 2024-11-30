export const TemplateInvitationToOrganization = `
<Card.Header>
  <h2>Welcome to AIConnectV2</h2>
  <hr />
</Card.Header>

<Card.Body>
  <p>You have been invited to join {{ organization_name }}.</p>
  <p>
    <a href="{{ url_invitation }}" target="_blank">Accept Invitation</a>
  </p>
</Card.Body>

<Card.Footer>
  <p>Sent by AIConnectV2</p>
</Card.Footer>
  `.trim()
