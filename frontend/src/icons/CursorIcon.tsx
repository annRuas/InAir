import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export const CursorIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    {...props}
    preserveAspectRatio="xMinYMin slice"
    viewBox="0 0 24.36 13.18"
  >
    <Path fill="#737373" d="M.7 6.802 15.99 1.034l.102 11.258L.7 6.802Z" />
    <Path fill="#737374" d="M16 6h9v1h-9V6Z" />
  </Svg>
);
