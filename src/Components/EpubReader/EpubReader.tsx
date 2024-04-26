import React, { PureComponent } from "react";
import { useSwipeable } from "react-swipeable";
import { EpubView } from "./EpubView";
import { EpubReaderStyles } from "./EpubReader.styles";
import { IEpubReaderStyles, IEpubViewProps, IEpubViewStyles } from "./Types";
import Plus from "../../Images/plus-solid.svg"

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
  labeltwo: string;
  href: string;
  setLocation: Function;
  styles: any;
  subitems: any;
}

class TocItem extends PureComponent<ITocItemProps> {

  state = {
    isExpanded: false,
    heading:'',
    subHeading:''
  }

  setLocation = (event: any, href: any,heading:string = '',subHeading:string = '') => {
    event.preventDefault(); // Prevent default link behavior
    this.props.setLocation(href,heading,subHeading); // Set location based on clicked href   
  };

  collapse = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render() {
    const { label, styles, subitems } = this.props;
    // debugger  
    // console.log("this.props",this.props);

    return (
      <div className="" style={{
        display: "flex",
        marginRight: "5px",
      }}>
        <span style={{
          fontSize: 25,
          cursor: "pointer",
          color: "#ff4900",
          fontWeight: 600,
          padding: 0,
          margin: "0 7px 0 7px"
        }} onClick={() => this.collapse()}
        >
          {
            (subitems?.length > 0) ?
              this.state.isExpanded ? "-" : "+"
              :
              ""
          }
        </span>
        <div>
          <div>
            <button id="titlename" onClick={(event) => this.setLocation(event, this.props.href,label)} style={{
              userSelect: "none",
              appearance: "none",
              background: "none",
              border: "none",
              display: "block",
              //fontFamily: "sans-serif",
              width: "100%",
              //fontSize: ".9em",
              textAlign: "left",
              padding: "5px 0 0 5px",
              borderBottom: "1px solid #ddd",
              color: "#aaa",
              boxSizing: "border-box",
              outline: "none",
              cursor: "pointer",
              fontSize: 20,
              fontFamily: "ChanakyaUni, serif",
              margin: subitems?.length > 0 ? "0 10px 0 0" : "0 0 0 10px",
            }}>
              {label}
            </button>
          </div>
          <div>
            {subitems?.map((subitem: any, index: number) => {
              return (
                <div
                  key={index}
                  onClick={(event) => {
                    this.setLocation(event, subitem.href,label,subitem?.label)
                  }}
                  style={{
                    display: this?.state?.isExpanded ? "block" : "none",
                    userSelect: "none",
                    appearance: "none",
                    background: "none",
                    borderTop: "none",
                    borderRight: "none",
                    borderBottom: "1px solid rgb(221, 221, 221)",
                    borderLeft: "none",
                    borderImage: "initial",
                    width: "100%",
                    textAlign: "left",
                    padding: "5px 0px 0px 5px",
                    color: " rgb(170, 170, 170)",
                    boxSizing: "border-box",
                    outline: "none",
                    cursor: "pointer",
                    fontSize: "20px",
                    fontFamily: "ChanakyaUni, serif",
                  }
                  }>
                  {subitem?.label}
                </div>
              )
            }
            )}
          </div>
        </div>
      </div >
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
                // debugger
                // console.log("index",i);
                     
                return (
                  <TocItem
                    {...item}
                    key={item.Id}
                    setLocation={this.setLocation}
                    subTitles={item.subitems}
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

  setLocation = (loc: string | number,title:string = '',sub:string = '') => {
    const { locationChanged,heading,subHeading } = this.props;
    this.setState(
      {
        expandedToc: false,
      },
      () =>{ locationChanged && locationChanged(loc)
        heading && heading(title);
        subHeading && subHeading(title + (sub ? (" : " +sub) : '')) 
      }
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
