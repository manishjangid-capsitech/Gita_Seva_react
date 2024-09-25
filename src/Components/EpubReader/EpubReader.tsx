import React, { PureComponent } from "react";
import { useSwipeable } from "react-swipeable";
import { EpubView } from "./EpubView";
import { EpubReaderStyles } from "./EpubReader.styles";
import { IEpubReaderStyles, IEpubViewProps, IEpubViewStyles } from "./Types";
import Plus from "../../Images/plus-solid.svg"
import '../../Styles/Home.css'

import {
  ConfigurationOptions,
  SwipeableCallbacks,
} from "react-swipeable/es/types";
//} from "react-swipeable/es/types";
import { IToc } from ".";
import { event } from "jquery";

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
    isExpandable: false,
    heading: '',
    subHeading: '',
    hoverIndex: null,
    activeItemId: null,
    expandedSubitems: null,
    expandedItemHref: null,
  }

  componentDidMount() {
    const themecolor = localStorage.getItem('epub-theme');
    // Store the fetched data in the state
    this.setState({ themecolor });
    // this.setLocation = (event: any, href: any, heading: string = '', subHeading: string = '') => {
    //   event.preventDefault(); // Prevent default link behavior
    // };
  }

  setLocation = (event: any, href: any, heading: string = '', subHeading: string = '') => {
    event.preventDefault(); // Prevent default link behavior
    this.props.setLocation(href, heading, subHeading); // Set location based on clicked href
    this.setState({ activeItemId: href });
  };

  collapse = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  // collapsed = () => {
  //   this.setState({
  //     isExpandable: !this.state.isExpandable
  //   })
  // }

  handleMouseEnter = (index: any) => {
    this.setState({ hoverIndex: index });
  };

  handleMouseLeave = () => {
    this.setState({ hoverIndex: null });
  };

  toggleItem = (href: string) => {
    this.setState(prevState => ({
      expandedItemHref: this.state?.expandedItemHref === href ? null : href
    }));
  };


  render() {
    const { label, styles, subitems, href } = this.props;
    const { expandedItemHref, activeItemId } = this.state;
    return (
      <div className="" style={{
        display: "flex",
        borderBottom: "1px solid #ddd", width: "90%", margin: subitems?.length < 0 ? "0 0 0 10px" : "0"
      }}>
        <span style={{
          fontSize: 25,
          cursor: "pointer",
          color: "#ff4900",
          fontWeight: 600,
          padding: 0,
        }}
          onClick={() => this.collapse()}
          // onClick={() => this.toggleItem(href)}
        >
          {
            subitems?.length > 0 ?
              (this?.state?.isExpanded ? "-" : "+")
              :
              ""
          }
        </span>
        <div>
          <div>
            <div id="titlename" onClick={(event) => this.setLocation(event, this.props.href, label)}
              className={`list-item-label ${activeItemId === event ? 'active' : ''}`}
              onMouseEnter={() => this.handleMouseEnter(this?.props?.href)}
              onMouseLeave={this.handleMouseLeave}
              style={{
                userSelect: "none",
                appearance: "none",
                background: "none",
                border: "none",
                display: "block",
                //fontFamily: "sans-serif",
                width: "100%",
                //fontSize: ".9em",
                textAlign: "left",
                padding: "0 40px 0 10px",
                // padding: "5px 0 0 5px",
                // borderBottom: "1px solid #ddd",
                boxSizing: "border-box",
                outline: "none",
                cursor: "pointer",
                fontSize: 20,
                fontFamily: "ChanakyaUni, serif",
                margin: subitems?.length > 0 ? "0 10px 0 0" : "0 0 0 10px",
              }}
            >
              {label}
            </div>
          </div>
          <div>
            {subitems?.map((subitem: any, index: number) => {
              return (
                <div>
                  <div
                    key={index}
                    onMouseEnter={() => this.handleMouseEnter(index)}
                    onMouseLeave={this.handleMouseLeave}
                    className={`list-item ${activeItemId === subitem?.href ? 'active' : ''}`}
                    style={{
                      display: this?.state?.isExpanded ? "flex" : "none",
                      userSelect: "none",
                      appearance: "none",
                      background: "none",
                      borderTop: "none",
                      borderRight: "none",
                      borderBottom: "1px solid #ddd",
                      borderLeft: "none",
                      borderImage: "initial",
                      // width: "100%",
                      textAlign: "left",
                      // padding: "5px 0px 0px 5px",
                      boxSizing: "border-box",
                      outline: "none",
                      cursor: "pointer",
                      fontSize: "20px",
                      fontFamily: "ChanakyaUni, serif",
                      width: "130%",
                    }}>
                    <span style={{
                      fontSize: 25,
                      cursor: "pointer",
                      color: "#ff4900",
                      fontWeight: 600,
                      padding: 0,
                      marginRight: "10px"
                    }}
                      // onClick={() => this.collapsed()}
                      onClick={() => this.toggleItem(subitem.href)}
                    >
                      {
                        subitem?.subitems?.length > 0 ?
                          (expandedItemHref === subitem.href ? "-" : "+")
                          :
                          ""
                      }
                    </span>
                    <p id="subLabel" style={{ margin: "0", padding: "0" }}
                      onClick={(event) => {
                        this.setLocation(event, subitem.href, label, subitem?.label)
                      }}>

                      {subitem?.label}
                    </p>
                  </div>
                  <div>
                    {
                      (subitem?.subitems?.length > 0)
                      &&
                      subitem?.subitems?.map((subsubitems: any, subindex: number) => {
                        return (
                          <div key={subindex} onClick={(event) => {
                            this.setLocation(event, subsubitems.href, label)
                          }}
                            id="subLabeloflabel"
                            onMouseEnter={() => this.handleMouseEnter(index)}
                            onMouseLeave={this.handleMouseLeave}
                            className={`listsubitem ${activeItemId === subsubitems?.href ? 'active' : ''}`}
                            style={{
                              // display: this?.state?.isExpandable && this?.state?.isExpanded ? "block" : "none",
                              display: expandedItemHref === subitem.href && this?.state?.isExpanded ? "block" : "none",  // Only show if subitem is expanded
                              userSelect: "none",
                              appearance: "none",
                              background: "none",
                              borderTop: "none",
                              borderRight: "none",
                              borderBottom: "1px solid #ddd",
                              borderLeft: "none",
                              borderImage: "initial",
                              // width: "100%",
                              textAlign: "left",
                              padding: "5px 0px 0px 5px",
                              boxSizing: "border-box",
                              outline: "none",
                              cursor: "pointer",
                              fontSize: "20px",
                              fontFamily: "ChanakyaUni, serif",
                              width: "130%",
                            }}
                          >
                            {subsubitems?.label}
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            }
            )}

            {/* <div>
              {
                (subitems?.subitems?.length > 0)
                &&
                subitems?.subitems?.map((subsubitems: any, subindex: number) => {
                  return (
                    <div key={subindex} onClick={(event) => {
                      this.setLocation(event, subsubitems.href, label)
                    }}
                      id="subLabeloflabel"
                      onMouseEnter={() => this.handleMouseEnter(subindex)}
                      onMouseLeave={this.handleMouseLeave}
                      className={`listsubitem ${activeItemId === subsubitems?.href ? 'active' : ''}`}
                      style={{
                        display: this?.state?.isExpandable && this?.state?.isExpanded ? "block" : "none",
                        userSelect: "none",
                        appearance: "none",
                        background: "none",
                        borderTop: "none",
                        borderRight: "none",
                        borderBottom: "1px solid #ddd",
                        borderLeft: "none",
                        borderImage: "initial",
                        // width: "100%",
                        textAlign: "left",
                        padding: "5px 0px 0px 5px",
                        boxSizing: "border-box",
                        outline: "none",
                        cursor: "pointer",
                        fontSize: "20px",
                        fontFamily: "ChanakyaUni, serif",
                        width: "130%",
                      }}
                    >
                      {subsubitems?.label}
                    </div>
                  )
                })
              }
            </div> */}

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

  setName = () => {
    var iframe = document?.getElementsByTagName("iframe");
    const heading = iframe[0]?.contentWindow?.document.getElementsByClassName("Heading")[0]?.textContent ||
     iframe[0]?.contentWindow?.document.getElementsByClassName("Chapter-Heading")[0]?.textContent || ''
    const subHeading = iframe[0]?.contentWindow?.document.getElementsByClassName("Sub-Heading")[0]?.textContent || ''
    const Name = subHeading ? (heading + ' ' + subHeading) : heading
    if(this.props.subHeading) this.props.subHeading(Name)
  }
  next = () => {
    this.readerRef.current?.nextPage();
    this.setState(
      {
        expandedToc: false,
      },
    )
    this.setName()
  };

  prev = () => {
    this.readerRef.current?.prevPage();
    this.setName()
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

  setLocation = (loc: string | number, title: string = '', sub: string = '') => {
    const { locationChanged, heading, subHeading } = this.props;
    this.setState(
      {
        // expandedToc: false,

      },
      () => {
        locationChanged && locationChanged(loc)
        // heading && heading(title);
        subHeading && subHeading(title + (sub))
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
        {!expandedToc ?
          <div>
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
          </div>
          :
          <button
            className="icon-close"
            style={{ marginTop: "14px" }}
          >
          </button>
        }
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
