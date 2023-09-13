export type LindenmayerSettings = {
	interations: number,
	seed: number,
	variability: number,
	leavesSettings: LeavesSettings,
	branchesSettings: BranchesSettings
}

export type LeavesSettings = {
	color: string,
	length: number,
	width: number,
}

export type BranchesSettings = {
	color: string,
	alpha: number,
	length: number,
	width: number,
	angle: number,
	fallof: number,
}
