#!/usr/bin/env python3

import struct
from redis import Redis
import numpy as np
import msgpack
import msgpack_numpy as m
m.patch() 

class Cache():
   def __init__(self):
      self.db = Redis(host='redis', port=6379, db=0)
      # self.db = Redis(host='host.docker.internal', port=6379, db=0)

   def saveAudioNumpy(self, key, data):
      print(f"Saving Audio - {key} file to cache")
      packed = m.packb(data)
      self.db.set(key, packed)
   
   def getAudioNumpy(self, key):
      print(f"Retriving Audio - {key} from cache")
      cached = self.db.get(key)
      if(cached is None): return None   
      unpacked = m.unpackb(cached)
      return unpacked

   def save(self, key, data):
      self.db.set(key, data)

   def get(self, key):
       self.db.get(key)

