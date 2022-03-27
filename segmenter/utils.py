import os

class Utils():
  def create_path(self, dir):
    if not self.path_exists(dir):
      os.makedirs(dir)
    return dir
  
  def filename_from_path(self, file_path):
    return os.path.splitext(os.path.basename(file_path))[0]

  def path_exists(self, path):
    return os.path.exists(path)
 