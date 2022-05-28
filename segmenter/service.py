from core.segmenter import SilenceSegmenter, SamplesSegmenter
from core.wavwriter import WavWriter
from utils import Utils
from os import environ

silence_segmenter = SilenceSegmenter()
samples_segmenter = SamplesSegmenter()
wavs_writer = WavWriter()
utils = Utils()

DATA_FOLDER = '/data' if(environ["APP_ENV"] == 'production') else "../data"

def get_title_and_path(project, source_file_path):
    project_folder = project.replace(' ', '_')
    title = utils.filename_from_path(source_file_path)
    base_path = '{}/{}/{}'.format(DATA_FOLDER, project_folder, title)
    wavs_path = utils.create_path(f'{base_path}/wavs')
    return title, wavs_path


def generate_filenames(segments, title, wavs_path):
    result = []
    for segment in segments:
        # filename = f"{title}-{str(idx).zfill(7)}.wav"
        filename = f"{title}-{segment['start_sample']}_{segment['end_sample']}.wav"
        file_absolute_path = f"{wavs_path}/{filename}"
        result.append({**segment,  'filename': filename,
                      'file_absolute_path': file_absolute_path, })
    return result


def get_valid_segments(result, title, wavs_path):
    segments = result['segmented_signals']
    samples = result['segments_as_samples']
    segments_with_samples = list(zip(segments, samples))
    filtered_segments = []
    for signal, start_end_sample in segments_with_samples:
        if len(signal) > 0:
            start_sample = start_end_sample[0].item()
            end_sample = start_end_sample[-1].item()
            sample_rate = result['sample_rate']
            filtered_segments.append({
                'start_sample': start_sample,
                'end_sample': end_sample,
                'signal': signal,
                'duration': get_duration(start_sample, end_sample, sample_rate)
            })
    return filtered_segments


def get_duration(start, end, sample_rate):
    return (end - start)/sample_rate


def get_meta(project, source_file_path, result):
    title, wavs_path = get_title_and_path(project, source_file_path)
    filtered_segments = get_valid_segments(result, title, wavs_path)
    segemnts_with_filename = generate_filenames(
        filtered_segments, title, wavs_path)
    sample_rate = result['sample_rate']
    source_duration = get_duration(0, result['source_shape'][0], sample_rate)
    meta = {
        'source': result['source'],
        'sample_rate': sample_rate,
        'source_duration': source_duration,
        'segments': segemnts_with_filename}
    return meta


def segement_on_silence(project, source_file_path, silence_threshold_in_db, trim_threshold_in_db):
    result = silence_segmenter.segment(
        source_file_path, silence_threshold_in_db, trim_threshold_in_db)
    return get_meta(project, source_file_path, result)


def segment_on_samples(project, source_file_path, start_sample, end_sample, trim_threshold_in_db):
    result = samples_segmenter.segment(
        source_file_path, start_sample, end_sample, trim_threshold_in_db)
    return get_meta(project, source_file_path, result)


def write_wav_files(segments, sample_rate):
    result = []
    for segment_obj in segments:
        file_absolute_path = segment_obj['file_absolute_path']
        signal = segment_obj['signal']
        wavs_writer.write(file_absolute_path, signal, sample_rate)
        result.append({**segment_obj, 'signal': None})
    return result


if __name__ == '__main__':
    source = '/Users/manigandan.p/myProjects/tamil-audios/youtube/1.41.wav'
    project = 'test tamil pro'
    silence_threshold_in_db = 75
    trim_threshold_in_db = 20
    # result = segement_on_silence(
    #     project, source, silence_threshold_in_db, trim_threshold_in_db)
    # print(result)

    trim_threshold_in_db = 20
    start = 26112
    end = 46592
    result = segment_on_samples(
        project, source, start, end, trim_threshold_in_db)
    print(result)
