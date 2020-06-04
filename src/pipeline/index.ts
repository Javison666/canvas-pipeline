import { PipelineOpt, PipelineDataOpt, BranchOpt } from "./interface"
// animate config
let lineDashOffset = 0

class Pipeline {
    public ctx: CanvasRenderingContext2D;
    public data: PipelineDataOpt[] = [];
    // frame fill color
    public colorFrame = "#dadada";
    // frame line width
    public lineWidthFrame = 10;
    // dash fill color
    public colorDash = "#1b65f9";
    // dash line width
    public lineWidthDash = 6;
    // dash empty width
    public lineDashEmpty = 2;
    constructor(opt: PipelineOpt) {
        this.ctx = opt.ctx;
        this.data = opt.data;
        if(opt.colorFrame){
            this.colorFrame = opt.colorFrame
        }
        if(opt.colorDash){
            this.colorDash = opt.colorDash
        }
        if(opt.lineWidthFrame){
            this.lineWidthFrame = opt.lineWidthFrame
        }
        if(opt.lineWidthDash){
            this.lineWidthDash = opt.lineWidthDash
        }
        if(opt.lineDashEmpty){
            this.lineDashEmpty = opt.lineDashEmpty
        }
        if(lineDashOffset%(this.lineDashEmpty+this.lineWidthDash)==0){
            lineDashOffset = 0;
        }
        lineDashOffset = lineDashOffset - .5;
        this.render();
    }
    render() {
        // draw frame
        this.data.forEach((item) => {
            this.drawFrameLine(item.start[0], item.start[1], item.dest[0], item.dest[1])
            if (item.branch) {
                this.drawFrameBranch(item.branch, item.dest[0], item.dest[1])
            }
        })
        // draw pipeline
        this.data.forEach((item) => {
            this.drawLine(item.start[0], item.start[1], item.dest[0], item.dest[1])
            if (item.branch) {
                this.drawBranch(item.branch, item.dest[0], item.dest[1])
            }
        })
    }
    // draw frame branch
    drawFrameBranch(branchOpt: BranchOpt[], prevNodeX: number, prevNodeY: number) {
        branchOpt.forEach(item => {
            this.drawFrameLine(prevNodeX, prevNodeY, item.dest[0], item.dest[1])
            if (item.branch) {
                this.drawFrameBranch(item.branch, item.dest[0], item.dest[1])
            }
        })
    }
    // draw frame straight line
    drawFrameLine(startX: number, startY: number, desX: number, desY: number) {
        // draw dash pipe
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY)
        this.ctx.lineTo(desX, desY)
        this.ctx.strokeStyle = this.colorFrame;
        this.ctx.lineWidth = this.lineWidthFrame;
        this.ctx.setLineDash([0]);
        this.ctx.stroke();
        this.ctx.closePath();
        // draw point of intersection
        this.ctx.fillRect(
            desX - (this.lineWidthFrame / 2),
            desY - (this.lineWidthFrame / 2),
            this.lineWidthFrame,
            this.lineWidthFrame
        );
        this.ctx.fillStyle = this.colorFrame;
        this.ctx.fill();
    }
    // draw pipeline branch
    drawBranch(branchOpt: BranchOpt[], prevNodeX: number, prevNodeY: number) {
        branchOpt.forEach(item => {
            this.drawLine(prevNodeX, prevNodeY, item.dest[0], item.dest[1])
            if (item.branch) {
                this.drawBranch(item.branch, item.dest[0], item.dest[1])
            }
        })
    }
    // draw straight pipeline
    drawLine(startX: number, startY: number, desX: number, desY: number) {
        // draw dash pipe
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY)
        this.ctx.lineTo(desX, desY)
        this.ctx.strokeStyle = this.colorDash;
        this.ctx.lineWidth = this.lineWidthDash;
        this.ctx.setLineDash([this.lineWidthDash, this.lineDashEmpty]);
        this.ctx.lineDashOffset = lineDashOffset;
        this.ctx.stroke();
        this.ctx.closePath();
        // draw point of intersection
        this.ctx.fillRect(
            desX - (this.lineWidthDash / 2),
            desY - (this.lineWidthDash / 2),
            this.lineWidthDash,
            this.lineWidthDash
        );
        this.ctx.fillStyle = this.colorDash;
        this.ctx.fill();
    }
}
export default Pipeline