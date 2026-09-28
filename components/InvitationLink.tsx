"use client";
import { isInvitationToken } from "@/lib/invitation-token";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, type ComponentProps } from "react";
type Props = Omit<ComponentProps<typeof NextLink>, "href"> & { href: string };
function PersonalizedLink({ href, ...props }: Props) {
  const token = useSearchParams().get("token");
  let destination = href;
  if (isInvitationToken(token) && href.startsWith("/") && !href.startsWith("//")) {
    const url = new URL(href, "https://invitation.local");
    url.searchParams.set("token", token);
    if (url.pathname === "/") url.searchParams.set("abierta", "1");
    destination = url.pathname + url.search + url.hash;
  }
  return <NextLink {...props} href={destination} />;
}
export default function InvitationLink(props: Props) {
  return <Suspense fallback={<span className={props.className}>{props.children}</span>}><PersonalizedLink {...props} /></Suspense>;
}
