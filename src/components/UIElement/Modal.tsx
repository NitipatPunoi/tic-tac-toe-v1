import { ReactNode } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity ${
        open ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`flex items-center justify-center fixed inset-0 transition-transform transform ${
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-xl shadow p-6 transition-all duration-500">{children}</div>
      </div>
    </div>
  )
}
