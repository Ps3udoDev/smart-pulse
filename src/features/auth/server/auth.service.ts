import { createServerSB } from '@/utils/supabase/server'

export async function getSession() {
  const sb = await createServerSB()
  const { data } = await sb.auth.getSession()
  return data.session
}

export async function getUser() {
  const sb = await createServerSB()
  const { data } = await sb.auth.getUser()
  return data.user
}
