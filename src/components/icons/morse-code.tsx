import * as React from "react"

interface Props extends React.SVGAttributes<SVGElement> {}

function SvgMorseCode(props: Props) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.25 7.5A1.25 1.25 0 1 1 3.75 7.5a1.25 1.25 0 0 1-2.5 0ZM7.5 7.5A1.25 1.25 0 1 1 10 7.5a1.25 1.25 0 0 1-2.5 0ZM13.75 7.5A1.25 1.25 0 1 1 12.5 7.5a1.25 1.25 0 0 1 2.5 0Z"
        fill="currentColor"
      />
    </svg>
  )
}

const MorseCode = React.forwardRef<SVGSVGElement, Props>(
  (props, ref) => (
    <SvgMorseCode {...props} ref={ref} />
))
MorseCode.displayName = "MorseCode"

export { MorseCode }
