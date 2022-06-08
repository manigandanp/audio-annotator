import { duration } from "duration-pretty";

const formatDuration = (num: number) =>
  duration(num, "seconds").format("HH:mm:ss");

export { formatDuration };
