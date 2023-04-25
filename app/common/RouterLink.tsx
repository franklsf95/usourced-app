/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import * as React from "react";
import { Link, LinkProps } from "react-router-dom";

export const RouterLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
  function RouterLink(props, ref): JSX.Element {
    const { href, ...other } = props;
    return <Link ref={ref} to={href} {...other} />;
  },
);

export type RouterLinkProps = Omit<LinkProps, "to"> & {
  href: LinkProps["to"];
};
