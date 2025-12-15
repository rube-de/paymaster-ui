import svgPaths from '../../imports/svg-tho7mppomn'
import { FC } from 'react'

export const ROSEIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className ?? 'block size-full'}
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <g opacity="0.5">
        <path d={svgPaths.p35bbc080} fill="white" />
      </g>
    </svg>
  )
}
