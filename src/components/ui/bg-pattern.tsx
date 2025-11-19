"use client";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const bgPatternVariants = cva("absolute inset-0 -z-10", {
	variants: {
		variant: {
			grid: "[background-image:linear-gradient(to_right,theme(colors.border)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border)_1px,transparent_1px)] [background-size:2.5rem_2.5rem]",
			dots: "[background-image:radial-gradient(theme(colors.border)_1.5px,transparent_1.5px)] [background-size:2.5rem_2.5rem]",
			"diagonal-stripes":
				"bg-[repeating-linear-gradient(45deg,theme(colors.border),theme(colors.border)_1px,transparent_1px,transparent_1.5rem)]",
			"horizontal-lines":
				"[background-image:linear-gradient(to_bottom,theme(colors.border)_1px,transparent_1px)] [background-size:100%_1.5rem]",
			"vertical-lines":
				"[background-image:linear-gradient(to_right,theme(colors.border)_1px,transparent_1px)] [background-size:1.5rem_100%]",
			checkerboard:
				"bg-[linear-gradient(45deg,theme(colors.border)_25%,transparent_25%),linear-gradient(-45deg,theme(colors.border)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,theme(colors.border)_75%),linear-gradient(-45deg,transparent_75%,theme(colors.border)_75%)] [background-size:3rem_3rem] [background-position:0_0,0_1.5rem,1.5rem_-1.5rem,-1.5rem_0px]",
		},
		mask: {
			none: "",
			"fade-y":
				"[mask-image:linear-gradient(to_bottom,transparent,theme(colors.background)_1.5rem,theme(colors.background)_calc(100%-1.5rem),transparent)]",
			"fade-x":
				"[mask-image:linear-gradient(to_right,transparent,theme(colors.background)_1.5rem,theme(colors.background)_calc(100%-1.5rem),transparent)]",
			"fade-top":
				"[mask-image:linear-gradient(to_bottom,transparent,theme(colors.background)_3rem)]",
			"fade-bottom":
				"[mask-image:linear-gradient(to_top,transparent,theme(colors.background)_3rem)]",
			"fade-left":
				"[mask-image:linear-gradient(to_right,transparent,theme(colors.background)_3rem)]",
			"fade-right":
				"[mask-image:linear-gradient(to_left,transparent,theme(colors.background)_3rem)]",
			"fade-center":
				"[mask-image:radial-gradient(ellipse_at_center,initial_1px,transparent_60%)]",
			"fade-edges":
				"[mask-image:radial-gradient(ellipse_at_center,initial_1px,transparent_100%)]",
		},
	},
	defaultVariants: {
		variant: "grid",
		mask: "none",
	},
});

export interface BGPatternProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof bgPatternVariants> {}

export function BGPattern({ className, variant, mask }: BGPatternProps) {
	return (
		<div
			className={cn(bgPatternVariants({ variant, mask }), className)}
		/>
	);
}