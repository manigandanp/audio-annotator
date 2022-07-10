import { RegionParams } from "wavesurfer.js/src/plugin/regions";
import Wavesurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/src/plugin/timeline";
import RegionsPlugin from "wavesurfer.js/src/plugin/regions";

export const createWaveSurfer = (regions: RegionParams[]) => {
  return Wavesurfer.create({
    container: "#waveform",
    waveColor: "#fff",
    progressColor: "#fff",
    plugins: [
      TimelinePlugin.create({ container: "#timeline" }),
      RegionsPlugin.create({
        regions: regions,
      }),
    ],
  });
};
