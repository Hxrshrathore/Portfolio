import { getContactMessagesAdmin } from "@/app/actions/admin"
import ContactsManager from "@/components/admin/contacts-manager"

export const revalidate = 0 // dynamically rendered

export default async function AdminContactsPage() {
  const messages = await getContactMessagesAdmin()
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Inbox</h1>
        <p className="text-sm text-neutral-400">
          Review and manage design or development inquiries submitted through your portfolio.
        </p>
      </div>

      <ContactsManager initialMessages={messages} />
    </div>
  )
}
