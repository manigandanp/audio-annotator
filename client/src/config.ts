let host: string;

if (process.env.NODE_ENV === 'production') {
  host = 'annotator'
} else {
  host = 'localhost:3000'
}

export const baseUrl = `http://${host}`;

export const titlesUrl = `${baseUrl}/api/titles`;
export const projectsUrl = `${baseUrl}/api/projects`;
export const segmentsUrl = `${baseUrl}/api/segments`;
export const silenceSegmentsUrl = `${segmentsUrl}/silence`;
export const sampleSegmentsUrl = `${segmentsUrl}/samples`;
export const annotationsUrl = `${baseUrl}/api/annotations`
export const audioUrl = `${baseUrl}/audio`;
