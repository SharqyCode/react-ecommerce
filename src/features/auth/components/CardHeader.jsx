import React from 'react'
import styles from "./CardHeader.module.css"
import { Link } from 'react-router-dom'

export default function CardHeader() {
    return (
        <Link to="/" className={styles.card_header}>
            ShopEase
        </Link>
    )
}
