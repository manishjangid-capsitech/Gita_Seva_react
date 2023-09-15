import React from "react";
import { matchPath, useNavigate, useMatch } from "react-router";

interface ILinkContainerProps {
  to: string;
  children?: any;
  onClick?: (event: any) => void;
  replace?: boolean;
  className?: string;
  activeClassName?: string;
  isActive?: (match: any, location: any) => boolean;
  style?: any;
  activeStyle?: any;
}
const isModifiedEvent = (event: any) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export const LinkContainer = ({
  activeClassName = "active",
  isActive: getIsActive,
  className,
  style,
  activeStyle,
  children,
  ...props
}: ILinkContainerProps) => {
  const navigate = useNavigate();
  const match = useMatch(props.to);

  const child = React.Children.only(children);

  const href = typeof props.to === "string" ? { pathname: props.to } : props.to;

  const handleClick = (event: any) => {
    const { onClick, replace } = props;

    if (children && children.props.onClick) {
      children.props.onClick(event);
    }

    if (onClick) {
      onClick(event);
    }

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore right clicks
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();

      if (replace) {
        navigate(href);
      } else {
        navigate(href);
      }
    }
  };

  const pathname = window.location.pathname;
  const isActive = !!(getIsActive
    // eslint-disable-next-line no-restricted-globals
    ? getIsActive(match, location)
    : match
    ? matchPath(pathname, match.pathname)
    : false);

  return React.cloneElement(child, {
    ...props,
    className: [
      className,
      child.props.className,
      isActive ? activeClassName : null,
    ]
      .join(" ")
      .trim(),
    style: isActive ? { ...style, ...activeStyle } : style,
    href,
    onClick: handleClick,
  });
};
