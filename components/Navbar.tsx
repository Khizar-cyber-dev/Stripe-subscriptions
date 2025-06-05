"use client";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ModeToggle";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { UserButton, SignInButton, useAuth } from "@clerk/nextjs";
import { isUserSubscribed } from "@/premium/actions";

interface RouteProps {
	href: string;
	label: string;
}

const routeList: RouteProps[] = [
	{
		href: "/",
		label: "Home",
	},
	{
		href: "#team",
		label: "Team",
	},
	{
		href: "#testimonials",
		label: "Testimonials",
	},
];

export const Navbar = () => {
	const { isSignedIn } = useAuth();
	const { data } = useQuery({
		queryKey: ["isUserSubscribed"],
		queryFn: async () => isUserSubscribed(),
	});

	const { data: portalData } = useQuery({
		queryKey: ["portalUrl"],
		queryFn: async () => {
			const response = await fetch('/api/create-portal-link');
			if (!response.ok) throw new Error('Failed to fetch portal URL');
			return response.json();
		},
		enabled: data?.subscribed && isSignedIn,
	});

	const isSubscribed = data?.subscribed;
	console.log('Subscription status:', { isSubscribed, data });
	console.log('Portal URL:', process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL);

	return (
		<header
			className='sticky border-b-[1px] top-0 z-40 w-full  dark:border-b-slate-700 overflow-x-hidden
			bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
		'
		>
			<NavigationMenu className='mx-auto'>
				<NavigationMenuList className='container min-h-14 w-screen flex justify-between '>
					<NavigationMenuItem className='font-bold md:flex hidden'>
						<a rel='noreferrer noopener' href='/' className='ml-2 font-bold text-xl flex'>
							<span className='uppercase bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-transparent bg-clip-text'>
								🚀 Next Stripe
							</span>
						</a>
					</NavigationMenuItem>

					<nav className='md:flex gap-2'>
						{routeList.map((route: RouteProps, i) => (
							<Link
								rel='noreferrer noopener'
								href={route.href}
								key={i}
								className={`text-[17px] ${buttonVariants({
									variant: "ghost",
								})}`}
							>
								{route.label}
							</Link>
						))}
						{isSubscribed && portalData?.url && (
							<a
								rel='noreferrer noopener'
								href={portalData.url}
								target='_blank'
								className={`text-[17px] ${buttonVariants({
									variant: "ghost",
								})}`}
							>
								Billing Portal
							</a>
						)}
					</nav>

					<div className='hidden md:flex gap-2 items-center'>
						{isSignedIn ? (
							<UserButton afterSignOutUrl="/" />
						) : (
							<SignInButton mode="modal">
								<button className={`border ${buttonVariants({ variant: "secondary" })}`}>
									Login
								</button>
							</SignInButton>
						)}

						{isSubscribed && (
							<Link
								rel='noreferrer noopener'
								href='/premium'
								className={`border bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white ${buttonVariants(
									{
										variant: "secondary",
									}
								)}`}
							>
								Premium ✨
							</Link>
						)}

						<ModeToggle />
					</div>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
};
