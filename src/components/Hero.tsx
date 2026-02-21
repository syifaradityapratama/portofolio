import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import HeroClient from "./HeroClient"

async function getProfile() {
  try {
    return await client.fetch(`*[_type == "profile"][0]{
      fullName,
      headline,
      subheadline,
      profileImage,
      email,
      isAvailable,
      "resumeUrl": resume.asset->url
    }`)
  } catch (error) {
    console.warn("Failed to fetch profile (likely missing env vars):", error)
    return null
  }
}

export default async function Hero() {
  const profile = await getProfile()

  if (!profile) {
      return (
          <div className="flex min-h-dvh items-center justify-center text-zinc-400">
              Loading Profile...
          </div>
      )
  }

  // Transform data for client component
  const clientProps = {
    fullName: profile.fullName,
    headline: profile.headline,
    subheadline: profile.subheadline,
    profileImageUrl: profile.profileImage ? urlFor(profile.profileImage).width(600).height(600).url() : undefined,
    profileImageAlt: profile.profileImage?.alt,
    resumeUrl: profile.resumeUrl,
    isAvailable: profile.isAvailable ?? true,
  }

  return <HeroClient profile={clientProps} />
}
