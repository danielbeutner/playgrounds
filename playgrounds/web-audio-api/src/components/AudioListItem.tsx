import React from 'react';

interface AudioListItemProps {
  duration: string | undefined;
  error: string | undefined;
  id: string;
  name: string;
  size: number | undefined;
  status: string;
}

export function AudioListItem({
  id,
  name,
  duration,
  size,
  status,
  error,
}: AudioListItemProps) {
  return (
    <li key={id}>
      <h2>{name}</h2>
      <ul>
        <li>ID: {id}</li>
        <li>Duration: {duration || 'unknown'}</li>
        <li>Size: {size ? `${size} MB` : 'unknown'}</li>
        <li>Status: {status}</li>
        {error && <li className="error">Error: {error}</li>}
      </ul>
    </li>
  );
}

AudioListItem.defaultProps = {
  id: undefined,
  name: undefined,
  duration: undefined,
  size: undefined,
  status: 'pending',
};
