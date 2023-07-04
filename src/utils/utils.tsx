import React from 'react';
import { GrLinkedin, GrGithub } from 'react-icons/gr';

export const getProfileIcon = (network: string) => {
  switch (network) {
    case 'LinkedIn':
      return <GrLinkedin />;
    case 'GitHub':
      return <GrGithub />;
    default:
      return '';
  }
};

export function reformatDate(fullDate: string) {
  const date = new Date(fullDate);
  return date.toDateString().slice(4);
}
