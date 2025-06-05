"use client";

import { Badge, badgeVariants } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { useEffect, useState } from "react";

interface PaymentLinks {
	monthly?: string;
	yearly?: string;
}

enum PopularPlanType {
	NO = 0,
	YES = 1,
}

interface PricingProps {
	title: string;
	popular: PopularPlanType;
	price: number;
	description: string;
	buttonText: string;
	benefitList: string[];
	billing: string;
	planType: 'free' | 'monthly' | 'yearly';
}

export const Pricing = () => {
	const [paymentLinks, setPaymentLinks] = useState<PaymentLinks>({});

	useEffect(() => {
		fetch('/api/payment-links')
			.then(res => res.json())
			.then(data => setPaymentLinks(data))
			.catch(console.error);
	}, []);

	const pricingList: PricingProps[] = [
		{
			title: "Free",
			popular: 0,
			price: 0,
			description: "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
			buttonText: "Get Started",
			benefitList: ["1 Team member", "2 GB Storage", "Upto 4 pages", "Community support", "lorem ipsum dolor"],
			billing: "/month",
			planType: 'free'
		},
		{
			title: "Premium",
			popular: 1,
			price: 10,
			description: "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
			buttonText: "Buy Now",
			benefitList: ["4 Team member", "4 GB Storage", "Upto 6 pages", "Priority support", "lorem ipsum dolor"],
			billing: "/month",
			planType: 'monthly'
		},
		{
			title: "Enterprise",
			popular: 0,
			price: 99,
			description: "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
			buttonText: "Buy Now",
			benefitList: ["10 Team member", "8 GB Storage", "Upto 10 pages", "Priority support", "lorem ipsum dolor"],
			billing: "/year",
			planType: 'yearly'
		},
	];

	const handlePaymentClick = (planType: 'free' | 'monthly' | 'yearly') => {
		if (planType === 'free') return;
		
		const link = planType === 'monthly' ? paymentLinks.monthly : paymentLinks.yearly;
		if (link) {
			window.location.href = link;
		}
	};

	return (
		<section id='pricing' className='w-full flex justify-center items-center py-24 sm:py-32'>
			<div className='w-full max-w-7xl px-4 flex flex-col items-center'>
				<h2 className='text-3xl md:text-4xl font-bold text-center'>
					Get
					<span className='bg-gradient-to-b from-[#667EEA] to-[#764BA2] uppercase text-transparent bg-clip-text'>
						{" "}
						Unlimited{" "}
					</span>
					Access
				</h2>
				<h3 className='text-xl text-center text-muted-foreground pt-4 pb-8 max-w-2xl'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias reiciendis.
				</h3>
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center'>
					{pricingList.map((pricing: PricingProps) => (
						<Card
							key={pricing.title}
							className={`w-full max-w-sm ${
								pricing.popular === PopularPlanType.YES
									? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
									: ""
							}`}
						>
							<CardHeader>
								<CardTitle className='flex item-center justify-between'>
									{pricing.title}
									{pricing.popular === PopularPlanType.YES ? (
										<Badge className={badgeVariants({ variant: "secondary" })}>
											Most popular
										</Badge>
									) : null}
								</CardTitle>
								<div>
									<span className='text-3xl font-bold'>${pricing.price}</span>
									<span className='text-muted-foreground'> {pricing.billing}</span>
								</div>
								<CardDescription>{pricing.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<button
									onClick={() => handlePaymentClick(pricing.planType)}
									className={`${buttonVariants()} w-full bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
								>
									{pricing.buttonText}
								</button>
							</CardContent>
							<hr className='w-4/5 m-auto mb-4' />
							<CardFooter className='flex'>
								<div className='space-y-4'>
									{pricing.benefitList.map((benefit: string) => (
										<span key={benefit} className='flex'>
											<Check className='text-purple-500' /> <h3 className='ml-2'>{benefit}</h3>
										</span>
									))}
								</div>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};
