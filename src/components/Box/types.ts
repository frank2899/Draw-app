import { HTMLAttributes, ReactNode } from "react";
import {
  BackgroundProps,
  BorderProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  GridProps as _GridProps,
} from "styled-system";

export interface BoxProps
  extends BackgroundProps,
    BorderProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface FlexProps extends BoxProps, FlexboxProps {
    gap?: string;
    rowGap?: string;
    columnGap?: string;
  }

export interface GridProps extends FlexProps, _GridProps {}