import React, { FC } from "react"
import * as styles from "./style.module.css"

const Content: FC = props => {
  return <div className={styles.content} {...props} />
}

export default Content
