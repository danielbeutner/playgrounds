import React from 'react';
import './SkeletonLoader.css';

export function SkeletonLoader({ children }: { children: React.ReactNode }) {
  return (
    <>
      {React.Children.map(children, (child) => {
        if (child && React.isValidElement(child)) {
          const classes = [];

          if (child.props.className) {
            classes.push(child.props.className);
          }
          classes.push('skeleton-loader');

          return React.cloneElement(child, {
            className: classes.join(' '),
          });
        }
      })}
    </>
  );
}
