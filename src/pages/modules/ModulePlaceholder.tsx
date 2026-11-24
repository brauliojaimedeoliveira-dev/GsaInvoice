
import { Construction } from 'lucide-react'

interface ModulePlaceholderProps {
  title: string
  description: string
}

export default function ModulePlaceholder({
  title,
  description,
}: ModulePlaceholderProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-purple-200 bg-white p-8 text-center">

      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
        <Construction size={30} />
      </div>

      <h1 className="text-2xl font-bold text-gray-900">
        {title}
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
        {description}
      </p>

      <span className="mt-6 rounded-full bg-purple-50 px-4 py-2 text-xs font-semibold text-purple-600">
        Módulo em desenvolvimento
      </span>

    </div>
  )
}
