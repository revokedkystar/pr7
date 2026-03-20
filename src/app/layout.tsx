"use client";
import './globals.css';
import PlusGrid from './background/PlusGrid';
import { useEffect } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			import('lenis').then(({ default: Lenis }) => {
				const lenis = new Lenis({
					smoothWheel: true,
					lerp: 0.1,
				});
				function raf(time: number) {
					lenis.raf(time);
					requestAnimationFrame(raf);
				}
				requestAnimationFrame(raf);
			});
		}
	}, []);

	return (
		<html lang="en">
			<body className="bg-black text-white">
				{/* PlusGrid background */}
				<PlusGrid />
				{children}
			</body>
		</html>
	);
}
