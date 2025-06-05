import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
	const { userId } = await auth();
	if (!userId) return redirect("/");

	const userProfile = await prisma.user.findUnique({ where: { clerkId: userId } });
	if (userProfile?.plan === "free") return redirect("/");

	return <div className='max-w-7xl mx-auto'>You are on the premium plan so you can see this page</div>;
};
export default Page;
