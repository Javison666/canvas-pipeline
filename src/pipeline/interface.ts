export interface PipelineOpt{
    ctx: CanvasRenderingContext2D,
    data: PipelineDataOpt[],
    colorFrame?: string,
    colorDash?: string,
    lineWidthFrame?: number,
    lineWidthDash?: number,
    lineDashEmpty?: number
}
export interface BranchOpt{
    dest:number[],
    branch?: BranchOpt[]
}
export interface PipelineDataOpt{
    start:number[],
    dest:number[],
    branch?: BranchOpt[]
}
