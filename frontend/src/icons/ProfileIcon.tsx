import * as React from "react"
import Svg, {
  SvgProps,
  G,
  Ellipse,
  Mask,
  Path,
  Defs,
  ClipPath,
} from "react-native-svg"

export const ProfileIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    {...props}
    preserveAspectRatio="xMinYMin slice"
    viewBox="0 0 154 160"
  >
    <G filter="url(#a)">
      <Ellipse cx={74.058} cy={75.69} fill="#D9D9D9" rx={70.652} ry={73.69} />
    </G>
    <G clipPath="url(#b)">
      <Mask
        id="c"
        width={150}
        height={151}
        x={1}
        y={2}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <Path
          fill="#fff"
          d="M151 77.834c0-41.422-33.579-75-75-75s-75 33.578-75 75c0 41.421 33.579 75 75 75s75-33.579 75-75Z"
        />
      </Mask>
      <G mask="url(#c)">
        <Path fill="#D3BDE5" d="M151 2.834H1v150h150v-150Z" />
        <Path
          fill="#C2E5D5"
          d="M9.148 5.431c-30.782 27.716-33.267 75.139-5.55 105.921 27.716 30.782 75.138 33.267 105.92 5.551 30.782-27.717 33.267-75.139 5.551-105.92C87.353-19.8 39.931-22.286 9.149 5.43Z"
        />
        <Path
          stroke="#000"
          strokeLinecap="round"
          strokeWidth={4.167}
          d="M47.535 58.7c8.832 2.966 17.084 1.806 24.756-3.48"
        />
        <Path
          fill="#000"
          d="M34.9 43.645c-.32-2.28-1.965-3.932-3.675-3.692-1.709.24-2.835 2.283-2.514 4.561.32 2.28 1.965 3.932 3.674 3.692 1.71-.24 2.835-2.283 2.515-4.561ZM84.413 36.686c-.32-2.279-1.965-3.931-3.674-3.691-1.71.24-2.835 2.282-2.515 4.56.32 2.28 1.966 3.932 3.675 3.692 1.709-.24 2.835-2.282 2.514-4.561Z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="b">
        <Path fill="#fff" d="M1 2.834h150v150H1z" />
      </ClipPath>
    </Defs>
  </Svg>
)