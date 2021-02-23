import classNames from "classnames"
import { Link } from "gatsby"
import React, { FC } from "react"
import styles from "./style.module.css"

export interface PaginationProps {
  next?: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
    }
  }
  previous?: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
    }
  }
}

const Pagination: FC<PaginationProps> = props => {
  const { next, previous } = props

  console.log({ styles })

  return (
    <ul className={styles.pagination}>
      {previous && (
        <li
          className={classNames(
            styles.pagination__item,
            styles.pagination__itemPrevious
          )}
        >
          <Link to={`/docs${previous.fields.slug}`}>
            « {previous.frontmatter.title}
          </Link>
        </li>
      )}

      {next && (
        <li
          className={classNames(
            styles.pagination__item,
            styles.pagination__itemNext
          )}
        >
          <Link to={`/docs${next.fields.slug}`}>
            {next.frontmatter.title} »
          </Link>
        </li>
      )}
    </ul>
  )
}

export default Pagination
