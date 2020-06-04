<template>
    <canvas ref="canvas"></canvas>
</template>
<script lang="ts">
import Vue from "vue";
import Pipeline from "./pipeline";
import pipelineData from "./pipelineOption";
export default Vue.extend({
    mounted() {
        this.init();
    },
    methods: {
        init() {
            const $canvas: HTMLCanvasElement = this.$refs.canvas;
            $canvas.width = window.innerWidth;
            $canvas.height = window.innerHeight;
            const ctx = $canvas.getContext("2d");
            const render = () => {
                // 管道1的动画
                ctx.clearRect(0, 0, $canvas.width, $canvas.height);
                const pipeline1 = new Pipeline({
                    ctx,
                    data:pipelineData
                });
                requestAnimationFrame(render);
            };
            render()
        }
    }
});
</script>
<style scoped>
</style>