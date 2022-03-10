http://localhost:3000/static/index.html?book=ponniyinselvan&chapter=1.4


#Audio Split Properties
##PonniyinSlevan-1.1 to 1.8
split_signal -> silence_threshold - top_db = 75
trim_signal - top_db = 20
write_wav -> samplerate=22050, subtype='PCM_16'

##PonniyinSlevan-1.9
split_signal -> silence_threshold - top_db = 95
trim_signal - top_db = 20
write_wav -> samplerate=22050, subtype='PCM_16'

##PonniyinSlevan-1.10
split_signal -> silence_threshold - top_db = 96
trim_signal - top_db = 20
write_wav -> samplerate=22050, subtype='PCM_16'
