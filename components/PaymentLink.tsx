"use client";

import { buttonVariants } from "./ui/button";
import { useEffect, useState } from "react";

type PaymentLinkProps = {
	paymentLink?: string;
	text: string;
};

const PaymentLink = ({ paymentLink, text }: PaymentLinkProps) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div className={`${buttonVariants()} w-full bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
				{text}
			</div>
		);
	}

	const handleClick = () => {
		if (paymentLink) {
			window.location.href = paymentLink;
		}
	};

	return (
		<button
			onClick={handleClick}
			className={`${buttonVariants()} w-full bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
		>
			{text}
		</button>
	);
};

export default PaymentLink;