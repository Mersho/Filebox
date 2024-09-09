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
import PPTDocument from './ppt-document.svg?react'
import PSDDocument from './psd-document.svg?react'
import TXTFile from './txt-document.svg?react'
import UnknownDocument from './unknown-document.svg?react'
import VideoDocument from './video-document.svg?react'
import VisioDocument from './visio-document.svg?react'
import WebexDocument from './webex-document.svg?react'
import WordDocument from './word-document.svg?react'
import PDFDocument from './pdf-document.svg?react'
import XMLDocument from './xml-document.svg?react'
import ZIPDocument from './zip-document.svg?react'
import folder from './Folder.svg?react'
import ThreeDots from './three-dots.svg?react'

export const icons = {
  audio: AudioDocument,
  boxNotes: BoxNotes,
  csv: CSVDocument,
  eps: EPSDocument,
  excel: ExcelDocument,
  exe: EXEDocument,
  flash: FlashDocument,
  gdoc: GDocDocument,
  gdocs: GDocsDocument,
  gsheet: GSheetDocument,
  html: HTMLDocument,
  image: ImageDocument,
  mp4: MP4Document,
  ppt: PPTDocument,
  psd: PSDDocument,
  txt: TXTFile,
  unknown: UnknownDocument,
  video: VideoDocument,
  visio: VisioDocument,
  webex: WebexDocument,
  word: WordDocument,
  pdf: PDFDocument,
  xml: XMLDocument,
  zip: ZIPDocument,
  folder: folder,
  threeDots: ThreeDots,
}

export type IconName = keyof typeof icons
