import classNames from "classnames"
import capitalize from "lodash/capitalize"
import React, { FC } from "react"
import styles from "./style.module.css"

type Direction = "left" | "right"

export interface AsideProps {
  direction?: Direction
}

const Aside: FC<AsideProps> = props => {
  const { direction, ...otherProps } = props

  return (
    <aside
      className={classNames(styles.aside, {
        [styles[`aside${capitalize(direction)}`]]: direction,
      })}
      {...otherProps}
    />
  )
}

export default Aside
