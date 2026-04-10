import {AuthRouteObject} from "react-router-auth-plus";
import React from "react";

type tokenType = {
  colorPrimary: string
}
type ThemeData = {
  algorithm: any;
  token: tokenType,
  algorithmStr: string,
};

type parameterTheme = {
  algorithm: 'defaultAlgorithm' | 'darkAlgorithm',
  colorPrimary: string
}

type MetaMenu = {
  name?: string | undefined;
  icon?: React.ReactNode | undefined;
  hideChildrenInMenu?: boolean | undefined;

  index?: boolean | undefined;
  path?: string | undefined;
  element?: React.ReactNode | undefined,
  key: string,
  children?: any
};

type routeObjectType = AuthRouteObject<MetaMenu>;


export type {
  ThemeData,
  parameterTheme,
  MetaMenu,
  routeObjectType,
}
