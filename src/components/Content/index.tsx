import React, { FC } from "react"
import styles from "./style.module.css"

const Content: FC = props => {
  return <content className={styles.content} {...props} />
}

export default Content
