import React from 'react';

export default function BreastCancerRibbon({
  size = 24,
  className = '',
  style = {},
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      aria-label="Breast Cancer Awareness Ribbon"
    >
      <defs>
        <linearGradient
          id="breastCancerRibbonGrad"
          x1="6"
          y1="3"
          x2="26"
          y2="29"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="45%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
        <filter id="ribbonShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#be185d" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Main Awareness Ribbon Body */}
      <path
        d="M16 3C11.8 3 9 6.4 9 11C9 14.8 11.2 18.7 14 22.4L7.4 28.8C6.9 29.3 7.3 30 7.9 30H11.2L16 24.8L20.8 30H24.1C24.7 30 25.1 29.3 24.6 28.8L18 22.4C20.8 18.7 23 14.8 23 11C23 6.4 20.2 3 16 3ZM16 6.8C18.2 6.8 19.8 8.6 19.8 11C19.8 13.6 18.2 16.8 16 19.2C13.8 16.8 12.2 13.6 12.2 11C12.2 8.6 13.8 6.8 16 6.8Z"
        fill="url(#breastCancerRibbonGrad)"
        filter="url(#ribbonShadow)"
      />
    </svg>
  );
}
