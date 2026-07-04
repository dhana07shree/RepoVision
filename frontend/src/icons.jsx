// Small hand-rolled line icons — no icon library needed.
const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const UploadIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 16V4M12 4l-4 4M12 4l4 4" />
    <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
  </svg>
)

export const GridIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.4" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.4" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.4" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.4" />
  </svg>
)

export const ChatIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M21 12a7 7 0 0 1-7 7H8l-5 3 1.2-4.7A7 7 0 1 1 21 12Z" />
  </svg>
)

export const MicIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="9" y="2.5" width="6" height="11" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
    <path d="M12 17.5V21M9 21h6" />
  </svg>
)

export const DocIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M7 2.5h7l4 4V20a1.2 1.2 0 0 1-1.2 1.2H7A1.2 1.2 0 0 1 5.8 20V3.7A1.2 1.2 0 0 1 7 2.5Z" />
    <path d="M14 2.5V7h4.2" />
    <path d="M8.5 12h7M8.5 15.5h7M8.5 18.5h4" />
  </svg>
)

export const CheckIcon = (props) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const InboxIcon = (props) => (
  <svg {...base} width="34" height="34" strokeWidth="1.4" {...props}>
    <path d="M4 12h4.5l1.5 3h4l1.5-3H20" />
    <path d="M6 4h12l2 8v6a1.4 1.4 0 0 1-1.4 1.4H5.4A1.4 1.4 0 0 1 4 18V12Z" />
  </svg>
)
