import { Link } from "gatsby"
import React, { FC } from "react"
import * as styles from "./style.module.css"

interface Route {
  id: string
  path: string
  title: string
}

export interface NavigationProps {
  routes: Route[]
}

const Navigation: FC<NavigationProps> = props => {
  const { routes } = props

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        {routes.map(route => {
          const { id, path, title } = route

          return (
            <li key={id}>
              <Link className={styles.navigation__link} to={path}>
                {title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navigation
