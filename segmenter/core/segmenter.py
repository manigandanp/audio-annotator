import os
import numpy as np
import librosa
from core.cache import Cache

class Segmenter():
  def __init__(self):
      self.cache = Cache()

  def load_audio(self, source):
    cached = self.cache.getAudioNumpy(source)
    if(cached is None):
        print('loading fresh audio..')
        left_channel, srate = librosa.load(source)
        self.cache.saveAudioNumpy(source, left_channel)
        self.cache.save('srate', srate)
        return left_channel, srate
    else:
        print('loading from cached data..')
        return cached, int(self.cache.get('srate') or 22050)

  def samples_to_segments(self, original_signal, segments_with_start_end_samples):
    return [original_signal[samples[0]:samples[-1]] for samples in segments_with_start_end_samples]

  def trim_signal(self, signal, trim_threshold_in_db = 20):
    return librosa.effects.trim(signal, top_db=trim_threshold_in_db)[0]
  
  def trim_signals(self, segments, trim_threshold_in_db):
    return [self.trim_signal(seg, trim_threshold_in_db) for seg in segments]
      

class SilenceSegmenter(Segmenter):

  def split_signal(self, signal, silence_threshold = 75):
    return librosa.effects.split(signal, top_db=silence_threshold)

  def segment(self, source, silence_threshold_in_db, trim_threshold_in_db):
    left_channel, sample_rate = super().load_audio(source)
    segments_with_start_end_samples = self.split_signal(left_channel, silence_threshold_in_db)
    segmented_signals = super().samples_to_segments(left_channel, segments_with_start_end_samples)
    trimed_segments = super().trim_signals(segmented_signals, trim_threshold_in_db)
    return {
        'source': source,
        'source_shape': left_channel.shape, 
        'sample_rate': sample_rate, 
        'segments_as_samples': segments_with_start_end_samples, 
        'segmented_signals': trimed_segments
      }


class SamplesSegmenter(Segmenter):
  def segment(self, source, start_sample, end_sample, trim_threshold_in_db):
    left_channel, sample_rate = super().load_audio(source)
    segments_with_start_end_samples = np.array([[start_sample, end_sample]])
    segmented_signals = super().samples_to_segments(left_channel, segments_with_start_end_samples)
    trimed_segments = super().trim_signals(segmented_signals, trim_threshold_in_db) if trim_threshold_in_db > 0 else segmented_signals
    return {
        'source': source,
        'source_shape': left_channel.shape, 
        'sample_rate': sample_rate, 
        'segments_as_samples': segments_with_start_end_samples, 
        'segmented_signals': trimed_segments
    }



if __name__ == '__main__':
  silence_seg = SilenceSegmenter()
  source = "/Users/manigandan.p/myProjects/tamil-audios/youtube/1.41.wav"
  silence_threshold_in_db = 60
  trim_threshold_in_db = 20
  result = silence_seg.segment(source, silence_threshold_in_db, trim_threshold_in_db)
  print(result['source_shape'], result['sample_rate'], result['segments_as_samples'][0:4])

  samples_segmenter = SamplesSegmenter()
  source = "/Users/manigandan.p/myProjects/tamil-audios/youtube/1.41.wav"
  trim_threshold_in_db = 20
  start = 26112
  end = 46592
  result = samples_segmenter.segment(source, start, end, trim_threshold_in_db)
  print(result['source_shape'], result['sample_rate'], result['segments_as_samples'])
  
