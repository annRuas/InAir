import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export const CursorIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    {...props}
    preserveAspectRatio="xMinYMin slice"
    viewBox="0 0 24.36 13.18"
  >
    <Path
      fill="#737373"
      d="M15.89 12.008 1.28 6.796l14.514-5.475.096 10.686Z"
    />
    <Path fill="#737374" d="M16 5h9v3h-9z" />
  </Svg>
);
