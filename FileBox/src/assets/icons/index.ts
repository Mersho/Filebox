/// <reference types="vite-plugin-svgr/client" />
// https://www.svgrepo.com/collection/file-type-doctype-vectors/
import AudioDocument from './audio-document.svg?react'
import BoxNotes from './box-notes.svg?react'
import CSVDocument from './csv-document.svg?react'
import EPSDocument from './eps-document.svg?react'
import ExcelDocument from './excel-document.svg?react'
import EXEDocument from './exe-document.svg?react'
import FlashDocument from './flash-document.svg?react'
import GDocDocument from './gdoc-document.svg?react'
import GDocsDocument from './gdocs-document.svg?react'
import GSheetDocument from './gsheet-document.svg?react'
import HTMLDocument from './html-document.svg?react'
import ImageDocument from './image-document.svg?react'
import MP4Document from './mp4-document.svg?react'
import MKVDocument from './mkv-document.svg?react'
import PPTDocument from './ppt-document.svg?react'
import PSDDocument from './psd-document.svg?react'
import TXTFile from './txt-document.svg?react'
import UnknownDocument from './unknown-document.svg?react'
import VideoDocument from './video-document.svg?react'
import VisioDocument from './visio-document.svg?react'
import WebexDocument from './webex-document.svg?react'
import WordDocument from './word-document.svg?react'
import DocxDocument from './docx-document.svg?react'
import PDFDocument from './pdf-document.svg?react'
import XMLDocument from './xml-document.svg?react'
import ZIPDocument from './zip-document.svg?react'
import PythonDocument from './py-document.svg?react'
import CSSDocument from './css-document.svg?react'
import APKDocument from './apk-document.svg?react'
import JSFile from './js-document.svg?react'
import FLVFile from './flv-document.svg?react'
import INIFile from './ini-document.svg?react'
import PHPFile from './php-document.svg?react'
import SQLFile from './sql-document.svg?react'
import SVGDocument from './svg-document.svg?react'
import ACCDocument from './acc-document.svg?react'
import RARDocument from './rar-document.svg?react'
import XLSXDocument from './xlsx-document.svg?react'
import SRTFile from './srt-document.svg?react'
import GoDocument from './go-document.svg?react'
import BackSquare from './back-square.svg?react'
import Folder from './Folder.svg?react'
import ThreeDots from './three-dots.svg?react'

export const icons = {
  audio: AudioDocument,
  boxNotes: BoxNotes,
  'csv': CSVDocument,
  'eps': EPSDocument,
  'xls': ExcelDocument,
  'exe': EXEDocument,
  'fla': FlashDocument,
  gdoc: GDocDocument,
  gdocs: GDocsDocument,
  gsheet: GSheetDocument,
  'html': HTMLDocument,
  'jpg': ImageDocument,
  'png': ImageDocument,
  'mp4': MP4Document,
  'mkv': MKVDocument,
  'ppt': PPTDocument,
  'pptx': PPTDocument,
  'psd': PSDDocument,
  'txt': TXTFile,
  'js': JSFile,
  unknown: UnknownDocument,
  video: VideoDocument,
  'vis': VisioDocument,
  webex: WebexDocument,
  'doc': WordDocument,
  'docx': DocxDocument,
  'pdf': PDFDocument,
  'xml': XMLDocument,
  'zip': ZIPDocument,
  'py': PythonDocument,
  'css': CSSDocument,
  'apk': APKDocument,
  'flv': FLVFile,
  'ini': INIFile,
  'php': PHPFile,
  'sql': SQLFile,
  'svg': SVGDocument,
  'acc': ACCDocument,
  'rar': RARDocument,
  'xlsx': XLSXDocument,
  'srt': SRTFile,
  'go': GoDocument,
  back: BackSquare,
  folder: Folder,
  threeDots: ThreeDots,
}

export type IconName = keyof typeof icons
