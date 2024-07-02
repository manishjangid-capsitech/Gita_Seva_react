import React, { useState } from 'react';
import "../Styles/Books.css";
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbsProps {
    mainsubBreadCrumb: string,
    subBreadCrumb: string,
    subBreadCrumbTwo: string,
    subBreadCrumbThree?: string,
    navigatemainsubBreadCrumb: (path: string) => void,
    navigatesubBreadCrumb: (path: string) => void
}
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
    mainsubBreadCrumb,
    subBreadCrumb,
    subBreadCrumbTwo,
    subBreadCrumbThree,
    navigatemainsubBreadCrumb,
    navigatesubBreadCrumb,
}) => {
    const renderBreadcrumbs = () => {
        if (subBreadCrumbThree) {
            // Case with three breadcrumbs
            return (
                <>
                    <span style={{ marginRight: "8px", cursor: "pointer" }} onClick={() => navigatemainsubBreadCrumb("")}>
                        {subBreadCrumb}
                    </span>
                    <span style={{ margin: "0 5px 0 0", cursor: "pointer" }} onClick={() => navigatesubBreadCrumb("")}>
                        / {subBreadCrumbTwo}
                    </span>
                    <span style={{ color: "#2d2a29", cursor: "auto" }}>/ {subBreadCrumbThree}</span>
                </>
            );
        } else {
            // Case with two breadcrumbs
            return (
                <>
                    <span style={{ marginRight: "8px", cursor: "pointer" }} onClick={() => navigatemainsubBreadCrumb("")}>
                        {subBreadCrumb}
                    </span>
                    <span style={{ color: "#2d2a29", cursor: "auto" }}>/ {subBreadCrumbTwo}</span>
                </>
            );
        }
    };

    return (
        <div
            className="breadcrumbs-head newcontainer"
            style={{
                width: "100%",
                marginTop: "-175px",
                background: "none",
                backgroundColor: "#ffedbc",
                height: "240px",
                borderBottom: "2px solid #fff",
                paddingTop: 0,
            }}
        >
            <div className="breadcrumbs">
                <div
                    className="containers"
                    style={{
                        fontSize: "36px",
                        fontWeight: 700,
                        color: "rgb(209, 21, 1)",
                        top: "155px",
                        fontFamily: "ChanakyaUniBold",
                    }}
                >
                    {mainsubBreadCrumb || window.location.pathname === "" ? mainsubBreadCrumb : mainsubBreadCrumb}
                    <div
                        className="hoverSpan"
                        style={{
                            fontSize: "19px",
                            fontWeight: 600,
                            color: "#2d2a29",
                            marginTop: "-8px",
                        }}
                    >
                        {renderBreadcrumbs()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SidebarFilter = ({
    title,
    items,
    onClick,
}: {
    title: string;
    items: any[];
    onClick: (value: any) => void;
}) => {
    const [Value, setValue] = useState<any>("");
    const navigate = useNavigate();

    return (
        <div>
            <Accordion elevation={0} defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    style={{
                        height: 0,
                        background: "#FFFAF0",
                        minHeight: "20px",
                        marginTop: "15px",
                    }}
                >
                    <h2 className="filtertitle">{title}</h2>
                </AccordionSummary>
                <AccordionDetails
                    style={{
                        display: "block",
                        background: "#FFFAF0",
                        padding: 0,
                    }}
                >
                    {items &&
                        items.length > 0 &&
                        items.map((Language: any) => (
                            <div
                                key={`c-${Language.id}`}
                                className="LanguageList"
                                // onClick={() => handleLanguageClick(Language.id)}
                                onClick={() => {
                                    setValue(Value)
                                }}
                            >
                                <ul style={{ margin: 0 }}>
                                    <li>
                                        <div
                                            style={{
                                                fontSize: "21px",
                                                cursor: "pointer",
                                                fontWeight: 400,
                                                color: "#545454",
                                                fontFamily: "ChanakyaUni",
                                            }}
                                            id={`lan-${Language.id}`}
                                        >
                                            {Language.name}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        ))}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};