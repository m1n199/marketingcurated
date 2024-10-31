import { eventHandler } from 'h3'
import { getServerSession } from '#auth'

export default eventHandler(async (event) => {
  const session = await getServerSession(event)
  event.context.isAuthenticated = !!session
})