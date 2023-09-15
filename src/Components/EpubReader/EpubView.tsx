import React, { Component, useState } from "react";
import Epub from "epubjs";
import { IEpubViewProps, IEpubViewStyles } from "./Types";

// MTL removed - line does not seem like a requirement any more (and was causing an error)
// global.ePub = Epub; // Fix for v3 branch of epub.js -> needs ePub to by a global var

const defaultStyles: IEpubViewStyles = {
  viewHolder: {
    position: "relative",
    height: "100%",
    width: "100%",
    // marginTop: "30%",
    // top: '5%'
  },
  view: {
    height: "100%",
  },
};

interface IEpubViewState {
  isLoaded: boolean;
  toc: any[];
}

export class EpubView extends Component<IEpubViewProps, IEpubViewState> {
  viewerRef: React.RefObject<HTMLDivElement>;
  location?: string | number;
  book: any;
  rendition: any;
  prevPage: any;
  nextPage: any;

  constructor(props: IEpubViewProps) {
    super(props);
    this.state = {
      isLoaded: false,
      toc: [],
    };
    this.viewerRef = React.createRef<HTMLDivElement>();
    this.location = props.location;
    this.book = this.rendition = this.prevPage = this.nextPage = null;
  }

  componentDidMount() {
    this.initBook();
    document.addEventListener("keyup", this.handleKeyPress, false);
  }

  initBook() {
    const { url, tocChanged, epubInitOptions = {} } = this.props;
    if (this.book) {
      this.book.destroy();
    }
    this.book = Epub(url as string, epubInitOptions);
    this.book.loaded.navigation.then(({ toc }: any) => {
      this.setState(
        {
          isLoaded: true,
          toc: [toc],
        },
        () => {
          tocChanged && tocChanged(toc);
          this.initReader();
        }
      );
    });
  }

  componentWillUnmount() {
    this.book = this.rendition = this.prevPage = this.nextPage = null;
    document.removeEventListener("keyup", this.handleKeyPress, false);
  }

  shouldComponentUpdate(nextProps: IEpubViewProps) {
    return (
      !this.state.isLoaded ||
      nextProps.location !== this.props.location ||
      nextProps.location !== this.props.location
    );
  }

  componentDidUpdate(prevProps: IEpubViewProps) {
    if (
      prevProps.location !== this.props.location &&
      this.location !== this.props.location
    ) {
      this.rendition?.display(this.props.location);
    }
    if (prevProps.url !== this.props.url) {
      this.initBook();
    }
  }

  initReader() {
    const { toc } = this.state;
    const { location, epubOptions = {}, getRendition } = this.props;
    const node = this.viewerRef.current;
    this.rendition = this.book.renderTo(node, {
      contained: true,
      width: "100%",
      height: "100%",
      ...epubOptions,
    });

    this.prevPage = () => {
      this.rendition.prev();
    };
    this.nextPage = () => {
      this.rendition.next();
    };
    this.registerEvents();
    getRendition && getRendition(this.rendition);

    if (typeof location === "string" || typeof location === "number") {
      this.rendition.display(location);
    } else if (toc.length > 0 && toc[0].href) {
      this.rendition.display(toc[0].href);
    } else {
      this.rendition.display();
    }
  }

  registerEvents() {
    const { handleKeyPress, handleTextSelected } = this.props;
    this.rendition.on("locationChanged", this.onLocationChange);
    this.rendition.on("keyup", handleKeyPress || this.handleKeyPress);
    if (handleTextSelected) {
      this.rendition.on("selected", handleTextSelected);
    }
  }

  onLocationChange = (loc: any) => {
    const { location, locationChanged } = this.props;
    const newLocation = loc && loc.start;
    if (location !== newLocation) {
      this.location = newLocation;
      locationChanged && locationChanged(newLocation);
    }
  };

  renderBook() {
    const { styles = defaultStyles } = this.props;
    return <div ref={this.viewerRef} style={styles.view} />;
  }

  handleKeyPress = ({ key }: any) => {
    key && key === "ArrowRight" && this.nextPage();
    key && key === "ArrowLeft" && this.prevPage();
  };

  render() {
    const { isLoaded } = this.state;
    const { loadingView, styles = defaultStyles } = this.props;
    return (
      <div style={styles.viewHolder}>
        {(isLoaded && this.renderBook()) || loadingView}
      </div>
    );
  }
}
