"use server";

import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function isUserSubscribed() {
	const { userId } = await auth();

	if (!userId) return { success: false };

	const existingUser = await prisma.user.findUnique({ where: { clerkId: userId } });

	if (!existingUser) return { success: false };

	return { success: true, subscribed: existingUser.plan === "premium" };
}
