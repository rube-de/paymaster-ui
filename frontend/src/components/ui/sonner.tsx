import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="top-center"
      className="toaster group"
      toastOptions={{
        style: {
          background: 'rgba(0, 0, 0, 0.9)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
        },
        classNames: {
          error: 'border-red-500/30 bg-red-950/90',
          success: 'border-green-500/30 bg-green-950/90',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
