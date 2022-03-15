import numpy as np
import librosa
import soundfile as sf
import os
from cache import Cache


class Segmenter():
    """
    Segenment given audio signal based on silence
    Parameters: 
    Returns:
    """

    def __init__(self):
        self.cache = Cache()

    def load_audio(self, sound_file_path):
        cached = self.cache.getAudioNumpy(sound_file_path)
        if(cached is None):
            print('loading fresh audio..')
            left_channel, srate = librosa.load(sound_file_path)
            self.cache.saveAudioNumpy(sound_file_path, left_channel)
            self.cache.save('srate', srate)
            return left_channel, srate
        else:
            print('loading from cached data..')
            return cached, int(self.cache.get('srate') or 22050)
            
    def segment_on_silence(self, sound_file_path, destination, title, silence_threshold_in_db=75, trim_threshold_in_db=20):
        print(f'processing {sound_file_path} with silence_threshold of {silence_threshold_in_db}')
        left_channel, srate = self.load_audio(sound_file_path)
        print(f'Input signal is in the shape of {left_channel.shape} and sample rate is {srate}')
        sound_filename = self.get_sound_filename(sound_file_path)
        chunks_with_start_and_end_samples = self.split_signal(left_channel, silence_threshold_in_db)
        splited_segments = self.chunks_to_signal(left_channel, chunks_with_start_and_end_samples)
        trimed_segments = [self.get_trimmed_signal_with_meta(seg, seg['signal'], trim_threshold_in_db, sound_file_path) for seg in splited_segments]
        meta = self.write_wav_files(trimed_segments, srate, sound_filename, destination, title)
        return meta

    def segment_on_samples(self, title, sound_file_path, destination, start, end, file_prefix, trim_threshold_in_db=20):
        print(f'processing {sound_file_path} ')
        left_channel, srate = self.load_audio(sound_file_path)
        print(f'Input signal is in the shape of {left_channel.shape} and sample rate is {srate}')
        sound_filename = self.get_sound_filename(sound_file_path)
        segments = self.chunks_to_signal(left_channel, np.array([[start, end]]))
        trimed_segments = [self.get_trimmed_signal_with_meta(seg, np.array(seg['signal']), trim_threshold_in_db, sound_file_path) for seg in segments]
        meta = self.write_wav_files(trimed_segments, srate, f'{sound_filename}_{file_prefix}', destination, title)
        return meta

    def get_trimmed_signal_with_meta(self, seg, signal, trim_threshold, sound_file_path):
        return {**seg, **{'signal': self.trim_signal(signal, trim_threshold), 'sound_file_path': sound_file_path}}

    def write_wav_files(self, segments, srate, prefix, destination, title):
        meta = []
        for idx, seg in enumerate([i for i in segments]):
            wavs_path = f'{destination.rstrip("/")}'
            isExist = os.path.exists(wavs_path)
            if not isExist:
                os.makedirs(wavs_path)
            signal = seg['signal']
            if len(signal) > 0:  # we will have some empty segments.
                filename = f"{wavs_path}/{prefix}-{str(idx).zfill(7)}.wav"
                meta.append(self.get_meta(seg, filename, srate, title))
                sf.write(filename, data=signal,samplerate=srate, subtype='PCM_16')
        return meta

    def chunks_to_signal(self, orginal_signal, frames):
        # f[0].item() is to convert numpy.int64 to python datatype
        segments = [{'start': f[0].item(), 'end': f[-1].item(),
                     'signal': orginal_signal[f[0]:f[-1]]} for f in frames]
        return segments

    def split_signal(self, signal, silence_threshold=75):
        non_silence_frames = librosa.effects.split(
            signal, top_db=silence_threshold)
        return non_silence_frames

    def trim_signal(self, signal, trim_threshold=20):
        return librosa.effects.trim(signal, top_db=trim_threshold)[0]

    def get_sound_filename(self, sound_file_path):
        return os.path.splitext(os.path.basename(sound_file_path))[0]

    def get_meta(self, segment_with_meta, filename, srate, title):
        seg = segment_with_meta
        start = seg['start']
        end = seg['end']
        duration = (end - start)/srate
        return {'title': title, 'start': start, 'end': end, 'filename': filename, 'source': seg['sound_file_path'], 'duration': duration, 'srate': srate}
