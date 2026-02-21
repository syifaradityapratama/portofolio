import { client } from "@/sanity/lib/client"
import AboutClient from "./AboutClient"

async function getAboutData() {
  try {
    return await client.fetch(`*[_type == "profile"][0]{
      bio,
      fullName
    }`)
  } catch (error) {
    console.warn("Failed to fetch about data:", error)
    return null
  }
}

export default async function About() {
  const profile = await getAboutData()

  if (!profile?.bio) return null

  return <AboutClient bio={profile.bio} />
}
