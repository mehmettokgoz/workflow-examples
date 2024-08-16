import * as React from 'react';

interface SignUpEmailTemplateProps {
  firstName: string;
}

export const SignUpEmailTemplate: React.FC<Readonly<SignUpEmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);
