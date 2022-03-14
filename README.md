http://localhost:3000/static/index.html?book=ponniyinselvan&chapter=1.4

# https://www.chennailibrary.com/kalki/sivakamiyinsabatham/ss1-9.html
# http://book.ponniyinselvan.in/part-1/chapter-1.html
# youtube-dl -x --audio-format wav --yes-playlist --playlist-start 1 "<URL>"
# https://www.youtube.com/watch?v=eiAaGBwWHbM&list=PLYQQLwd0OXcSX3y9Qu5CgWNGvA2hNtqfy&index=39
# youtube-dl --proxy "http://87.197.156.62:23500" -x --audio-format wav --yes-playlist --playlist-start 63 "https://www.youtube.com/watch?v=kvhW7dcRl8o&list=PLYQQLwd0OXcSX3y9Qu5CgWNGvA2hNtqfy"




# Audio Split Properties

## PonniyinSlevan-1.1 to 1.8
split_signal -> silence_threshold - top_db = 75
trim_signal - top_db = 20
write_wav -> samplerate=22050, subtype='PCM_16'

## PonniyinSlevan-1.9
split_signal -> silence_threshold - top_db = 95
trim_signal - top_db = 20
write_wav -> samplerate=22050, subtype='PCM_16'

## PonniyinSlevan-1.10
split_signal -> silence_threshold - top_db = 96
trim_signal - top_db = 20
write_wav -> samplerate=22050, subtype='PCM_16'
