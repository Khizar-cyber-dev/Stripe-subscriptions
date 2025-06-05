import Image from "next/image";
import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Hero = () => {
	return (
		<div className='w-full flex justify-center items-center'>
			<section className='w-full max-w-7xl grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10 px-4'>
				<div className='text-center lg:text-start space-y-6 w-full'>
					<main className='text-5xl md:text-6xl font-bold text-balance'>
						<h1 className='inline'>
							<span className='inline bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-transparent bg-clip-text'>
								Stripe
							</span>{" "}
							Course with
						</h1>{" "}
						<h2 className='inline'>
							<span className='inline bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-transparent bg-clip-text'>
								Next.js
							</span>{" "}
						</h2>
					</main>
					{/* <a href=''>
						<img src='https://made-with.prisma.io/dark.svg' width={220} height={130} alt='' />
					</a> */}

					<p className='text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0 text-balance'>
						Stripe subscriptions are intimidating, but they don&apos;t have to be. Let&apos;s prove it.
					</p>

					<div className='flex flex-col md:flex-row justify-center lg:justify-start gap-4'>
						<Button 
							size="lg"
							className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white hover:opacity-90 transition-opacity"
						>
							Get Started
						</Button>

						<a
							rel='noreferrer noopener'
							href='https://github.com/leoMirandaa/shadcn-landing-page.git'
							target='_blank'
							className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8`}
						>
							Github Repository
							<GitHubLogoIcon className='ml-2 w-5 h-5' />
						</a>
					</div>
				</div>

				<div className='z-10 w-full flex justify-center'>
					<Image
						src='/hero.png'
						width={986}
						height={512}
						alt=''
						className='rounded-md select-none pointer-events-none w-full max-w-[500px]'
					/>
				</div>
			</section>
		</div>
	);
};
