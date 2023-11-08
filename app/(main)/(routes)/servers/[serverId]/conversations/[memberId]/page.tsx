import { ChatHeader } from "@/components/chat/chat-header";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

interface MemberIdPageProps {
  params: {
    serverId: string;
    memberId: string;
  };
}

const MemberIdPage = async ({ params }: MemberIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const member = await db.member.findFirst({
    where: {
      id: params.memberId,
      serverId: params.serverId,
    },
    include: {
      profile: true,
    },
  });

  if (!member) {
    return redirect("/");
  }

  return (
    <div>
      <ChatHeader
        name={member.profile.name}
        serverId={params.serverId}
        type="conversation"
        imageUrl={member.profile.imageUrl}
      />
    </div>
  );
};

export default MemberIdPage;
