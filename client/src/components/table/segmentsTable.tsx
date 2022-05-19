import { Segment } from "../../models";
import { audioUrl } from "../../config";
import lodash from "lodash";
import { duration } from "duration-pretty";

type Props = {
  segments: Segment[];
};

export const SegmentsTable = ({ segments }: Props) => {
  const sortedSegments = lodash.sortBy(segments, (s) => s.endSample);
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <td>Filename</td>
          <td>Start Sample</td>
          <td>End Sample</td>
          <td>Duration</td>
          <td>Audio</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {sortedSegments.slice(1, 5).map((segment, i) => {
          return (
            <tr key={segment.id}>
              <td>{segment.filename}</td>
              <td>{segment.startSample}</td>
              <td>{segment.endSample}</td>
              <td>
                {duration(segment.duration || 0, "seconds").format("HH:mm:ss")}
              </td>
              <td>
                <audio
                  controls
                  src={`${audioUrl}?path=${segment.fileAbsolutePath}`}
                />
              </td>
              <td>
                <i
                  className="bi bi-scissors px-2 text-primary fs-5 segment"
                  onClick={() => {}}
                ></i>
                <i
                  className="bi bi-trash px-2 text-danger fs-5 delete"
                  onClick={() => {}}
                ></i>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
