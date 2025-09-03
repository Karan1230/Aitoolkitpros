
export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="p-4 sm:p-6 md:p-8">
            {children}
        </div>
    )
  }
