import soundfile as sf

class WavWriter():
  def write(self, filename, signal, sample_rate):
    sf.write(filename, data=signal,samplerate=sample_rate, subtype='PCM_16')