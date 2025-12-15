import { FC, PropsWithChildren } from 'react'

export const IconCenter: FC<PropsWithChildren> = ({ children }) => {
  return <div className="w-6 h-6 flex justify-center items-center">{children}</div>
}
