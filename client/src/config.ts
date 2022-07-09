let baseUrl: string
const annotatorPort = 3000
if (process.env.NODE_ENV === 'production') {
  baseUrl = ''
} else {
  baseUrl = `http://localhost:${annotatorPort}`
}

export const titlesUrl = `${baseUrl}/api/titles`;
export const projectsUrl = `${baseUrl}/api/projects`;
export const projectsSummaryUrl = `${projectsUrl}/summary`
export const segmentsUrl = `${baseUrl}/api/segments`;
export const silenceSegmentsUrl = `${segmentsUrl}/silence`;
export const sampleSegmentsUrl = `${segmentsUrl}/samples`;
export const annotationsUrl = `${baseUrl}/api/annotations`
export const audioUrl = `${baseUrl}/audio`;
