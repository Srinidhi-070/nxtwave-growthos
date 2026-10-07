import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ referralCode: string }> }): Promise<Metadata> {
  const resolved = await params;
  const referralId = resolved.referralCode;
  
  // Need to provide absolute URL for OG images if possible, but relative usually works in Next.js 13+
  // We'll use a relative path and Next.js resolves it based on the request host.
  
  return {
    title: `Join ${referralId}'s Crew in GrowthOS`,
    description: "Initialize your explorer to join the AI deployment workshop.",
    openGraph: {
      title: `Join ${referralId}'s Crew in GrowthOS`,
      description: "Initialize your explorer to join the AI deployment workshop.",
      images: [
        {
          url: `/api/og/join?id=${referralId}`,
          width: 1200,
          height: 630,
          alt: "GrowthOS Crew Invite",
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `Join ${referralId}'s Crew in GrowthOS`,
      description: "Initialize your explorer to join the AI deployment workshop.",
      images: [`/api/og/join?id=${referralId}`],
    }
  };
}

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
