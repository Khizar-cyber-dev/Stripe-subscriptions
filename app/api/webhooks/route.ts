import { prisma } from '@/lib/db'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'


export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)
    const eventType = evt.type

    if (eventType === 'user.created' || eventType === 'user.updated') {
      const userData = evt.data as any 
      const fullName = `${userData.first_name || ''} ${userData.last_name || ''}`.trim()
      const email = userData.email_addresses?.[0]?.email_address || ''
      const imageUrl = userData.image_url || userData.profile_image_url || ''

      if (eventType === 'user.created') {
        await prisma.user.create({
          data: {
            clerkId: userData.id,
            email,
            name: fullName,
            image: imageUrl,
          },
        })
      } else {
        await prisma.user.update({
          where: { clerkId: userData.id },
          data: {
            email,
            name: fullName,
            image: imageUrl,
          },
        })
      }
    }

    if (eventType === 'user.deleted') {
      const userData = evt.data as { id: string }
      await prisma.user.delete({
        where: { clerkId: userData.id },
      })
    }

    return new Response('Webhook received and processed', { status: 200 })
  } catch (err) {
    console.error('Error handling webhook:', err)
    return new Response('Error verifying or handling webhook', { status: 400 })
  }
}
