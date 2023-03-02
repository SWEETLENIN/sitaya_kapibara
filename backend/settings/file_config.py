import pathlib
from pydantic import BaseSettings
from typing import Optional


class FileConfig(BaseSettings):
    tmp_dir: str
    expires_sec: int
    path: Optional[pathlib.Path]
    scheduler_sec: int
    doc_dir: str
    doc_path: Optional[pathlib.Path]
    doc_tno_dir: str
    doc_tno_path: Optional[pathlib.Path]

    def create_tmp_path(self):
        self.path = pathlib.Path(self.tmp_dir)
        return self.path

    def create_doc_path(self):
        self.doc_path = pathlib.Path(self.doc_dir)
        return self.doc_path

    def create_doc_tno_path(self):
        self.doc_tno_path = pathlib.Path(self.doc_tno_dir)
        return self.doc_tno_path

    class Config:
        env_prefix = 'FILE_'
        env_file = './backend/config/config.env'


FILE_CONFIG = FileConfig()
FILE_CONFIG.create_tmp_path()
FILE_CONFIG.path.mkdir(parents=True, exist_ok=True)
FILE_CONFIG.create_doc_path()
FILE_CONFIG.doc_path.mkdir(parents=True, exist_ok=True)
FILE_CONFIG.create_doc_tno_path()
FILE_CONFIG.doc_tno_path.mkdir(parents=True, exist_ok=True)

