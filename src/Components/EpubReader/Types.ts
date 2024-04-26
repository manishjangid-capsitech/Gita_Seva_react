import * as React from "react";
import { BookOptions } from "epubjs/types/book";
import { RenditionOptions } from "epubjs/types/rendition";
import { Contents, Rendition } from "epubjs";

export interface IEpubViewProps {
  url: string | ArrayBuffer;
  epubInitOptions?: BookOptions;
  epubOptions?: RenditionOptions;
  styles?: IEpubViewStyles;
  loadingView?: React.ReactNode;
  location?: string | number;
  showToc?: boolean;
  heading?(value: string): void;
  subHeading?(value: string): void;
  locationChanged?(value: string | number): void;
  tocChanged?(value: IToc): void;
  getRendition?(rendition: Rendition): void;
  handleKeyPress?(): void;
  handleTextSelected?(cfiRange: string, contents: Contents): void;
}

export interface IEpubViewStyles {
  viewHolder: React.CSSProperties;
  view: React.CSSProperties;
}

export interface IToc {
  label: string;
  href: string;
}

export interface IEpubReaderStyles {
  container?: React.CSSProperties;
  readerArea?: React.CSSProperties;
  containerExpanded?: React.CSSProperties;
  titleArea?: React.CSSProperties;
  reader?: React.CSSProperties;
  swipeWrapper?: React.CSSProperties;
  prev?: React.CSSProperties;
  next?: React.CSSProperties;
  arrow?: React.CSSProperties;
  arrowHover?: React.CSSProperties;
  tocBackground?: React.CSSProperties;
  tocArea?: React.CSSProperties;
  tocAreaWidth?: React.CSSProperties;
  tocAreaButton?: React.CSSProperties;
  tocButton?: React.CSSProperties;
  tocButtonExpanded?: React.CSSProperties;
  tocButtonBar?: React.CSSProperties;
  tocButtonBarTop?: React.CSSProperties;
  tocButtonBarBottom?: React.CSSProperties;
  loadingView?: React.CSSProperties;
  toc?: React.CSSProperties;
  tocButtonBottom?: React.CSSProperties;
}
