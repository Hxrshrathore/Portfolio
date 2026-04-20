import { Metadata } from 'next'
import ContactPage from '@/components/contact-page'

export const metadata: Metadata = {
  title: 'Contact | Harsh Kumar',
  description: 'Let\'s build something extraordinary together. Get in touch for project inquiries and collaborations.',
}

export default function Page() {
  return <ContactPage />
}
