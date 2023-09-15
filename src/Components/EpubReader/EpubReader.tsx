import React, { PureComponent } from "react";
import { useSwipeable } from "react-swipeable";
import { EpubView } from "./EpubView";
import { EpubReaderStyles } from "./EpubReader.styles";
import { IEpubReaderStyles, IEpubViewProps, IEpubViewStyles } from "./Types";

import {
  ConfigurationOptions,
  SwipeableCallbacks,
} from "react-swipeable/es/types";
//} from "react-swipeable/es/types";
import { IToc } from ".";

interface ISwipeable
  extends Partial<SwipeableCallbacks & ConfigurationOptions> {
  children: any;
}
const Swipeable = ({ children, ...props }: ISwipeable) => {
  const handlers = useSwipeable(props);
  return <div {...handlers}>{children}</div>;
};

interface ITocItemProps {
  label: string;
  href: string;
  setLocation: Function;
  styles: any;
}

class TocItem extends PureComponent<ITocItemProps> {
  setLocation = () => {
    this.props.setLocation(this.props.href);
  };
  render() {
    const { label, styles } = this.props;
    return (
      <button onClick={this.setLocation} style={styles}>
        {label}
      </button>
    );
  }
}

interface IEpubReaderProps extends Omit<IEpubViewProps, "styles"> {
  title?: string;
  showToc?: boolean;
  styles?: IEpubReaderStyles;
  swipeable?: boolean;
  epubViewStyles?: IEpubViewStyles;
}
interface IEpubReaderState {
  expandedToc: boolean;
  toc: any[];
}

export class EpubReader extends PureComponent<
  IEpubReaderProps,
  IEpubReaderState
> {
  readerRef: React.RefObject<EpubView>;

  constructor(props: IEpubReaderProps) {
    super(props);
    this.readerRef = React.createRef();
    this.state = {
      expandedToc: false,
      toc: [],
    };
  }
  toggleToc = () => {
    this.setState({
      expandedToc: !this.state.expandedToc,
    });
  };

  next = () => {
    this.readerRef.current?.nextPage();
  };

  prev = () => {
    this.readerRef.current?.prevPage();
  };

  onTocChange = (toc: IToc) => {
    const { tocChanged } = this.props;
    this.setState(
      {
        toc: [toc],
      },
      () => tocChanged && tocChanged(toc)
    );
  };

  renderToc() {
    const { toc, expandedToc } = this.state;
    const { styles = EpubReaderStyles } = this.props;
    return (
      <div
        id="tocwidth"
        style={Object.assign(
          {},
          styles.tocArea,
          expandedToc ? styles.tocAreaWidth : { width: "0px" }
        )}>
        <div className="container">
          <div style={styles.toc}>
            {toc?.length > 0 &&
              toc[0].map((item: any, i: number) => {
                return (
                  <TocItem
                    {...item}
                    key={item.Id}
                    setLocation={this.setLocation}
                    styles={styles.tocAreaButton}
                  />
                );
              })}
          </div>
        </div>
        {expandedToc && (
          <div style={styles.tocBackground} onClick={this.toggleToc} />
        )}
      </div>
    );
  }

  setLocation = (loc: string | number) => {
    const { locationChanged } = this.props;
    this.setState(
      {
        expandedToc: false,
      },
      () => locationChanged && locationChanged(loc)
    );
  };

  renderTocToggle() {
    const { expandedToc } = this.state;
    const { styles = EpubReaderStyles } = this.props;
    return (
      <button
        style={Object.assign(
          {},
          styles.tocButton,
          expandedToc ? styles.tocButtonExpanded : {}
        )}
        onClick={this.toggleToc}>
        <span
          style={Object.assign(
            {},
            styles.tocButtonBar,
            styles.tocButtonBarTop,
            { width: "25px", height: "3px", backgroundColor: "white" }
          )}
        />
        <span
          style={Object.assign({}, styles.tocButtonBar, styles.tocButtonBar, {
            width: "20px",
            height: "3px",
            backgroundColor: "white",
          })}
        />
        <span
          style={Object.assign(
            {},
            styles.tocButtonBar,
            styles.tocButtonBottom,
            { width: "25px", height: "3px", backgroundColor: "white" }
          )}
        />
      </button>
    );
  }

  render() {
    const {
      title,
      showToc = true,
      loadingView = <div style={EpubReaderStyles.loadingView}>Loading…</div>,
      styles = EpubReaderStyles,
      locationChanged,
      swipeable,
      epubViewStyles,
      ...props
    } = this.props;
    const { toc, expandedToc } = this.state;
    return (
      <>
        <div style={styles.container}>
          <div style={styles.titleArea}>{title}</div>
          <div
            id="test-div"
            style={Object.assign(
              {},
              styles.readerArea,
              expandedToc ? styles.containerExpanded : {}
            )}>
            {showToc && this.renderTocToggle()}

            <Swipeable
              onSwipedRight={this.prev}
              onSwipedLeft={this.next}
              trackMouse>
              <div style={styles.reader}>
                <EpubView
                  ref={this.readerRef}
                  loadingView={loadingView}
                  styles={epubViewStyles}
                  {...props}
                  tocChanged={this.onTocChange}
                  locationChanged={locationChanged}
                />
                {swipeable && <div style={styles.swipeWrapper} />}
              </div>
            </Swipeable>
            <button
              style={Object.assign({}, styles.arrow, styles.prev)}
              onClick={this.prev}>
              ‹
            </button>
            <button
              style={Object.assign({}, styles.arrow, styles.next)}
              onClick={this.next}>
              ›
            </button>
          </div>
          {showToc && toc && this.renderToc()}
        </div>
      </>
    );
  }
}
