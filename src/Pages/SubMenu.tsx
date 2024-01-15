import React, { useEffect, useState } from "react";
import { CSSProperties } from "styled-components";
import dot from "../assets/img/Dot.svg";
import { useTranslation } from "react-i18next";

const SubMenu = ({
  value,
  onChange,
  onMenuClick,
  styles,
  heading,
}: {
  value: any;
  heading?: (value: any) => void;
  onChange: (value: any) => void;
  onMenuClick: (value: any) => void;
  styles?: {
    hide?: CSSProperties;
  };
}) => {
  const [parent, setParent] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [childSelected, setChildSelected] = useState();
  const [childColored, setChildColored] = useState<boolean>(false);

  useEffect(() => {
    if (value) setParent(value);
  }, [value]);

  return (
    <>
      <div
        style={{
          ...styles?.hide,
        }}
        className="parentdiv"
        onClick={(e) => {
          setChildColored(false);
          if (parent.items) setIsOpen(!isOpen);
          if (onChange) onChange(parent);
        }}
      >
        <label style={{ padding: 0, margin: 0, cursor: "pointer" }}>
          {value.items && isOpen ? (
            <label
              style={{
                fontSize: "24px",
                padding: "10px 2px",
                color: "#FB9C34",
                marginRight: '5px'
              }}
            >
              -
            </label>
          ) : value.items ? (
            <label
              style={{
                fontSize: "24px",
                padding: "10px 0",
                color: "#FB9C34",
                marginRight: '5px'
              }}
            >
              +
            </label>
          ) : (
            <p
              style={{
                fontSize: "35px",
                fontWeight: "bolder",
                color: "#FB9C34",
                marginRight: '5px'
              }}
            >.
              {/* <img
                src={dot}
                alt="dot"
                style={{
                  width: "4px",
                  margin: "0px 6px 0 0",
                }}
              /> */}
            </p>
          )}
        </label>
        <label
          id={`menu-${value.id}`}
          style={{
            fontSize: "22px",
            cursor: "pointer",
            color: parent?.isCurrent && !childColored ? "red" : "",
          }}
        >
          {value?.name}
        </label>
      </div>
      {isOpen &&
        parent?.items?.map((item: any, index: number) => {
          return (
            <div
              className="CategoryList"
              key={index}
              onClick={(e) => {
                setChildColored(true);
                if (isOpen) {
                  onChange(parent);
                  onMenuClick(item);
                }
                setChildSelected(item.id);
              }}
              style={{ paddingLeft: 10, display: "flex" }}
            >
              <label
                style={{
                  display: "inline",
                  fontSize: "22px",
                  paddingLeft: 20,
                  cursor: "pointer",
                  marginTop: "10px",
                  color:
                    childSelected === item.id &&
                      parent?.isCurrent &&
                      childColored
                      ? "red"
                      : "",
                }}
              >
                {item.name}
              </label>
            </div>
          );
        })}
    </>
  );
};
export default SubMenu;

export const SideBar = ({
  items,
  onRefresh,
  onClick,
}: {
  items: any[];
  onRefresh?: (event: React.FormEvent<any>) => void;
  onClick: (value: any) => void;
}) => {
  const [itemsArr, setItemsArr] = useState(items);
  const [sidebar, setSidebar] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    setItemsArr(items);
  }, [items]);

  return (
    <div
      onClick={() => {
        if (!sidebar) setSidebar(true);
        else setSidebar(false);
      }}
    >
      <div>
        {itemsArr?.map((item: any, index: number) => {
          return (
            <SubMenu
              key={index}
              value={item}
              onChange={(value: any) => {
                setItemsArr(
                  itemsArr.map((i) => {
                    if (i.id === value.id) {
                      return { ...i, isCurrent: true };
                    }
                    return { ...i, isCurrent: false };
                  })
                );
                if (onClick) onClick(value);
              }}
              onMenuClick={(value) => {
                if (onClick) onClick(value);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
